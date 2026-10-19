import { generatePath, Link, Outlet, useMatches, type UIMatch } from "react-router";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Set as a route's `handle` in main.tsx to configure the header for that page
export interface PageHandle {
	title: string;
	// Route pattern the back button links to, e.g. "/groups/:groupId/trips"
	back: string;
}

function AppLayout() {
	const page = useMatches().findLast((match) => match.handle) as
		UIMatch<unknown, PageHandle> | undefined;

	return (
		<main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-5 bg-background p-5">
			{page && (
				<header className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="icon"
						className="-ml-2"
						aria-label="Go back"
						nativeButton={false}
						render={<Link to={generatePath(page.handle.back, page.params)} />}>
						<ChevronLeft className="size-5" />
					</Button>
					<h1 className="font-heading text-xl font-bold">{page.handle.title}</h1>
				</header>
			)}
			<Outlet />
		</main>
	);
}

export default AppLayout;
