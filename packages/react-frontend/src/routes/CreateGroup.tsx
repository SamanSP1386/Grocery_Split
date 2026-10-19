import CreateNameForm from "@/components/CreateNameForm";

function CreateGroup() {
	return (
		<CreateNameForm
			label="Group name"
			placeholder="Apartment 4B"
			description="You can invite roommates right after it's created."
			unavailableMessage="Group creation isn't available yet."
		/>
	);
}

export default CreateGroup;
