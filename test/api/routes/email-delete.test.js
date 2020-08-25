import { promises as fs } from 'fs';
jest.mock('fs', () => ({
	promises: {
		unlink: jest.fn().mockResolvedValue()
	}
}));

import { del as deleteEmail, save as persistEmails } from 'api/data';
jest.mock('api/data.js', () => ({
	del: jest.fn(),
	save: jest.fn().mockResolvedValue()
}));

import { format as formatPath } from 'path';

import { handler } from 'api/routes/email-delete';

const MESSAGE_ID = '__MESSAGE_ID__';
const MESSAGE_PATH = formatPath({ dir: process.env.POSTAL_DATA_DIR, name: MESSAGE_ID, ext: '.msg' });

it('deletes a message', async () => {
	expect.assertions(5);
	await handler({ params: { id: MESSAGE_ID } });

	expect(fs.unlink).toHaveBeenCalledTimes(1);
	expect(fs.unlink).toHaveBeenCalledWith(MESSAGE_PATH);

	expect(deleteEmail).toHaveBeenCalledTimes(1);
	expect(deleteEmail).toHaveBeenCalledWith(MESSAGE_ID);

	expect(persistEmails).toHaveBeenCalledTimes(1);
});
