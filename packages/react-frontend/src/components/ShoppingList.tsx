import type { PopulatedItem } from "@grocery-split/validation";
import { Link } from "react-router";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarGroup } from "./ui/avatar";

function ShoppingList({ base, items }: { base: string; items: PopulatedItem[] }) {
	return (
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
										{item.wantedBy.map((wantedItem) => (
											<Avatar key={wantedItem.userId} size="sm">
												<AvatarFallback>{wantedItem.user.name}</AvatarFallback>
											</Avatar>
										))}
									</AvatarGroup>
								</div>
							</div>
						</Card>
					</Link>
				</li>
			))}
		</ul>
	);
}

export default ShoppingList;
