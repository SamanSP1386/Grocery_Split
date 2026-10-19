import { useParams } from "react-router";
import { Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { memberBalances } from "@/data/balances";
import { groups } from "@/data/groups";

function GroupBalances() {
	const { groupId } = useParams();
	const group = groups.find((group) => group.id === groupId);
	if (!group) return null;
	const balances = memberBalances[group.id] ?? [];

	return (
		<section aria-label="Group balances" className="flex flex-col gap-4">
			<Card className="flex-row items-stretch gap-0 rounded-2xl p-0 shadow-sm">
				<div className="flex min-w-0 flex-1 items-center gap-3 p-4 sm:p-5">
					<Wallet aria-hidden="true" className="size-6 shrink-0 text-primary" />
					<div>
						<h2 className="font-heading text-base font-semibold">Your balance</h2>
						<p className="text-sm text-muted-foreground">Across this group</p>
					</div>
				</div>
				<div
					className={`flex w-28 shrink-0 flex-col items-center justify-center px-2 py-4 text-xs font-medium ${group.balanceStyle}`}>
					<span>{group.balanceLabel}</span>
					{group.balanceAmount && (
						<span className="text-lg font-semibold tabular-nums">{group.balanceAmount}</span>
					)}
				</div>
			</Card>
			{balances.length ? (
				<div className="flex flex-col gap-3">
					<h2 className="font-heading text-base font-semibold">Who owes whom</h2>
					<ul className="grid grid-cols-1 gap-3">
						{balances.map(({ member, amountCents }) => (
							<li key={member}>
								<Card className="flex-row items-stretch gap-0 rounded-2xl p-0 shadow-sm">
									<div className="flex min-w-0 flex-1 items-center gap-3 p-4 sm:p-5">
										<Avatar>
											<AvatarFallback>{member}</AvatarFallback>
										</Avatar>
										<p className="text-sm sm:text-base">
											{amountCents > 0 ? (
												<>
													<span className="font-semibold">{member}</span> owes you
												</>
											) : (
												<>
													You owe <span className="font-semibold">{member}</span>
												</>
											)}
										</p>
									</div>
									<span
										className={`flex w-28 shrink-0 items-center justify-center px-2 py-4 text-base font-semibold tabular-nums ${amountCents > 0 ? "bg-emerald-100 text-emerald-800" : "bg-orange-100 text-orange-800"}`}>
										{(Math.abs(amountCents) / 100).toLocaleString("en-US", {
											style: "currency",
											currency: "USD"
										})}
									</span>
								</Card>
							</li>
						))}
					</ul>
				</div>
			) : (
				<p className="text-sm text-muted-foreground">
					You're settled up with everyone in this group.
				</p>
			)}
		</section>
	);
}

export default GroupBalances;
