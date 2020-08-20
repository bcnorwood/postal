// node imports
import { promises as fs } from 'fs';
import { format as formatPath } from 'path';

// local imports
import { del as deleteEmail, save as persistEmails } from '../data';

export const route = '/emails/:id';
export const method = 'delete';

export async function handler({ params: { id } }) {
	// find .msg file in data dir
	const path = formatPath({ dir: '/usr/src/data', name: id, ext: '.msg' });

	// delete .msg file
	await fs.unlink(path);

	// delete from data store
	deleteEmail(id);

	// write data store
	await persistEmails();
};
