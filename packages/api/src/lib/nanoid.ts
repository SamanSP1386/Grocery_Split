import { customAlphabet } from "nanoid";

export const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const nanoid = customAlphabet(alphabet, 16);
