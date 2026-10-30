import { useId, useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { parseResponse } from "hono/client";
import { useNavigate, useParams } from "react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { client } from "@/lib/client";
import { errorMessage, itemQuery, itemSharesQuery, membersQuery } from "@/lib/queries";
import { cn, formatPrice, initials } from "@/lib/utils";

interface ItemFormProps {
	members: { id: string; name: string }[];
	// Only set when editing an existing item
	item?: {
		id: string;
		name: string;
		quantity: string | null;
		notes: string | null;
		price: number | null;
	};
	shares?: { userId: string; parts: number }[];
}

function ItemForm({ members, item, shares }: ItemFormProps) {
	const id = useId();
	const { groupId = "", tripId } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const back = tripId ? `/groups/${groupId}/trips/${tripId}` : `/groups/${groupId}/list`;
	const fieldClass = "h-12 rounded-xl border-border bg-card px-4 text-base md:text-base";
	const editing = item !== undefined;

	const [name, setName] = useState(item?.name ?? "");
	const [quantity, setQuantity] = useState(item?.quantity ?? "");
	const [price, setPrice] = useState(item?.price?.toString() ?? "");
	const [error, setError] = useState("");
	// Everyone shares a new item equally, until someone changes it
	const [split, setSplit] = useState(() =>
		Object.fromEntries(
			members.map((member) => {
				const share = shares?.find((share) => share.userId === member.id);
				return [
					member.id,
					{ selected: shares?.length ? Boolean(share) : true, parts: share?.parts ?? 1 }
				];
			})
		)
	);

	const priceValue = price.trim() === "" ? null : Number(price);
	const priceIsValid =
		priceValue === null || (Number.isFinite(priceValue) && priceValue >= 0 && priceValue <= 99_999);
	const totalParts = members.reduce(
		(sum, member) => sum + (split[member.id].selected ? split[member.id].parts : 0),
		0
	);

	function finish() {
		void navigate(back);
		void queryClient.invalidateQueries({ queryKey: ["groups", groupId] });
	}

	const save = useMutation({
		mutationFn: async (priceToSave: number | null) => {
			const items = client.api.groups[":groupId"].items;
			const json = {
				name: name.trim(),
				quantity: quantity.trim() || null,
				notes: item?.notes ?? null,
				price: priceToSave
			};
			const saved = await parseResponse(
				item
					? items[":itemId"].$patch({ param: { groupId, itemId: item.id }, json })
					: items.$post({ param: { groupId }, json: { ...json, tripId: tripId ?? null } })
			);
			await parseResponse(
				items[":itemId"].shares.$put({
					param: { groupId, itemId: saved.id },
					json: members
						.filter((member) => split[member.id].selected)
						.map((member) => ({ userId: member.id, parts: split[member.id].parts }))
				})
			);
		},
		onSuccess: finish,
		onError: (error) => setError(errorMessage(error))
	});

	const remove = useMutation({
		mutationFn: (itemId: string) =>
			parseResponse(
				client.api.groups[":groupId"].items[":itemId"].$delete({ param: { groupId, itemId } })
			),
		onSuccess: finish,
		onError: (error) => setError(errorMessage(error))
	});

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!name.trim()) {
			setError("Enter a name to continue.");
		} else if (!priceIsValid) {
			setError("Enter a price between 0 and 99,999, or leave it empty if it's pending.");
		} else if (totalParts === 0) {
			setError("Pick at least one member to split with.");
		} else {
			setError("");
			save.mutate(priceValue);
		}
	}

	function updateMember(memberId: string, change: Partial<{ selected: boolean; parts: number }>) {
		setSplit((split) => ({ ...split, [memberId]: { ...split[memberId], ...change } }));
	}

	const busy = save.isPending || remove.isPending;

	return (
		<form noValidate onSubmit={handleSubmit} className="flex flex-1 flex-col">
			<div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
				<div className="flex flex-col gap-2">
					<label htmlFor={`${id}-name`} className="text-sm font-semibold">
						Name
					</label>
					<Input
						id={`${id}-name`}
						name="name"
						value={name}
						onChange={(event) => setName(event.target.value)}
						placeholder="Oat milk"
						maxLength={128}
						autoComplete="off"
						className={fieldClass}
					/>
				</div>
				<div className="grid grid-cols-2 gap-3 sm:gap-4">
					<div className="flex min-w-0 flex-col gap-2">
						<label htmlFor={`${id}-quantity`} className="text-sm font-semibold">
							Quantity
						</label>
						<Input
							id={`${id}-quantity`}
							name="quantity"
							value={quantity}
							onChange={(event) => setQuantity(event.target.value)}
							placeholder="2 cartons"
							maxLength={128}
							className={fieldClass}
						/>
					</div>
					<div className="flex min-w-0 flex-col gap-2">
						<label htmlFor={`${id}-price`} className="text-sm font-semibold">
							Total price ($)
						</label>
						<Input
							id={`${id}-price`}
							name="price"
							inputMode="decimal"
							value={price}
							onChange={(event) => setPrice(event.target.value)}
							placeholder="Pending"
							className={fieldClass}
						/>
					</div>
				</div>
				<fieldset className="min-w-0">
					<legend className="font-heading text-base font-semibold">Split with</legend>
					<div className="mb-3 flex flex-wrap items-center justify-between gap-2">
						<p id={`${id}-shares-hint`} className="text-xs text-muted-foreground">
							2 shares = twice as much.
						</p>
						<Button
							type="button"
							variant="ghost"
							className="h-9 px-2 text-xs"
							onClick={() =>
								setSplit((split) =>
									Object.fromEntries(
										Object.entries(split).map(([memberId, share]) => [
											memberId,
											{ ...share, parts: 1 }
										])
									)
								)
							}>
							Split equally
						</Button>
					</div>
					<div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-foreground/5">
						<div className="grid grid-cols-[minmax(0,1fr)_3rem_4.5rem] gap-2 border-b px-3 py-2 text-xs text-muted-foreground sm:px-4">
							<span>Member</span>
							<span className="text-center">Shares</span>
							<span className="text-right">Cost</span>
						</div>
						{members.map((member) => {
							const { selected, parts } = split[member.id];
							const fraction = selected && totalParts ? parts / totalParts : null;

							return (
								<div
									key={member.id}
									className={cn(
										"grid grid-cols-[minmax(0,1fr)_3rem_4.5rem] items-center gap-2 border-b px-3 py-3 last:border-b-0 sm:px-4",
										!selected && "bg-muted/30"
									)}>
									<label className="flex min-w-0 cursor-pointer items-center gap-2">
										<input
											type="checkbox"
											checked={selected}
											onChange={(event) =>
												updateMember(member.id, { selected: event.target.checked })
											}
											aria-label={`Split with ${member.name}`}
											className="size-5 shrink-0 accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
										/>
										<Avatar size="sm">
											<AvatarFallback>{initials(member.name)}</AvatarFallback>
										</Avatar>
										<span className="truncate text-sm font-medium" title={member.name}>
											{member.name}
										</span>
									</label>
									<Input
										type="number"
										min={1}
										max={99}
										step={1}
										disabled={!selected}
										value={selected ? parts : ""}
										onChange={(event) =>
											updateMember(member.id, {
												parts: Math.min(
													99,
													Math.max(1, Math.floor(Number(event.target.value)) || 1)
												)
											})
										}
										aria-label={`Shares for ${member.name}`}
										aria-describedby={`${id}-shares-hint`}
										className="h-10 rounded-lg bg-background px-1 text-center text-sm tabular-nums md:text-sm"
									/>
									<div className="text-right tabular-nums" aria-live="polite">
										<p className="text-sm font-semibold">
											{fraction !== null && priceIsValid && priceValue !== null
												? formatPrice(priceValue * fraction)
												: "—"}
										</p>
										{fraction !== null && (
											<p className="text-xs text-muted-foreground">{Math.round(fraction * 100)}%</p>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</fieldset>
			</div>
			<footer className="mt-auto border-t p-4 sm:p-6 lg:p-8">
				<div className="mx-auto flex w-full max-w-xl flex-col gap-3">
					{error && (
						<p role="alert" className="text-center text-sm text-destructive">
							{error}
						</p>
					)}
					{editing && (
						<Button
							type="button"
							variant="ghost"
							className="text-destructive"
							disabled={busy}
							onClick={() => {
								if (confirm(`Delete ${item.name}?`)) remove.mutate(item.id);
							}}>
							Delete item
						</Button>
					)}
					<Button
						type="submit"
						disabled={busy}
						className="h-14 w-full rounded-2xl text-base font-semibold">
						{editing ? "Save changes" : "Add item"}
					</Button>
				</div>
			</footer>
		</form>
	);
}

function ItemEditor({ editing = false }: { editing?: boolean }) {
	const { groupId = "", itemId = "" } = useParams();
	const members = useQuery(membersQuery(groupId));
	// The form copies these into its state when it mounts, so never start it from an old cached copy
	const item = useQuery({ ...itemQuery(groupId, itemId), enabled: editing, gcTime: 0 });
	const shares = useQuery({ ...itemSharesQuery(groupId, itemId), enabled: editing, gcTime: 0 });

	if (members.isError || item.isError || shares.isError) {
		return (
			<p role="alert" className="p-4 text-sm text-destructive sm:p-6 lg:p-8">
				{errorMessage((members.error ?? item.error ?? shares.error) as Error)}
			</p>
		);
	}
	if (members.isPending || (editing && (item.isPending || shares.isPending))) {
		return <p className="p-4 text-sm text-muted-foreground sm:p-6 lg:p-8">Loading item…</p>;
	}

	return <ItemForm members={members.data} item={item.data} shares={shares.data} />;
}

export default ItemEditor;
