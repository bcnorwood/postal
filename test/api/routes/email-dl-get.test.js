import { promisify } from 'util';
jest.mock('util', () => ({
	promisify: jest.fn((x) => x)
}));

import { get as getEmail } from 'api/data';
jest.mock('api/data.js', () => ({
	get: jest.fn()
}));

const MESSAGE_FILENAME = '__MESSAGE_FILENAME__';
getEmail.mockReturnValue({ filename: MESSAGE_FILENAME });

import { format as formatPath } from 'path';

import { handler } from 'api/routes/email-dl-get';

const RETURN_VALUE = '__RETURN_VALUE__';
const response = {
	download: jest.fn().mockReturnValue(RETURN_VALUE)
};

const MESSAGE_ID = '__MESSAGE_ID__';
const MESSAGE_PATH = formatPath({ dir: process.env.POSTAL_DATA_DIR, name: MESSAGE_ID, ext: '.msg' });

it('sends a message file', async () => {
	expect.assertions(3);
	const result = await handler({ params: { id: MESSAGE_ID } }, response);

	expect(result).toBe(RETURN_VALUE);

	expect(response.download).toHaveBeenCalledTimes(1);
	expect(response.download).toHaveBeenCalledWith(MESSAGE_PATH, MESSAGE_FILENAME);
});
