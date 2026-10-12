import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

function Home() {
	const navigate = useNavigate();

	return (
		<main className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background p-5">
			<div className="mt-24 flex flex-col items-center gap-6 text-center">
				<div className="size-16 rounded-3xl bg-primary" aria-hidden="true" />

				<div className="flex flex-col gap-3">
					<h1 className="font-heading text-lg font-semibold">Grocery Split</h1>
					<p className="text-balance font-heading text-2xl leading-snug font-bold">
						Split shared groceries, not friendships.
					</p>
					<p className="text-balance text-sm text-muted-foreground">
						Plan trips, keep one shared list, and see exactly who owes whom.
					</p>
				</div>
			</div>

			<div className="mt-auto flex flex-col gap-3 pt-10">
				<Button
					variant="outline"
					size="lg"
					className="w-full rounded-full"
					onClick={() => navigate("/groups/")}>
					<span className="size-4 shrink-0 rounded-full bg-[#4285F4]" aria-hidden="true" />
					Sign in with Google
				</Button>
				<p className="text-balance text-center text-xs text-muted-foreground">
					By continuing you agree to the Terms of Use and Privacy Policy.
				</p>
			</div>
		</main>
	);
}

export default Home;
