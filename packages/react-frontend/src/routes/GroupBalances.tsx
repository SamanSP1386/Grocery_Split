import { Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";

// The API doesn't have balances yet, and items don't record who paid for them
function GroupBalances() {
	return (
		<section aria-label="Group balances" className="flex flex-col gap-4">
			<Card className="items-center gap-3 rounded-2xl px-6 py-12 text-center shadow-sm">
				<Wallet aria-hidden="true" className="size-8 text-primary" />
				<h2 className="font-heading text-lg font-semibold">Balances aren't available yet</h2>
				<p className="text-sm text-muted-foreground">
					Who owes whom will show up here once the app tracks who paid for each item.
				</p>
			</Card>
		</section>
	);
}

export default GroupBalances;
