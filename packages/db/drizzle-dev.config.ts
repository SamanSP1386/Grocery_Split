import { createHash, createHmac } from "crypto";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { globSync } from "fs";

export function durableObjectNamespaceIdFromName(uniqueKey: string, name: string) {
	/**
	 * In v3.2, miniflare uses durable object to implement D1 and hashes the local sqlite filename.
	 *
	 * See the following for more context:
	 * https://github.com/cloudflare/workers-sdk/issues/4548 (understand the hash of the local D1 filename)
	 * https://github.com/cloudflare/miniflare/releases/tag/v3.20230918.0
	 *
	 * This function is copied from these links
	 */
	const key = createHash("sha256").update(uniqueKey).digest();
	const nameHmac = createHmac("sha256", key).update(name).digest().subarray(0, 16);
	const hmac = createHmac("sha256", key).update(nameHmac).digest().subarray(0, 16);
	return Buffer.concat([nameHmac, hmac]).toString("hex");
}

// Manually find the local database
const namespaceId = durableObjectNamespaceIdFromName(
	"miniflare-D1DatabaseObject",
	"75fa1a8b-1a8b-4e1a-a5b4-f27c2d251ace"
);
const [sqliteFile] = globSync(`../api/.wrangler/**/${namespaceId}.sqlite`);

if (!sqliteFile)
	throw new Error(
		"Could find find local database, try running 'wrangler d1 execute MyDatabase --command='SELECT 1' --local'"
	);

export default defineConfig({
	schema: "./src/schema/index.ts",
	out: "./migrations",
	dialect: "sqlite",
	dbCredentials: { url: `file:${sqliteFile}` }
});
