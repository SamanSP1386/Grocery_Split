import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import Index from "./routes/Index";
import Groups from "./routes/Groups";
import CreateGroup from "./routes/CreateGroup";
import Trips from "./routes/Trips";
import CreateTrip from "./routes/CreateTrip";
import ShoppingList from "./routes/ShoppingList";
import EditItem from "./routes/EditItem";
import Balances from "./routes/Balances";
import Invite from "./routes/Invite";
import AppLayout, { type PageHandle } from "./components/AppLayout";
import GroupTabs from "./components/GroupTabs";

// https://reactrouter.com/start/data/routing
const router = createBrowserRouter([
	{
		path: "/",
		element: <Index />
	},
	{
		path: "/groups/",
		element: <Groups />
	},
	{
		// Pages with the shared header and back button
		element: <AppLayout />,
		children: [
			{
				path: "/groups/new-group",
				element: <CreateGroup />,
				handle: { title: "New Group", back: "/groups/" } satisfies PageHandle
			},
			{
				path: "/invite/:code",
				element: <Invite />,
				handle: { title: "Join Group", back: "/groups/" } satisfies PageHandle
			},
			{
				path: "/groups/:groupId/new-trip",
				element: <CreateTrip />,
				handle: { title: "New Trip", back: "/groups/:groupId/trips" } satisfies PageHandle
			},
			{
				path: "/groups/:groupId/trips/:tripId/items/:itemId/edit",
				element: <EditItem />,
				handle: {
					title: "Edit Item",
					back: "/groups/:groupId/trips/:tripId"
				} satisfies PageHandle
			},
			{
				// Pages inside a group also get the bottom tabs
				element: <GroupTabs />,
				children: [
					{
						path: "/groups/:groupId/trips",
						element: <Trips />,
						handle: { title: "Trips", back: "/groups/" } satisfies PageHandle
					},
					{
						path: "/groups/:groupId/trips/:tripId", // Currently only exists within trips (as per figma design), but may be changed to allow standalone list
						element: <ShoppingList />,
						handle: { title: "Trip", back: "/groups/:groupId/trips" } satisfies PageHandle
					},
					{
						path: "/groups/:groupId/list", // Group-wide list, the page itself is being built in #63
						element: <ShoppingList />,
						handle: { title: "Shopping List", back: "/groups/" } satisfies PageHandle
					},
					{
						path: "/groups/:groupId/balances",
						element: <Balances />,
						handle: { title: "Balances", back: "/groups/" } satisfies PageHandle
					}
				]
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
