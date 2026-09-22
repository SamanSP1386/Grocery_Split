import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/db/schema/*",
	out: "./supabase/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.ADMIN_DATABASE_URL!
	}
});
