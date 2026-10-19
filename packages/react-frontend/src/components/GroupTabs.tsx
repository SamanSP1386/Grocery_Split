import { generatePath, NavLink, Outlet, useParams } from "react-router";
import { ListChecks, ShoppingCart, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
	{ label: "Trips", path: "/groups/:groupId/trips", icon: ShoppingCart },
	{ label: "List", path: "/groups/:groupId/list", icon: ListChecks },
	{ label: "Balances", path: "/groups/:groupId/balances", icon: Wallet }
];

function GroupTabs() {
	const params = useParams();

	return (
		<>
			{/* Bottom padding keeps page content clear of the fixed tab bar */}
			<div className="flex flex-1 flex-col pb-16">
				<Outlet />
			</div>

			<nav
				aria-label="Group sections"
				className="fixed inset-x-0 bottom-0 mx-auto grid w-full max-w-md grid-cols-3 border-t bg-background">
				{tabs.map(({ label, path, icon: Icon }) => (
					<NavLink
						key={label}
						to={generatePath(path, params)}
						className={({ isActive }) =>
							cn(
								"flex flex-col items-center gap-1 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
							)
						}>
						<Icon aria-hidden="true" className="size-5" />
						{label}
					</NavLink>
				))}
			</nav>
		</>
	);
}

export default GroupTabs;
