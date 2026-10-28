import { Hono } from "hono";
import type { AppEnv } from "../index.ts";
import { db } from "../lib/db.ts";
import { schema } from "@grocery-split/db";
import { validator, type Item } from "@grocery-split/validation";
import { eq, and, isNull } from "drizzle-orm";
import { zValidator } from "../middleware/zValidator.ts";
import { validateGroupAndItemParam, validateGroupParam } from "../middleware/validateParams.ts";
import { HTTPException } from "hono/http-exception";
// Is a route defined in ./groups.ts so auth is already enforced
const items = new Hono<AppEnv<true>>()
	// Getting all items in the main list (if ?trip=null), or only a specific trip (?trip=id_here)
	.get("/", validateGroupParam, zValidator("query", validator.tripQuery), async (c) => {
		const { tripId } = c.req.valid("query");

		const res = await db
			.select()
			.from(schema.item)
			.where(
				and(
					eq(schema.item.groupId, c.var.groupId),
					tripId !== undefined ? eq(schema.item.tripId, tripId) : isNull(schema.item.tripId)
				)
			);

		return c.json(res as Item[]);
	})

	.get("/:itemId", validateGroupAndItemParam, async (c) => {
		const res = await db.select().from(schema.item).where(eq(schema.item.id, c.var.itemId));

		if (res.length < 1) throw new HTTPException(404, { message: "Item Not Found" });
		return c.json(res[0] as Item);
	});

export default items;
