// node imports
import { format as formatPath } from 'path';
import { promisify } from 'util';

// local imports
import { get as getEmail } from '../data';

export const route = '/emails/:id/dl';
export const method = 'get';

export async function handler({ params: { id } }, response) {
	// promisify Express download helper
	response.download = promisify(response.download);

	// find .msg file
	const path = formatPath({ dir: process.env.POSTAL_DATA_DIR, name: id, ext: '.msg' });

	// send .msg file with original filename
	return response.download(path, getEmail(id).filename);
};
