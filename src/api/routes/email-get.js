// node imports
import { promises as fs } from 'fs';
import { format as formatPath } from 'path';

// module imports
import { simpleParser as parseMail } from 'mailparser';

export const route = '/emails/:id';
export const method = 'get';

export async function handler({ params: { id } }) {
	// find .msg file
	const path = formatPath({ dir: '/usr/src/data', name: id, ext: '.msg' });

	// read .msg file
	const buf = await fs.readFile(path);
	const email = await parseMail(buf);

	// pick/rename desired props for display
	return {
		date: email.date,
		from: email.from.text,
		to: email.to.text,
		subject: email.subject,
		html: email.html
	};
};
