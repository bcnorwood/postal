// node imports
import { promises as fs } from 'fs';
import { format as formatPath } from 'path';
import { isArray } from 'util';

// module imports
import { simpleParser as parseMail } from 'mailparser';

// local imports
import { set as saveEmail, save as persistEmails } from '../data';
import { handler as getEmails } from './emails-get';

export const route = '/emails';
export const method = 'post';

export async function handler({ files: { emails }}) {
	// make emails an array, if it isn't
	if (!isArray(emails)) {
		emails = [emails];
	}

	// wait until all emails are saved
	await Promise.all(
		emails.map(async ({ uuid: id, file: tmpPath, filename }) => {
			// construct path to .msg file
			const path = formatPath({ dir: '/usr/src/data', name: id, ext: '.msg' });

			// copy .msg file to new path
			await fs.copyFile(tmpPath, path);

			// read .msg file
			const buf = await fs.readFile(path);
			const email = await parseMail(buf);

			// pick/rename desired props and save to data store
			saveEmail(id, { filename, date: email.date, from: email.from, to: email.to, subject: email.subject });
		})
	);

	// write data store
	await persistEmails();

	// return updated email list by deferring to handler for GET /emails
	return getEmails();
};
