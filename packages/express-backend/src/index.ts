import express from "express";
import groupsRouter from "./routes/groups.js";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

app.get("/health", (req, res) => {
	res.json({ status: "ok" });
});

app.use("/groups", groupsRouter);

app.listen(port, () => {
	console.log(`Express backend listening on port ${port}`);
});
