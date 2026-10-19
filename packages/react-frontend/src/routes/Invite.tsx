import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { parseInviteCode } from "@/lib/invite";

function Invite() {
	const code = parseInviteCode(useParams().code ?? "");

	if (!code) {
		return (
			<p className="text-sm text-muted-foreground">
				This invite link isn't valid. Check the code and try again.
			</p>
		);
	}

	return (
		<Card className="items-center gap-4 rounded-2xl p-5 text-center shadow-sm">
			<p className="text-sm text-muted-foreground">
				You've been invited to join a group with the code
			</p>
			<p className="font-mono text-lg font-semibold tracking-wider break-all">{code}</p>
			{/* TODO: call the join endpoint once the invite API exists */}
			<Button size="lg" className="w-full rounded-full" disabled>
				Join group
			</Button>
			<p className="text-xs text-muted-foreground">Joining isn't available yet.</p>
		</Card>
	);
}

export default Invite;
