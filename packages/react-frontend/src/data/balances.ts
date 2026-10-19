interface MemberBalance {
	member: string;
	// Positive amounts are owed to you; negative amounts are owed by you.
	amountCents: number;
}

// Sample breakdowns matching the totals displayed in My Groups.
export const memberBalances: Record<string, MemberBalance[]> = {
	"apartment-4b": [
		{ member: "SM", amountCents: 1000 },
		{ member: "ML", amountCents: 850 }
	],
	"weekend-cabin": [
		{ member: "SM", amountCents: -2000 },
		{ member: "LK", amountCents: -1200 }
	],
	"csc-study-group": []
};
