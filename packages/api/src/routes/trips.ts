import { Hono } from "hono";
import type { AppEnv } from "../index.ts";
import { validateGroupAndTripParam, validateGroupParam } from "../middleware/validateParams.ts";

// Is a route defined in ./groups.ts so auth is already enforced
const trips = new Hono<AppEnv<true>>()
	.get("/", validateGroupParam, (c) => {
		return c.json({ test: true });
	})
	.get("/:tripId", validateGroupAndTripParam, (c) => {
		return c.json({ test: true });
	});

export default trips;
