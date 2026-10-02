// @ts-check

import js from "@eslint/js";
import { defineConfig, includeIgnoreFile } from "eslint/config";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "node:url";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig(includeIgnoreFile(gitignorePath, { gitignoreResolution: true }), {
	files: ["**/*.{js,ts}"],
	extends: [js.configs.recommended, tseslint.configs.recommended],
	languageOptions: {
		parserOptions: {
			projectService: true,
			tsconfigRootDir: import.meta.dirname
		}
	}
});
