export { cn } from "cn";

// "Maya Lee" -> "ML"
export function initials(name: string) {
	return name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((word) => word[0])
		.join("")
		.toUpperCase();
}

export function formatPrice(amount: number) {
	return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
