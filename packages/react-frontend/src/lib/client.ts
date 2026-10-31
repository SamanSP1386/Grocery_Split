import { hc } from "hono/client";
import type { AppType } from "@grocery-split/api";
import { createAuthClient } from "better-auth/react";

if (!import.meta.env.VITE_API_BASE) console.error("VITE_API_BASE not defined");

export const client = hc<AppType>(import.meta.env.VITE_API_BASE, {
	fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
		const res = await fetch(input, {
			credentials: "include",
			...init
		});
		if (!res.ok) {
			let message = res.status + ": " + res.statusText;
			try {
				const json = await res.json();
				if (json.message) message = json.message;
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (_err) {
				/* empty */
			}
			throw new Error(message);
		}
		return res;
	}
});

export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_API_BASE,
	basePath: "/api/auth",
	fetchOptions: {
		credentials: "include"
	}
});
