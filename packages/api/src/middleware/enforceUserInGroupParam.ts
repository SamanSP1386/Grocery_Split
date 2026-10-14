import { createMiddleware } from "hono/factory";
import type { AppEnv } from "../index.ts";
import { schema } from "@grocery-split/db";
import { and, eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import { db } from "../lib/db.ts";

// If groupId is in the parameter, makes sure the requesting user is a part of that group
// Requires the groupId parameter to already be validated
export const enforceUserInGroupParam = createMiddleware<
	AppEnv,
	string,
	{ out: { param: { groupId: string } } }
>(async (c, next) => {
	const { groupId } = c.req.valid("param");
	const { user } = c.get("session")!;

	const [existingMembership] = await db
		.select({ groupId: schema.membership.groupId })
		.from(schema.membership)
		.where(and(eq(schema.membership.groupId, groupId), eq(schema.membership.userId, user.id)));
	if (!existingMembership) throw new HTTPException(404, { message: "Group Not Found" });

	await next();
});
