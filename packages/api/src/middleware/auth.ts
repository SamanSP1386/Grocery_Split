import { createMiddleware } from "hono/factory";
import { auth } from "../lib/auth.ts";
import type { AppEnv } from "../index.ts";
import { HTTPException } from "hono/http-exception";

export const useAuth = createMiddleware<AppEnv>(async (c, next) => {
	const session = await auth.api.getSession({
		headers: c.req.raw.headers
	});

	c.set("session", session);

	await next();
});

export const enforceAuth = createMiddleware<AppEnv>(async (c, next) => {
	if (c.get("session") === null) {
		throw new HTTPException(401, { message: "Not authorized" });
	}
	await next();
});
