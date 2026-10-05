import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router";
import { Plus, ChevronRight } from "lucide-react";

const groups = [
	{
		id: "apartment-4b",
		initial: "A",
		name: "Apartment 4B",
		members: ["SM", "ML", "PN", "AJ"],
		lastTrip: "Sat, Sep 26",
		balance: "You're owed $18.50",
		balanceStyle: "bg-emerald-100 text-emerald-800"
	},
	{
		id: "weekend-cabin",
		initial: "W",
		name: "Weekend Cabin Trip",
		members: ["SM", "LK", "PN", "AJ"],
		lastTrip: "Sat, Sep 20",
		balance: "You owe $32.00",
		balanceStyle: "bg-orange-100 text-orange-800"
	},
	{
		id: "csc-study-group",
		initial: "C",
		name: "CSC Study Group",
		members: ["SM", "LK", "UT"],
		lastTrip: "Thu, Sep 10",
		balance: "Settled up",
		balanceStyle: "bg-muted text-muted-foreground"
	}
];

function Groups() {
	const navigate = useNavigate();

	return (
		<main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-5 bg-background p-5">
			<header className="flex items-center justify-between gap-4">
				<div>
					<h1 className="font-heading text-xl font-bold">My Groups</h1>
					<p className="mt-1 text-xs font-medium text-muted-foreground">
						Have a code?{" "}
						<button className="text-foreground underline underline-offset-2">Join a group</button>
					</p>
				</div>
				<Avatar className="bg-muted">
					<AvatarFallback>AJ</AvatarFallback>
				</Avatar>
			</header>

			<section aria-label="Your groups" className="flex flex-col gap-3">
				{groups.map((group) => (
					<Link
						key={group.id}
						to={`/groups/${group.id}/trips`}
						className="rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
						<Card className="flex-row items-center gap-3 rounded-2xl p-3 shadow-sm transition-colors hover:bg-muted/30">
							<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted font-heading font-semibold text-muted-foreground">
								{group.initial}
							</div>
							<div className="min-w-0 flex-1">
								<div className="flex flex-wrap items-center justify-between gap-2">
									<h2 className="truncate text-sm font-semibold">{group.name}</h2>
									<span
										className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${group.balanceStyle}`}>
										{group.balance}
									</span>
								</div>
								<div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
									<span>{group.members.length} members</span>
									<span aria-hidden="true">·</span>
									<span className="truncate">last trip {group.lastTrip}</span>
								</div>
								<AvatarGroup className="mt-2">
									{group.members.map((member) => (
										<Avatar key={member} size="sm" className="bg-muted">
											<AvatarFallback>{member}</AvatarFallback>
										</Avatar>
									))}
								</AvatarGroup>
							</div>
							<ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
						</Card>
					</Link>
				))}
			</section>

			<div className="mt-auto flex justify-end pt-4">
				<Button
					size="icon"
					className="size-12 rounded-full shadow-md"
					aria-label="Create a group"
					onClick={() => navigate("/groups/new-group")}>
					<Plus className="size-5" />
				</Button>
			</div>
		</main>
	);
}

export default Groups;
