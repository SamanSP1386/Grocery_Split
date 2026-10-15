import { createMiddleware } from "hono/factory";
import type { AppEnv } from "../index.ts";
import { schema } from "@grocery-split/db";
import { and, eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import { db } from "../lib/db.ts";
import { validator } from "@grocery-split/validation";

// If groupId is in the parameter, makes sure the requesting user is a part of that group
export const validateGroupParam = createMiddleware<
	AppEnv<true> & { Variables: { groupId: string } }
>(async (c, next) => {
	const { user } = c.var.session;

	const { success, data, error } = await validator.groupParams.safeParseAsync(c.req.param());
	if (!success) throw new HTTPException(400, { message: error.issues[0].message });

	const [existingMembership] = await db
		.select({ groupId: schema.membership.groupId })
		.from(schema.membership)
		.where(and(eq(schema.membership.groupId, data.groupId), eq(schema.membership.userId, user.id)));
	if (!existingMembership) throw new HTTPException(404, { message: "Group Not Found" });

	c.set("groupId", data.groupId);

	await next();
});
