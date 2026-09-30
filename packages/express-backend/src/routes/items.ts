import { Router } from "express";
import { items } from "../store.ts";

// mergeParams lets this router read :groupId from the parent /groups router
const router = Router({ mergeParams: true });

interface GroupParams {
	groupId: string;
}

// Chained handlers via .route(), per
// https://expressjs.com/en/guide/routing.html#app-route
router
	.route("/")
	.get((req, res) => {
		const { groupId } = req.params as GroupParams;
		res.json(items.filter((item) => item.groupId === groupId));
	})
	.post((req, res) => {
		const { groupId } = req.params as GroupParams;
		const { name, price } = req.body as { name?: string; price?: number };
		if (!name || typeof price !== "number") {
			res.status(400).json({ error: "name and numeric price are required" });
			return;
		}
		const item = { id: crypto.randomUUID(), groupId, name, price };
		items.push(item);
		res.status(201).json(item);
	});

router
	.route("/:itemId")
	.get((req, res) => {
		const { groupId, itemId } = req.params as GroupParams & {
			itemId: string;
		};
		const item = items.find((i) => i.groupId === groupId && i.id === itemId);
		if (!item) {
			res.status(404).json({ error: "item not found" });
			return;
		}
		res.json(item);
	})
	.put((req, res) => {
		const { groupId, itemId } = req.params as GroupParams & {
			itemId: string;
		};
		const item = items.find((i) => i.groupId === groupId && i.id === itemId);
		if (!item) {
			res.status(404).json({ error: "item not found" });
			return;
		}
		const { name, price } = req.body as { name?: string; price?: number };
		if (name !== undefined) item.name = name;
		if (price !== undefined) item.price = price;
		res.json(item);
	})
	.delete((req, res) => {
		const { groupId, itemId } = req.params as GroupParams & {
			itemId: string;
		};
		const index = items.findIndex((i) => i.groupId === groupId && i.id === itemId);
		if (index === -1) {
			res.status(404).json({ error: "item not found" });
			return;
		}
		items.splice(index, 1);
		res.status(204).send();
	});

export default router;
