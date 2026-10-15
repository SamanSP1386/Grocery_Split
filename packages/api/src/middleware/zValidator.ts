import type { ValidationTargets } from "hono";
import { HTTPException } from "hono/http-exception";
import { validator } from "hono/validator";
import type { z } from "zod";

export const zValidator = <Target extends keyof ValidationTargets, Schema extends z.ZodType>(
	target: Target,
	schema: Schema
) => {
	return validator(target, async (value): Promise<z.output<Schema>> => {
		const result = await schema.safeParseAsync(value);

		if (!result.success) throw new HTTPException(400, { message: result.error.issues[0].message });

		return result.data;
	});
};
