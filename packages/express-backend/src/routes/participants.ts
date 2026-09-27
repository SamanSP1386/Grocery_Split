import { Router } from "express";
import { participants } from "../store.js";

// mergeParams lets this router read :groupId from the parent /groups router
// it's mounted under, per https://expressjs.com/en/guide/routing.html#express-router
const router = Router({ mergeParams: true });

interface GroupParams {
	groupId: string;
}

router
	.route("/")
	.get((req, res) => {
		const { groupId } = req.params as GroupParams;
		res.json(participants.filter((p) => p.groupId === groupId));
	})
	.post((req, res) => {
		const { groupId } = req.params as GroupParams;
		const { name } = req.body as { name?: string };
		if (!name) {
			res.status(400).json({ error: "name is required" });
			return;
		}
		const participant = { id: crypto.randomUUID(), groupId, name };
		participants.push(participant);
		res.status(201).json(participant);
	});

router.delete("/:participantId", (req, res) => {
	const { groupId, participantId } = req.params as GroupParams & {
		participantId: string;
	};
	const index = participants.findIndex((p) => p.groupId === groupId && p.id === participantId);
	if (index === -1) {
		res.status(404).json({ error: "participant not found" });
		return;
	}
	participants.splice(index, 1);
	res.status(204).send();
});

export default router;
