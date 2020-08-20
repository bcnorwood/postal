// local imports
import { all as allEmails } from '../data';

export const route = '/emails';
export const method = 'get';

export async function handler() {
	// convert emails object into array of [key, val]
	const emails = Object.entries(allEmails());

	// pick/rename desired props for display
	return emails.map(
		([id, { date, from: { value: fromList }, to: { value: toList }, subject }]) => ({ id, date, fromList, toList, subject })
	);
};
