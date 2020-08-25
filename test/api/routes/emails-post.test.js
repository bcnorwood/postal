import { promises as fs } from 'fs';
jest.mock('fs', () => ({
	promises: {
		copyFile: jest.fn().mockResolvedValue(),
		readFile: jest.fn().mockResolvedValue()
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
	from: '__FROM__',
	to: '__TO__',
	subject: '__SUBJECT__'
};
parseMail.mockResolvedValue(MESSAGE_PARSED);

import { set as saveEmail, save as persistEmails } from 'api/data';
jest.mock('api/data.js', () => ({
	set: jest.fn(),
	save: jest.fn().mockResolvedValue()
}));

import { handler as getEmails } from 'api/routes/emails-get';
jest.mock('api/routes/emails-get.js', () => ({
	handler: jest.fn()
}));

const RETURN_VALUE = '__RETURN_VALUE__';
getEmails.mockReturnValue(RETURN_VALUE);

import { format as formatPath } from 'path';

import { handler } from 'api/routes/emails-post';

const MESSAGE_DIR = process.env.POSTAL_DATA_DIR = '/tmp/postal';
const MESSAGE_ID = '__MESSAGE_ID__';
const MESSAGE_PATH = formatPath({ dir: MESSAGE_DIR, name: MESSAGE_ID, ext: '.msg' });

const UPLOAD_INFO = {
	uuid: MESSAGE_ID,
	file: '__FILE__',
	filename: '__FILENAME__'
};

it('uploads a message', async () => {
	expect.assertions(10);
	const result = await handler({ files: { emails: UPLOAD_INFO } });

	expect(result).toBe(RETURN_VALUE);

	expect(fs.copyFile).toHaveBeenCalledTimes(1);
	expect(fs.copyFile).toHaveBeenCalledWith(UPLOAD_INFO.file, MESSAGE_PATH);

	expect(fs.readFile).toHaveBeenCalledTimes(1);
	expect(fs.readFile).toHaveBeenCalledWith(MESSAGE_PATH);

	expect(parseMail).toHaveBeenCalledTimes(1);
	expect(parseMail).toHaveBeenCalledWith(MESSAGE_BUFFER);

	expect(saveEmail).toHaveBeenCalledTimes(1);
	expect(saveEmail).toHaveBeenCalledWith(MESSAGE_ID, {
		filename: UPLOAD_INFO.filename,
		date: MESSAGE_PARSED.date,
		from: MESSAGE_PARSED.from,
		to: MESSAGE_PARSED.to,
		subject: MESSAGE_PARSED.subject
	});

	expect(persistEmails).toHaveBeenCalledTimes(1);
});


// // node imports
// import { promises as fs } from 'fs';
// import { format as formatPath } from 'path';
// import { isArray } from 'util';

// // module imports
// import { simpleParser as parseMail } from 'mailparser';

// // local imports
// import { set as saveEmail, save as persistEmails } from '../data';
// import { handler as getEmails } from './emails-get';

// export const route = '/emails';
// export const method = 'post';

// export async function handler({ files: { emails }}) {
// 	// make emails an array, if it isn't
// 	if (!isArray(emails)) {
// 		emails = [emails];
// 	}

// 	// wait until all emails are saved
// 	await Promise.all(
// 		emails.map(async ({ uuid: id, file: tmpPath, filename }) => {
// 			// construct path to .msg file
// 			const path = formatPath({ dir: process.env.POSTAL_DATA_DIR, name: id, ext: '.msg' });

// 			// copy .msg file to new path
// 			await fs.copyFile(tmpPath, path);

// 			// read .msg file
// 			const buf = await fs.readFile(path);
// 			const email = await parseMail(buf);

// 			// pick/rename desired props and save to data store
// 			saveEmail(id, { filename, date: email.date, from: email.from, to: email.to, subject: email.subject });
// 		})
// 	);

// 	// write data store
// 	await persistEmails();

// 	// return updated email list by deferring to handler for GET /emails
// 	return getEmails();
// };
