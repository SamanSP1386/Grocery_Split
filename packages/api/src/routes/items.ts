import { Hono } from "hono";
import type { AppEnv } from "../index.ts";
import { db } from "../lib/db.ts";
import { schema } from "@grocery-split/db";
import { validator, type Item } from "@grocery-split/validation";
import { eq, and, isNull } from "drizzle-orm";
import { zValidator } from "../middleware/zValidator.ts";
import { validateGroupAndItemParam, validateGroupParam } from "../middleware/validateParams.ts";
import { firstOrNotFound } from "../lib/firstOrNotFound.ts";
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

		return c.json(firstOrNotFound(res, "Item Not Found") as Item);
	});

export default items;
