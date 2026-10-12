import { auth } from "./lib/auth.ts";
import { Hono, type Env } from "hono";
import group from "./routes/groups.ts";
import { HTTPException } from "hono/http-exception";
import { useAuth } from "./middleware/auth.ts";

export interface AppEnv extends Env {
	Bindings: CloudflareBindings;
	Variables: {
		session: typeof auth.$Infer.Session | null;
	};
}

const app = new Hono<AppEnv>()
	.basePath("/api")

	// auth
	.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw))
	.use(useAuth) // Doesn't enforce it, just handles it if it exists. Use `router.use(enforceAuth)` for that.

	// routes
	.route("/group", group)

	// error handling
	.onError((err, c) => {
		// For thrown http errors
		if (err instanceof HTTPException) {
			return c.json(
				{
					message: err.message
				},
				err.status
			);
		}
		// For any other unexpected errors, log and return a generic 500 response
		console.error(err);
		return c.json(
			{
				message: "Internal Server Error"
			},
			500
		);
	});

export default app;

export type AppType = typeof app;
