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
		path: "/group/:groupId",
		element: <Groups />
	},
	{
		path: "/group/new-group",
		element: <CreateGroup />
	},
	{
		path: "/group/:groupId/trips",
		element: <Trips />
	},
	{
		path: "/group/:groupId/new-trip",
		element: <CreateTrip />
	},
	{
		path: "/group/:groupId/trip/:tripId", // Currently only exists within trips (as per figma design), but may be changed to allow standalone list
		element: <ShoppingList />
	},
	{
		path: "/group/:groupId/trip/:tripId/item/:itemId/edit",
		element: <EditItem />
	},
	{
		path: "/group/:groupId/balances",
		element: <Balances />
	}
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />,
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
