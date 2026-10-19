import CreateNameForm from "@/components/CreateNameForm";

function CreateTrip() {
	const date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });

	return (
		<CreateNameForm
			label="Trip name"
			placeholder="Trader Joe's"
			description={`Tip: name it after the store — the date is added for you (${date}).`}
			unavailableMessage="Trip creation isn't available yet."
		/>
	);
}

export default CreateTrip;
