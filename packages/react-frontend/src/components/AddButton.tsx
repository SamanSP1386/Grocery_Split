import { Link } from "react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddButtonProps {
	// Page the button links to, e.g. "/groups/new-group"
	to: string;
	// Screen reader label, e.g. "Create a group"
	label: string;
}

// Round "+" button pinned to the bottom right of a page
function AddButton({ to, label }: AddButtonProps) {
	return (
		<div className="mt-auto flex justify-end pt-4">
			<Button
				size="icon"
				aria-label={label}
				nativeButton={false}
				render={<Link to={to} />}
				className="size-14 rounded-full shadow-md">
				<Plus aria-hidden="true" className="size-7" />
			</Button>
		</div>
	);
}

export default AddButton;
