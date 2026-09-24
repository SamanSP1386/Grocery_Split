import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import Index from "./routes/Index";

// https://reactrouter.com/start/data/routing
const router = createBrowserRouter([
	{
		path: "/",
		element: <Index />
	}
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />,
	</StrictMode>
);
