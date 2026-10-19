import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CreateNameFormProps {
	label: string;
	placeholder: string;
	description: string;
	unavailableMessage: string;
}

function CreateNameForm({
	label,
	placeholder,
	description,
	unavailableMessage
}: CreateNameFormProps) {
	const inputId = useId();
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const [status, setStatus] = useState("");

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!name.trim()) {
			setError("Enter a name to continue.");
			return;
		}
		// Connect creation here once the frontend has an authenticated API client.
		setStatus(unavailableMessage);
	}

	return (
		<form className="flex flex-1 flex-col" onSubmit={handleSubmit}>
			<div className="flex min-h-72 flex-1 items-center px-6 py-12 sm:px-6 lg:px-8">
				<div className="mx-auto w-full max-w-xl">
					<label htmlFor={inputId} className="mb-2 block text-sm font-semibold">
						{label}
					</label>
					<Input
						id={inputId}
						name="name"
						value={name}
						onChange={(event) => {
							setName(event.target.value);
							setError("");
							setStatus("");
						}}
						placeholder={placeholder}
						required
						maxLength={128}
						autoComplete="off"
						aria-invalid={Boolean(error)}
						aria-describedby={`${inputId}-hint${error ? ` ${inputId}-error` : ""}`}
						className="h-14 rounded-2xl border-primary bg-card px-4 text-base shadow-sm md:text-base"
					/>
					<p id={`${inputId}-hint`} className="mt-3 text-sm leading-snug text-muted-foreground">
						{description}
					</p>
					{error && (
						<p id={`${inputId}-error`} role="alert" className="mt-2 text-sm text-destructive">
							{error}
						</p>
					)}
				</div>
			</div>
			<footer className="shrink-0 border-t p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-6 lg:p-8">
				<div className="mx-auto w-full max-w-xl">
					{status && (
						<p role="status" className="mb-3 text-center text-sm text-muted-foreground">
							{status}
						</p>
					)}
					<Button type="submit" className="h-14 w-full rounded-2xl text-base font-semibold">
						Create
					</Button>
				</div>
			</footer>
		</form>
	);
}

export default CreateNameForm;
