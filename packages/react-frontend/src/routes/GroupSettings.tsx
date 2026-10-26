import { useId, useState, type FormEvent } from "react";
import { useParams } from "react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { groups } from "@/data/groups";
import { cn } from "@/lib/utils";

function GroupSettings() {
	const { groupId } = useParams();
	const group = groups.find((group) => group.id === groupId);
	const nameId = useId();
	const [name, setName] = useState(group?.name ?? "");
	const [nameError, setNameError] = useState("");
	const [nameStatus, setNameStatus] = useState("");
	const [newOwner, setNewOwner] = useState(group?.owner ?? "");
	const [ownerStatus, setOwnerStatus] = useState("");

	if (!group) {
		return <p className="text-sm text-muted-foreground">This group couldn't be found.</p>;
	}

	function handleRename(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!name.trim()) {
			setNameError("Enter a name to continue.");
			return;
		}
		// Connect renaming here once the frontend has an authenticated API client.
		setNameStatus("Renaming groups isn't available yet.");
	}

	function handleTransfer(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		// Connect ownership transfer here once the frontend has an authenticated API client.
		setOwnerStatus("Transferring ownership isn't available yet.");
	}

	return (
		<div className="flex flex-col gap-5">
			<Card className="gap-0 rounded-2xl p-4 shadow-sm sm:p-5">
				<form noValidate onSubmit={handleRename} className="flex flex-col gap-3">
					<label htmlFor={nameId} className="font-heading text-base font-semibold">
						Group name
					</label>
					<Input
						id={nameId}
						name="name"
						value={name}
						onChange={(event) => {
							setName(event.target.value);
							setNameError("");
							setNameStatus("");
						}}
						required
						maxLength={128}
						autoComplete="off"
						aria-invalid={Boolean(nameError)}
						aria-describedby={nameError ? `${nameId}-error` : undefined}
						className="h-12 rounded-xl px-4 text-base md:text-base"
					/>
					{nameError && (
						<p id={`${nameId}-error`} role="alert" className="text-sm text-destructive">
							{nameError}
						</p>
					)}
					{nameStatus && (
						<p role="status" className="text-sm text-muted-foreground">
							{nameStatus}
						</p>
					)}
					<Button
						type="submit"
						disabled={name.trim() === group.name}
						className="h-11 w-full rounded-xl font-semibold">
						Save name
					</Button>
				</form>
			</Card>

			<Card className="gap-0 rounded-2xl p-4 shadow-sm sm:p-5">
				<form onSubmit={handleTransfer} className="flex flex-col gap-3">
					<fieldset className="flex flex-col gap-3">
						<legend className="mb-1 font-heading text-base font-semibold">Group owner</legend>
						<p className="text-sm text-muted-foreground">
							Pick a member to hand ownership of this group to.
						</p>
						<div className="flex flex-col gap-2">
							{group.members.map((member) => (
								<label
									key={member}
									className={cn(
										"flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 transition-colors has-focus-visible:ring-2 has-focus-visible:ring-ring",
										newOwner === member ? "border-primary bg-primary/5" : "hover:bg-muted/30"
									)}>
									<input
										type="radio"
										name="owner"
										value={member}
										checked={newOwner === member}
										onChange={() => {
											setNewOwner(member);
											setOwnerStatus("");
										}}
										className="sr-only"
									/>
									<Avatar size="sm">
										<AvatarFallback>{member}</AvatarFallback>
									</Avatar>
									<span className="flex-1 text-sm font-medium">{member}</span>
									{member === group.owner && (
										<span className="text-xs text-muted-foreground">Current owner</span>
									)}
								</label>
							))}
						</div>
					</fieldset>
					{ownerStatus && (
						<p role="status" className="text-sm text-muted-foreground">
							{ownerStatus}
						</p>
					)}
					<Button
						type="submit"
						variant="outline"
						disabled={newOwner === group.owner}
						className="h-11 w-full rounded-xl font-semibold">
						Transfer ownership
					</Button>
				</form>
			</Card>
		</div>
	);
}

export default GroupSettings;
