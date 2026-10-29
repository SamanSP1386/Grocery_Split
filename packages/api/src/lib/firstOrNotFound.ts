import { HTTPException } from "hono/http-exception";

export function firstOrNotFound<T>(rows: T[], message: string): T {
	if (rows.length < 1) throw new HTTPException(404, { message });
	return rows[0];
}
