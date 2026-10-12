import { defineRelations } from "drizzle-orm";
import { schema } from "./index.ts";

export const relations = defineRelations(schema, (r) => ({
	user: {
		sessions: r.many.session({
			from: r.user.id,
			to: r.session.userId
		}),
		accounts: r.many.account({
			from: r.user.id,
			to: r.account.userId
		}),
		groups: r.many.group({
			from: r.user.id.through(r.membership.userId),
			to: r.group.id.through(r.membership.groupId)
		}),
		memberships: r.many.membership({
			from: r.user.id,
			to: r.membership.userId
		})
	},
	session: {
		user: r.one.user({
			from: r.session.userId,
			to: r.user.id,
			optional: false
		})
	},
	account: {
		user: r.one.user({
			from: r.account.userId,
			to: r.user.id,
			optional: false
		})
	},
	group: {
		members: r.many.user({
			from: r.group.id.through(r.membership.groupId),
			to: r.user.id.through(r.membership.userId)
		}),
		owner: r.one.user({
			from: r.group.ownerId,
			to: r.user.id,
			optional: false // Cannot delete user if owner of a group
		}),
		trips: r.many.trip({
			from: r.group.id,
			to: r.trip.groupId
		}),
		items: r.many.item({
			from: r.group.id,
			to: r.item.groupId
		})
	},
	membership: {
		user: r.one.user({
			from: r.membership.userId,
			to: r.user.id,
			optional: false
		}),
		group: r.one.group({
			from: r.membership.groupId,
			to: r.group.id,
			optional: false
		})
	},
	invite: {
		group: r.one.group({
			from: r.invite.groupId,
			to: r.group.id,
			optional: false
		}),
		createdBy: r.one.user({
			from: r.invite.createdById,
			to: r.user.id,
			optional: false
		})
	},
	trip: {
		group: r.one.group({
			from: r.trip.groupId,
			to: r.group.id,
			optional: false
		}),
		createdBy: r.one.user({
			from: r.trip.createdById,
			to: r.user.id,
			optional: true
		}),
		items: r.many.item({
			from: r.trip.id,
			to: r.item.tripId
		})
	},
	item: {
		group: r.one.group({
			from: r.item.groupId,
			to: r.group.id,
			optional: false
		}),
		trip: r.one.trip({
			from: r.item.tripId,
			to: r.trip.id,
			optional: true // If not assigned to trip yet
		}),
		createdBy: r.one.user({
			from: r.item.createdById,
			to: r.user.id,
			optional: true
		}),
		wantedBy: r.many.wantedItem({
			from: r.item.id,
			to: r.wantedItem.itemId
		})
	},
	wantedItem: {
		item: r.one.item({
			from: r.wantedItem.itemId,
			to: r.item.id,
			optional: false
		}),
		user: r.one.user({
			from: r.wantedItem.userId,
			to: r.user.id,
			optional: false
		})
	}
}));
