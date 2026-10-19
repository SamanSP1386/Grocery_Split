// Shared sample groups until the frontend is connected to the groups API.
export const groups = [
	{
		id: "apartment-4b",
		initial: "A",
		name: "Apartment 4B",
		members: ["SM", "ML", "PN", "AJ"],
		balanceLabel: "You're owed",
		balanceAmount: "$18.50",
		balanceStyle: "bg-emerald-100 text-emerald-800"
	},
	{
		id: "weekend-cabin",
		initial: "W",
		name: "Weekend Cabin Trip",
		members: ["SM", "LK", "PN", "AJ"],
		balanceLabel: "You owe",
		balanceAmount: "$32.00",
		balanceStyle: "bg-orange-100 text-orange-800"
	},
	{
		id: "csc-study-group",
		initial: "C",
		name: "CSC Study Group",
		members: ["SM", "LK", "UT"],
		balanceLabel: "Settled up",
		balanceAmount: null,
		balanceStyle: "bg-muted text-muted-foreground"
	}
];
