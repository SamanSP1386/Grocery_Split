// Basic format check only, the API does the real validation once joining is wired up
const inviteCodePattern = /^[0-9a-zA-Z]{1,16}$/;

// Returns the trimmed code, or null if it isn't a valid invite code
export function parseInviteCode(input: string): string | null {
	const code = input.trim();
	return inviteCodePattern.test(code) ? code : null;
}
