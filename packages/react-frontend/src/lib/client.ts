import { hc } from "hono/client";
import type { AppType } from "@grocery-split/api";
import { createAuthClient } from "better-auth/react";

if (!import.meta.env.VITE_API_BASE) console.error("VITE_API_BASE not defined");

export const client = hc<AppType>(import.meta.env.VITE_API_BASE);

export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_API_BASE,
	basePath: "/api/auth"
});
