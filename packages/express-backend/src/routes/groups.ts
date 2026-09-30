import { Router } from "express";
import { groups } from "../store.ts";
import participantsRouter from "./participants.ts";
import itemsRouter from "./items.ts";
import expensesRouter from "./expenses.ts";

const router = Router();

router
	.route("/")
	.get((req, res) => {
		res.json(groups);
	})
	.post((req, res) => {
		const { name } = req.body as { name?: string };
		if (!name) {
			res.status(400).json({ error: "name is required" });
			return;
		}
		const group = { id: crypto.randomUUID(), name };
		groups.push(group);
		res.status(201).json(group);
	});

router.get("/:groupId", (req, res) => {
	const group = groups.find((g) => g.id === req.params.groupId);
	if (!group) {
		res.status(404).json({ error: "group not found" });
		return;
	}
	res.json(group);
});

router.delete("/:groupId", (req, res) => {
	const index = groups.findIndex((g) => g.id === req.params.groupId);
	if (index === -1) {
		res.status(404).json({ error: "group not found" });
		return;
	}
	groups.splice(index, 1);
	res.status(204).send();
});

// Nested resources, mounted here so their routers can pick up :groupId via
// mergeParams: https://expressjs.com/en/guide/routing.html#express-router
router.use("/:groupId/participants", participantsRouter);
router.use("/:groupId/items", itemsRouter);
router.use("/:groupId/expenses", expensesRouter);

export default router;
