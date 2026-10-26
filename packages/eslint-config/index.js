// @ts-check

import js from "@eslint/js";
import { defineConfig, includeIgnoreFile } from "eslint/config";
import tseslint from "typescript-eslint";
import { join } from "node:path";

/**
 * Shared eslint config for every package, extend it in a package's eslint.config.mjs to add rules
 * @param {string} packageDir The package's root directory, pass in `import.meta.dirname`
 */
export function baseConfig(packageDir) {
	return defineConfig(
		includeIgnoreFile(join(packageDir, ".gitignore"), { gitignoreResolution: true }),
		{
			files: ["**/*.{js,ts,tsx}"],
			extends: [js.configs.recommended, tseslint.configs.recommended],
			languageOptions: {
				parserOptions: {
					projectService: true,
					tsconfigRootDir: packageDir
				}
			}
		}
	);
}
