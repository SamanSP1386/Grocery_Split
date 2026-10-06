import express from "express";
import groupsRouter from "./routes/groups.ts";
import { httpServerHandler } from "cloudflare:node";
import { env } from "cloudflare:workers";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.ts";

const app = express();
const port = env.PORT ? Number(env.PORT) : 3000;

app.use(express.json());

app.use("/groups", groupsRouter);
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.listen(port, () => {
	console.log(`Express backend listening on port ${port}`);
});

export default httpServerHandler(port);
