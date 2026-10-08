import { Hono } from "hono";
import { validator, type Group } from "@grocery-split/validation";
import { zValidator } from "../middleware/zValidator.ts";
import type { AppEnv } from "../index.ts";
import { enforceAuth } from "../middleware/auth.ts";
import { nanoid } from "../lib/nanoid.ts";
import { db } from "../lib/db.ts";
import { schema } from "@grocery-split/db";

const group = new Hono<AppEnv>()
	.use(enforceAuth)

	.get("/", async (c) => {
		const { user } = c.get("session")!;

		const res = await db.query.membership.findMany({
			columns: {},
			where: {
				userId: user.id
			},
			with: {
				group: true
			}
		});

		return c.json(res.map((memberships) => memberships.group) as Group[]);
	})

	.post("/", zValidator("json", validator.group), async (c) => {
		const { user } = c.get("session")!;
		const data = c.req.valid("json");

		const res = await db.insert(schema.group).values({
			id: nanoid(),
			...data,
			ownerId: user.id
		});

		return c.json(res.results[0] as Group);
	});

export default group;
