import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { groups } from "@/data/groups";
import AddButton from "@/components/AddButton";

function MyGroups() {
	return (
		<main className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col gap-5 bg-background p-4 sm:gap-6 sm:p-6 lg:p-8">
			<header className="flex items-center justify-between gap-4">
				<h1 className="font-heading text-xl font-bold sm:text-2xl">My Groups</h1>
				<Avatar className="size-12 bg-muted">
					<AvatarFallback className="text-lg">AJ</AvatarFallback>
				</Avatar>
			</header>

			<section aria-label="Your groups" className="grid grid-cols-1 gap-3 sm:gap-4">
				{groups.map((group) => (
					<Link
						key={group.id}
						to={`/groups/${group.id}/list`}
						className="min-w-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
						<Card className="h-full flex-row items-stretch gap-0 rounded-2xl p-0 shadow-sm transition-colors hover:bg-muted/30">
							<div className="flex min-w-0 flex-1 items-center gap-2 p-3 sm:gap-3 sm:p-4">
								<div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-muted font-heading font-semibold text-muted-foreground sm:size-10">
									{group.initial}
								</div>
								<div className="min-w-0 flex-1">
									<h2 className="truncate text-sm font-semibold sm:text-base" title={group.name}>
										{group.name}
									</h2>
									<AvatarGroup className="mt-2">
										{group.members.map((member) => (
											<Avatar key={member} size="sm" className="bg-muted">
												<AvatarFallback>{member}</AvatarFallback>
											</Avatar>
										))}
									</AvatarGroup>
								</div>
								<ChevronRight
									aria-hidden="true"
									className="size-4 shrink-0 text-muted-foreground"
								/>
							</div>
							<span
								className={`flex w-28 shrink-0 flex-col items-center justify-center px-2 py-3 text-xs font-medium ${group.balanceStyle}`}>
								<span>{group.balanceLabel}</span>
								{group.balanceAmount && (
									<span className="text-sm font-semibold tabular-nums">{group.balanceAmount}</span>
								)}
							</span>
						</Card>
					</Link>
				))}
			</section>

			<AddButton to="/groups/new-group" label="Create a group" />
		</main>
	);
}

export default MyGroups;
