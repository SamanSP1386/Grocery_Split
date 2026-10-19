import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import HomePage from "./routes/HomePage";
import MyGroups from "./routes/MyGroups";
import CreateGroup from "./routes/CreateGroup";
import GroupTrips from "./routes/GroupTrips";
import CreateTrip from "./routes/CreateTrip";
import CreateItem from "./routes/CreateItem";
import GroupShoppingList from "./routes/GroupShoppingList";
import EditItem from "./routes/EditItem";
import GroupBalances from "./routes/GroupBalances";
import GroupInvite from "./routes/GroupInvite";
import AppLayout, { type PageHandle } from "./components/AppLayout";
import GroupTabs from "./components/GroupTabs";
import { groups } from "./data/groups";

// https://reactrouter.com/start/data/routing
const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />
	},
	{
		path: "/groups/",
		element: <MyGroups />
	},
	{
		// Group pages share their header and three section tabs
		element: <GroupTabs />,
		children: [
			{
				path: "/groups/:groupId/trips",
				element: <GroupTrips />,
				handle: { title: "Trips", back: "/groups/" } satisfies PageHandle
			},
			{
				path: "/groups/:groupId/trips/:tripId", // Currently only exists within trips (as per figma design), but may be changed to allow standalone list
				element: <GroupShoppingList />,
				handle: { title: "Trip", back: "/groups/:groupId/trips" } satisfies PageHandle
			},
			{
				path: "/groups/:groupId/list", // Group-wide list, the page itself is being built in #63
				element: <GroupShoppingList />,
				handle: { title: "Shopping List", back: "/groups/" } satisfies PageHandle
			},
			{
				path: "/groups/:groupId/balances",
				element: <GroupBalances />,
				handle: { title: "Balances", back: "/groups/" } satisfies PageHandle
			}
		]
	},
	{
		// Pages with the shared header and back button
		element: <AppLayout />,
		children: [
			{
				path: "/groups/new-group",
				element: <CreateGroup />,
				handle: { title: "New group", back: "/groups/", layout: "form" } satisfies PageHandle
			},
			{
				path: "/invite/:code",
				element: <GroupInvite />,
				handle: { title: "Join Group", back: "/groups/" } satisfies PageHandle
			},
			{
				path: "/groups/:groupId/new-trip",
				element: <CreateTrip />,
				handle: {
					title: "New trip",
					back: "/groups/:groupId/trips",
					layout: "form",
					subtitle: ({ groupId }) => {
						const group = groups.find((group) => group.id === groupId);
						return group ? `in ${group.name}` : undefined;
					}
				} satisfies PageHandle
			},
			{
				path: "/groups/:groupId/new-item",
				element: <CreateItem />,
				handle: {
					title: "Add item",
					back: "/groups/:groupId/list",
					layout: "form"
				} satisfies PageHandle
			},
			{
				path: "/groups/:groupId/trips/:tripId/new-item",
				element: <CreateItem />,
				handle: {
					title: "Add item",
					back: "/groups/:groupId/trips/:tripId",
					layout: "form"
				} satisfies PageHandle
			},
			{
				path: "/groups/:groupId/items/:itemId/edit",
				element: <EditItem />,
				handle: {
					title: "Edit item",
					back: "/groups/:groupId/list",
					layout: "form"
				} satisfies PageHandle
			},
			{
				path: "/groups/:groupId/trips/:tripId/items/:itemId/edit",
				element: <EditItem />,
				handle: {
					title: "Edit item",
					back: "/groups/:groupId/trips/:tripId",
					layout: "form"
				} satisfies PageHandle
			}
		]
	}
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);

// prompts for a refresh
const updateSW = registerSW({
	onNeedRefresh() {
		if (confirm("New content available. Reload?")) {
			updateSW(true);
		}
	}
});
