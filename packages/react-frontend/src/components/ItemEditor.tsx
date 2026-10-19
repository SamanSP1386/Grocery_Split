import { useId } from "react";
import { Link, useParams } from "react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Hardcoded example data for the placeholder UI. Editing, saving, deleting, and
// live split recalculation will be wired up later; this just mirrors the design
// so the form renders identically.
const exampleMembers = [
	{ initial: "AJ", name: "You", selected: true, shares: 2, cost: "$3.99", percent: 50 },
	{ initial: "SM", name: "Sam", selected: true, shares: 1, cost: "$2.00", percent: 25 },
	{ initial: "ML", name: "Maya", selected: true, shares: 1, cost: "$1.99", percent: 25 },
	{ initial: "PN", name: "Priya", selected: false, shares: null, cost: "—", percent: null }
];
const exampleItem = { name: "Oat milk", quantity: "2 cartons", price: "7.98" };

function ItemEditor({ editing = false }: { editing?: boolean }) {
	const id = useId();
	const { groupId, tripId } = useParams();
	const back = tripId ? `/groups/${groupId}/trips/${tripId}` : `/groups/${groupId}/list`;
	const fieldClass = "h-12 rounded-xl border-border bg-card px-4 text-base md:text-base";

	return (
		<form className="flex flex-1 flex-col">
			<div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
				<div className="flex flex-col gap-2">
					<label htmlFor={`${id}-name`} className="text-sm font-semibold">
						Name
					</label>
					<Input
						id={`${id}-name`}
						name="name"
						defaultValue={editing ? exampleItem.name : ""}
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
							defaultValue={editing ? exampleItem.quantity : ""}
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
							defaultValue={editing ? exampleItem.price : ""}
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
						<Button type="button" variant="ghost" className="h-9 px-2 text-xs">
							Split equally
						</Button>
					</div>
					<div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-foreground/5">
						<div className="grid grid-cols-[minmax(0,1fr)_3rem_4.5rem] gap-2 border-b px-3 py-2 text-xs text-muted-foreground sm:px-4">
							<span>Member</span>
							<span className="text-center">Shares</span>
							<span className="text-right">Cost</span>
						</div>
						{exampleMembers.map((member) => (
							<div
								key={member.initial}
								className={cn(
									"grid grid-cols-[minmax(0,1fr)_3rem_4.5rem] items-center gap-2 border-b px-3 py-3 last:border-b-0 sm:px-4",
									!member.selected && "bg-muted/30"
								)}>
								<label className="flex min-w-0 cursor-pointer items-center gap-2">
									<input
										type="checkbox"
										checked={member.selected}
										readOnly
										aria-label={`Split with ${member.name}`}
										className="size-5 shrink-0 accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
									/>
									<Avatar size="sm">
										<AvatarFallback>{member.initial}</AvatarFallback>
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
									disabled={!member.selected}
									defaultValue={member.shares ?? ""}
									aria-label={`Shares for ${member.name}`}
									aria-describedby={`${id}-shares-hint`}
									className="h-10 rounded-lg bg-background px-1 text-center text-sm tabular-nums md:text-sm"
								/>
								<div className="text-right tabular-nums" aria-live="polite">
									<p className="text-sm font-semibold">{member.cost}</p>
									{member.selected && member.percent !== null && (
										<p className="text-xs text-muted-foreground">{member.percent}%</p>
									)}
								</div>
							</div>
						))}
					</div>
				</fieldset>
			</div>
			<footer className="mt-auto border-t p-4 sm:p-6 lg:p-8">
				<div className="mx-auto flex w-full max-w-xl flex-col gap-3">
					{editing && (
						<Button type="button" variant="ghost" className="text-destructive">
							Delete item
						</Button>
					)}
					<Button
						type="button"
						nativeButton={false}
						render={<Link to={back} />}
						className="h-14 w-full rounded-2xl text-base font-semibold">
						{editing ? "Save changes" : "Add item"}
					</Button>
				</div>
			</footer>
		</form>
	);
}

export default ItemEditor;
