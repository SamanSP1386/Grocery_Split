import { hc } from "hono/client";
import type { AppType } from "@grocery-split/api";

if (!import.meta.env.VITE_API_BASE) console.error("VITE_API_BASE not defined");

export const client = hc<AppType>(import.meta.env.VITE_API_BASE);
