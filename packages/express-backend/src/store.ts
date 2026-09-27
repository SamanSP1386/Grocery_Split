// Temporary in-memory data store. Replace with real @grocery-split/db
// (Drizzle) queries once the schema and DB connection are wired up.

export interface Group {
	id: string;
	name: string;
}

export interface Participant {
	id: string;
	groupId: string;
	name: string;
}

export interface Item {
	id: string;
	groupId: string;
	name: string;
	price: number;
}

export interface ExpenseSplit {
	id: string;
	groupId: string;
	itemId: string;
	paidBy: string;
	splitAmong: string[];
	shares: Record<string, number>;
}

export const groups: Group[] = [];
export const participants: Participant[] = [];
export const items: Item[] = [];
export const expenseSplits: ExpenseSplit[] = [];
