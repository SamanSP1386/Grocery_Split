import { Link, useParams } from "react-router";
import { ArrowLeft, ListChecks } from "lucide-react";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AddButton from "@/components/AddButton";

// Hardcoded example data for the placeholder UI. Real item data will be wired
// up later; this just mirrors the design so the page renders identically.
const tripName = "Trader Joe's";
const pending = 2;
const total = "$18.46";
const items = [
	{
		id: "oat-milk",
		name: "Oat milk",
		quantity: "2 cartons",
		price: "$7.98",
		members: ["AJ", "SM", "ML"]
	},
	{
		id: "eggs",
		name: "Eggs",
		quantity: "1 dozen",
		price: "$4.49",
		members: ["AJ", "SM", "ML", "PN"]
	},
	{ id: "avocados", name: "Avocados", quantity: "4", price: null, members: ["ML", "PN"] },
	{
		id: "sourdough",
		name: "Sourdough loaf",
		quantity: "1 loaf",
		price: "$5.99",
		members: ["AJ", "SM"]
	},
	{
		id: "bananas",
		name: "Bananas",
		quantity: "1 bunch",
		price: null,
		members: ["AJ", "SM", "ML", "PN"]
	}
];

function GroupShoppingList() {
	const { groupId, tripId } = useParams();
	const base = tripId ? `/groups/${groupId}/trips/${tripId}` : `/groups/${groupId}`;

	return (
		<section
			aria-label={tripId ? "Trip items" : "Group shopping list"}
			className="flex flex-1 flex-col gap-4">
			<div className="flex items-center gap-2">
				{tripId && (
					<Link
						to={`/groups/${groupId}/trips`}
						aria-label="Back to trips"
						className="-ml-2 flex size-10 shrink-0 items-center justify-center rounded-xl hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
						<ArrowLeft aria-hidden="true" className="size-5" />
					</Link>
				)}
				<h2 className="font-heading text-lg font-semibold">
					{tripId ? tripName : "Shopping list"}
				</h2>
			</div>
			{items.length > 0 && (
				<div className="flex flex-wrap items-center justify-between gap-3">
					<p className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
						<span>
							{items.length} {items.length === 1 ? "item" : "items"}
						</span>
						{pending > 0 && <span className="font-medium text-orange-800">{pending} pending</span>}
					</p>
					<p className="text-lg font-bold tabular-nums" title="Total of priced items">
						<span className="sr-only">Priced total: </span>
						{total}
					</p>
				</div>
			)}
			{items.length ? (
				<ul className="grid grid-cols-1 gap-3 sm:gap-4">
					{items.map((item) => (
						<li key={item.id} className="min-w-0">
							<Link
								to={`${base}/items/${item.id}/edit`}
								aria-label={`Edit ${item.name}`}
								className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
								<Card className="flex-row items-stretch gap-0 rounded-2xl p-0 shadow-sm transition-colors hover:bg-muted/30">
									<div className="min-w-0 flex-1 p-4 sm:p-5">
										<h3 className="truncate text-base font-semibold" title={item.name}>
											{item.name}
										</h3>
										<div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
											{item.quantity && (
												<span className="text-sm text-muted-foreground">{item.quantity}</span>
											)}
											<AvatarGroup aria-label="Sharing this item">
												{item.members.map((member) => (
													<Avatar key={member} size="sm">
														<AvatarFallback>{member}</AvatarFallback>
													</Avatar>
												))}
											</AvatarGroup>
										</div>
									</div>
									<span
										className={cn(
											"flex w-28 shrink-0 items-center justify-center px-2 py-4 text-sm font-semibold tabular-nums sm:text-base",
											item.price === null
												? "bg-orange-100 text-orange-800"
												: "bg-secondary/50 text-foreground"
										)}>
										{item.price === null ? "Pending" : item.price}
									</span>
								</Card>
							</Link>
						</li>
					))}
				</ul>
			) : (
				<Card className="items-center gap-3 rounded-2xl px-6 py-12 text-center shadow-sm">
					<ListChecks aria-hidden="true" className="size-8 text-primary" />
					<h3 className="text-lg font-semibold">No items yet</h3>
				</Card>
			)}
			<AddButton to={`${base}/new-item`} label="Add an item" />
		</section>
	);
}

export default GroupShoppingList;
