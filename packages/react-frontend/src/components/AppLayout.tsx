import { generatePath, Link, Outlet, useMatches, type Params, type UIMatch } from "react-router";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Set as a route's `handle` in main.tsx to configure the header for that page
export interface PageHandle {
	title: string;
	// Route pattern the back button links to, e.g. "/groups/:groupId/trips"
	back: string;
	layout?: "form";
	subtitle?: (params: Params<string>) => string | undefined;
}

// Deepest matched route that has a PageHandle, also used by GroupTabs
// eslint-disable-next-line react-refresh/only-export-components
export function usePageHandle() {
	return useMatches().findLast((match) => match.handle) as UIMatch<unknown, PageHandle> | undefined;
}

function AppLayout() {
	const page = usePageHandle();
	const isForm = page?.handle.layout === "form";
	const subtitle = page?.handle.subtitle?.(page.params);

	return (
		<main
			className={cn(
				"mx-auto flex min-h-dvh w-full flex-col bg-background",
				isForm ? "max-w-6xl" : "max-w-md gap-5 p-5"
			)}>
			{page && (
				<header
					className={cn(
						"flex shrink-0 items-center gap-2",
						isForm && "min-h-16 border-b px-4 py-3 sm:px-6 lg:px-8"
					)}>
					<Button
						variant="ghost"
						size="icon"
						className={cn("-ml-2", isForm && "size-10")}
						aria-label="Go back"
						nativeButton={false}
						render={<Link to={generatePath(page.handle.back, page.params)} />}>
						<ChevronLeft className="size-5" />
					</Button>
					<div className="min-w-0">
						<h1 className="font-heading text-xl font-bold">{page.handle.title}</h1>
						{subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
					</div>
				</header>
			)}
			<Outlet />
		</main>
	);
}

export default AppLayout;
