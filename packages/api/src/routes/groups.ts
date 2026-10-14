import { Hono } from "hono";
import { validator, type Group } from "@grocery-split/validation";
import { zValidator } from "../middleware/zValidator.ts";
import type { AppEnv } from "../index.ts";
import { enforceAuth } from "../middleware/auth.ts";
import { nanoid } from "../lib/nanoid.ts";
import { db } from "../lib/db.ts";
import { schema } from "@grocery-split/db";
import { and, eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import { enforceUserInGroupParam } from "../middleware/enforceUserInGroupParam.ts";

const group = new Hono<AppEnv<true>>()
	.use(enforceAuth)

	// Getting all groups (that the current user is in)
	.get("/", async (c) => {
		const { user } = c.var.session;

		// Join with memberships to select groups with a membership user id
		const res = await db
			.select({ id: schema.group.id, name: schema.group.name, ownerId: schema.group.ownerId })
			.from(schema.group)
			.innerJoin(schema.membership, eq(schema.group.id, schema.membership.groupId))
			.where(eq(schema.membership.userId, user.id));

		return c.json(res as Group[]);
	})

	// Getting group by id
	.get(
		"/:groupId",
		zValidator("param", validator.groupParams),
		enforceUserInGroupParam,
		async (c) => {
			const { groupId } = c.req.valid("param");

			// We know the user must be a part of this group due to the enforceUserInGroup middleware
			const res = await db.select().from(schema.group).where(eq(schema.group.id, groupId));

			if (res.length < 1) throw new HTTPException(404, { message: "Group Not Found" });
			return c.json(res[0] as Group);
		}
	)

	// Creating groups
	.post("/", zValidator("json", validator.group), async (c) => {
		const { user } = c.var.session;
		const data = c.req.valid("json");

		const res = await db
			.insert(schema.group)
			.values({
				id: nanoid(),
				...data,
				ownerId: user.id
			})
			.returning();

		if (res.length < 1) throw new HTTPException(404, { message: "Group Not Found" });
		return c.json(res[0] as Group);
	})

	// Updating group
	.patch(
		"/:groupId",
		zValidator("param", validator.groupParams),
		enforceUserInGroupParam,
		zValidator("json", validator.group),
		async (c) => {
			const data = c.req.valid("json");
			const { groupId } = c.req.valid("param");

			// Update the actual group
			const res = await db
				.update(schema.group)
				.set({
					...data
				})
				.where(eq(schema.group.id, groupId))
				.returning();

			if (res.length < 1) throw new HTTPException(404, { message: "Group Not Found" });
			return c.json(res[0] as Group);
		}
	)

	// Updating group owner (can only be done by the existing group owner)
	.patch(
		"/:groupId/owner",
		zValidator("param", validator.groupParams),
		enforceUserInGroupParam,
		zValidator("json", validator.groupOwner),
		async (c) => {
			const { user } = c.var.session;
			const data = c.req.valid("json");
			const { groupId } = c.req.valid("param");

			// Make sure the new user is part of the group
			const [existingMembership] = await db
				.select({ groupId: schema.membership.groupId })
				.from(schema.membership)
				.where(
					and(eq(schema.membership.groupId, groupId), eq(schema.membership.userId, data.ownerId))
				);
			if (!existingMembership) throw new HTTPException(404, { message: "User Not In Group" });

			// Update the actual group
			const res = await db
				.update(schema.group)
				.set({
					...data
				})
				.where(and(eq(schema.group.id, groupId), eq(schema.group.ownerId, user.id))) // Make sure the current ownerId matches the user making the request
				.returning();

			if (res.length < 1) throw new HTTPException(404, { message: "Group Not Found" });
			return c.json(res[0] as Group);
		}
	);

export default group;
