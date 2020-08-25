import { promises as fs } from 'fs';
jest.mock('fs', () => ({
	promises: {
		readFile: jest.fn()
	}
}));

const MESSAGE_BUFFER = '__MESSAGE_BUFFER__';
fs.readFile.mockResolvedValue(MESSAGE_BUFFER);

import { simpleParser as parseMail } from 'mailparser';
jest.mock('mailparser', () => ({
	simpleParser: jest.fn()
}));

const MESSAGE_PARSED = {
	date: '__DATE__',
	from: { text: '__FROM__' },
	to: { text: '__TO__' },
	subject: '__SUBJECT__',
	html: '__HTML__'
};
parseMail.mockResolvedValue(MESSAGE_PARSED);

import { format as formatPath } from 'path';

import { handler } from 'api/routes/email-get';

const MESSAGE_DIR = process.env.POSTAL_DATA_DIR = '/tmp/postal';
const MESSAGE_ID = '__MESSAGE_ID__';
const MESSAGE_PATH = formatPath({ dir: MESSAGE_DIR, name: MESSAGE_ID, ext: '.msg' });

it('gets a message', async () => {
	expect.assertions(5);
	const result = await handler({ params: { id: MESSAGE_ID } });

	expect(result).toStrictEqual({
		date: MESSAGE_PARSED.date,
		from: MESSAGE_PARSED.from.text,
		to: MESSAGE_PARSED.to.text,
		subject: MESSAGE_PARSED.subject,
		html: MESSAGE_PARSED.html
	});

	expect(fs.readFile).toHaveBeenCalledTimes(1);
	expect(fs.readFile).toHaveBeenCalledWith(MESSAGE_PATH);

	expect(parseMail).toHaveBeenCalledTimes(1);
	expect(parseMail).toHaveBeenCalledWith(MESSAGE_BUFFER);
});
