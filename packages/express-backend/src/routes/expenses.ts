import { Router } from "express";
import { expenseSplits, items, participants } from "../store.ts";

// mergeParams lets this router read :groupId from the parent /groups router
const router = Router({ mergeParams: true });

interface GroupParams {
	groupId: string;
}

router
	.route("/")
	.get((req, res) => {
		const { groupId } = req.params as GroupParams;
		res.json(expenseSplits.filter((split) => split.groupId === groupId));
	})
	.post((req, res) => {
		const { groupId } = req.params as GroupParams;
		const { itemId, paidBy, splitAmong } = req.body as {
			itemId?: string;
			paidBy?: string;
			splitAmong?: string[];
		};

		const item = items.find((i) => i.groupId === groupId && i.id === itemId);
		if (!item) {
			res.status(400).json({ error: "itemId must reference an existing item in this group" });
			return;
		}
		if (!paidBy || !participants.some((p) => p.groupId === groupId && p.id === paidBy)) {
			res
				.status(400)
				.json({ error: "paidBy must reference an existing participant in this group" });
			return;
		}
		const among =
			splitAmong && splitAmong.length > 0
				? splitAmong
				: participants.filter((p) => p.groupId === groupId).map((p) => p.id);
		if (among.length === 0) {
			res.status(400).json({ error: "no participants to split the expense among" });
			return;
		}

		const share = item.price / among.length;
		const shares = Object.fromEntries(among.map((id) => [id, share]));

		const split = {
			id: crypto.randomUUID(),
			groupId,
			itemId: item.id,
			paidBy,
			splitAmong: among,
			shares
		};
		expenseSplits.push(split);
		res.status(201).json(split);
	});

export default router;
