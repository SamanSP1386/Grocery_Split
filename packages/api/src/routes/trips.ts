import { Hono } from "hono";
import type { AppEnv } from "../index.ts";
import { validateGroupParam } from "../middleware/validateParams.ts";

// Is a route defined in ./groups.ts so auth is already enforced
const trips = new Hono<AppEnv<true>>()
	.use(validateGroupParam) // Gives access to c.var.groupId for all these requests from /groups/:groupId/trips
	.get("/", (c) => {
		return c.json({ test: true });
	});

export default trips;
