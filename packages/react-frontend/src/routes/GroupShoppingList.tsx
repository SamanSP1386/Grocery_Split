import { useParams } from "react-router";
import { CircleX, ListChecks, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import AddButton from "@/components/AddButton";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { client } from "@/lib/client";
import ShoppingList from "@/components/ShoppingList";

function GroupShoppingList() {
	const { groupId, tripId } = useParams();
	const base = tripId ? `/groups/${groupId}/trips/${tripId}` : `/groups/${groupId}`;

	const getTrip = useCallback(
		() =>
			client.api.groups[":groupId"].trips[":tripId"]
				.$get({
					param: { groupId: groupId!, tripId: tripId! }
				})
				.then((res) => res.json()),
		[groupId, tripId]
	);

	const tripQuery = useQuery({
		queryKey: [groupId, "trip", tripId],
		queryFn: getTrip,
		enabled: tripId != undefined
	});

	const getItems = useCallback(
		() =>
			client.api.groups[":groupId"].items
				.$get({
					param: { groupId: groupId! },
					query: { tripId }
				})
				.then((res) => res.json()),
		[groupId, tripId]
	);

	const itemsQuery = useQuery({ queryKey: [groupId, "shopping-list", tripId], queryFn: getItems });

	return (
		<section
			aria-label={tripId ? "Trip items" : "Group shopping list"}
			className="flex flex-1 flex-col gap-4">
			<h2 className="font-heading text-lg font-semibold">
				{tripId && tripQuery.isSuccess ? tripQuery.data!.name : "Shopping list"}
			</h2>
			{!itemsQuery.isLoading ? (
				itemsQuery.isSuccess ? (
					itemsQuery.data.length ? (
						<ShoppingList base={base} items={itemsQuery.data} />
					) : (
						<Card className="items-center gap-3 rounded-2xl px-6 py-12 text-center shadow-sm">
							<ListChecks aria-hidden="true" className="size-8 text-primary" />
							<h3 className="text-lg font-semibold">No items yet</h3>
						</Card>
					)
				) : (
					<Card className="items-center gap-3 rounded-2xl px-6 py-12 text-center shadow-sm">
						<CircleX aria-hidden="true" className="size-8 text-primary" />
						<h3 className="text-lg font-semibold">
							Error fetching data: {itemsQuery.error?.message || "Unknown Error"}
						</h3>
					</Card>
				)
			) : (
				<Card className="items-center gap-3 rounded-2xl px-6 py-12 text-center shadow-sm">
					<Loader2 aria-hidden="true" className="size-8 text-primary" />
					<h3 className="text-lg font-semibold">Loading...</h3>
				</Card>
			)}
			<AddButton to={`${base}/new-item`} label="Add an item" />
		</section>
	);
}

export default GroupShoppingList;
