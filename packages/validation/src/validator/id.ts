import z from "zod";

export const idValidator = z
	.string()
	.regex(/[0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]{16}/, "Invalid ID");
