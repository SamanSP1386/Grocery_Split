// @ts-check

import { baseConfig } from "@grocery-split/eslint-config";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";

// Extends the shared config with the react specific rules
export default defineConfig(baseConfig(import.meta.dirname), {
	files: ["**/*.{ts,tsx}"],
	extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
	languageOptions: {
		globals: globals.browser
	}
});
