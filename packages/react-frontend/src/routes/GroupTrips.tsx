import { Link, useParams } from "react-router";
import { Plus, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Hardcoded example data for the placeholder UI. Real trip data will be wired
// up later; this just mirrors the design so the page renders identically.
const groupTrips = [
	{
		id: "trader-joes",
		name: "Trader Joe's",
		date: "2026-09-26",
		itemCount: 5,
		pendingCount: 2,
		total: "$18.46",
		members: ["AJ", "SM", "ML", "PN"]
	},
	{
		id: "costco-run",
		name: "Costco Run",
		date: "2026-09-19",
		itemCount: 12,
		pendingCount: 0,
		total: "$220.89",
		members: ["SM", "ML", "PN"]
	}
];

function GroupTrips() {
	const { groupId } = useParams();

	return (
		<>
			<section aria-label="Group trips" className="grid grid-cols-1 gap-3 sm:gap-4">
				{groupTrips.map((trip) => (
					<Link
						key={trip.id}
						to={`/groups/${groupId}/trips/${trip.id}`}
						className="min-w-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
						<Card className="gap-4 rounded-2xl p-4 shadow-sm transition-colors hover:bg-muted/30 sm:p-5">
							<div className="flex items-center justify-between gap-3">
								<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
									<ShoppingCart aria-hidden="true" className="size-5" />
								</div>
								<span
									className={cn(
										"flex h-9 w-28 shrink-0 items-center justify-center rounded-md text-xs font-semibold",
										trip.pendingCount
											? "bg-orange-100 text-orange-800"
											: "bg-emerald-100 text-emerald-800"
									)}>
									{trip.pendingCount ? `${trip.pendingCount} pending` : "All priced"}
								</span>
							</div>
							<div>
								<h2 className="font-heading text-lg font-semibold break-words">{trip.name}</h2>
								<p className="mt-1 text-sm text-muted-foreground">
									<time dateTime={trip.date}>
										{new Date(trip.date).toLocaleDateString("en-US", {
											weekday: "short",
											month: "short",
											day: "numeric",
											timeZone: "UTC"
										})}
									</time>
									{" · "}
									{trip.itemCount} items
								</p>
							</div>
							<div className="flex items-center justify-between gap-3 border-t pt-3">
								<p className="font-heading text-xl font-bold tabular-nums">{trip.total}</p>
								<AvatarGroup aria-label="Trip participants">
									{trip.members.map((member) => (
										<Avatar key={member} size="sm">
											<AvatarFallback>{member}</AvatarFallback>
										</Avatar>
									))}
								</AvatarGroup>
							</div>
						</Card>
					</Link>
				))}
				{groupTrips.length === 0 && (
					<Card className="items-center gap-3 rounded-2xl px-6 py-12 text-center shadow-sm">
						<ShoppingCart aria-hidden="true" className="size-8 text-primary" />
						<h2 className="font-heading text-lg font-semibold">No trips yet</h2>
						<p className="text-sm text-muted-foreground">
							Start a new trip to organize your next grocery run.
						</p>
					</Card>
				)}
			</section>
			<div className="mt-auto flex justify-end pt-4">
				<Button
					size="icon"
					aria-label="Create a trip"
					nativeButton={false}
					render={<Link to={`/groups/${groupId}/new-trip`} />}
					className="size-14 rounded-full shadow-md">
					<Plus aria-hidden="true" className="size-7" />
				</Button>
			</div>
		</>
	);
}

export default GroupTrips;
