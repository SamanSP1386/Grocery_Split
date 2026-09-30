import express from "express";
import groupsRouter from "./routes/groups.ts";
import { httpServerHandler } from "cloudflare:node";
import { env } from "cloudflare:workers";

const app = express();
const port = env.PORT ? Number(env.PORT) : 3000;

app.use(express.json());

app.get("/health", (req, res) => {
	res.json({ status: "ok" });
});

app.use("/groups", groupsRouter);

app.listen(port, () => {
	console.log(`Express backend listening on port ${port}`);
});
export default httpServerHandler(port);
