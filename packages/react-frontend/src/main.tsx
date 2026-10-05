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
		path: "/groups/new-group",
		element: <CreateGroup />
	},
	{
		path: "/groups/:groupId/trips",
		element: <Trips />
	},
	{
		path: "/groups/:groupId/new-trip",
		element: <CreateTrip />
	},
	{
		path: "/groups/:groupId/trips/:tripId", // Currently only exists within trips (as per figma design), but may be changed to allow standalone list
		element: <ShoppingList />
	},
	{
		path: "/groups/:groupId/trips/:tripId/items/:itemId/edit",
		element: <EditItem />
	},
	{
		path: "/groups/:groupId/balances",
		element: <Balances />
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
