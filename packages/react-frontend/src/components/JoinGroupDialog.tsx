import { useId, useState, type FormEvent } from "react";
import { generatePath, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { parseInviteCode } from "@/lib/invite";

function JoinGroupDialog() {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const inputId = useId();
	const errorId = useId();

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const code = parseInviteCode(String(new FormData(event.currentTarget).get("code") ?? ""));

		if (!code) {
			setError("Invite codes are up to 16 letters and numbers.");
			return;
		}

		// The invite page handles joining, so codes and shared links go through the same place
		navigate(generatePath("/invite/:code", { code }));
	}

	return (
		<Dialog onOpenChange={() => setError(null)}>
			<DialogTrigger className="text-foreground underline underline-offset-2">
				Join a group
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Join a group</DialogTitle>
					<DialogDescription>
						Enter the invite code a group member shared with you.
					</DialogDescription>
				</DialogHeader>

				<form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<label htmlFor={inputId} className="text-xs font-medium">
							Invite code
						</label>
						<Input
							id={inputId}
							name="code"
							autoComplete="off"
							autoCapitalize="none"
							spellCheck={false}
							aria-invalid={error !== null}
							aria-describedby={error ? errorId : undefined}
						/>
						{error && (
							<p id={errorId} className="text-xs text-destructive">
								{error}
							</p>
						)}
					</div>
					<DialogFooter>
						<Button type="submit" className="w-full">
							Continue
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default JoinGroupDialog;
