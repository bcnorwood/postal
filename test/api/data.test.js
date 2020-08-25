import { existsSync, readFileSync, promises as fs } from 'fs';
jest.mock('fs', () => ({
	existsSync: jest.fn().mockReturnValue(true),
	readFileSync: jest.fn(),
	promises: {
		writeFile: jest.fn()
	}
}));

const DATA_OBJ = { foo: '__FOO__' };
const DATA_JSON = JSON.stringify(DATA_OBJ);
readFileSync.mockReturnValue(DATA_JSON);

const RETURN_VALUE = '__RETURN_VALUE__';
fs.writeFile.mockReturnValue(RETURN_VALUE);

import { join as joinPath } from 'path';
const DATA_PATH = joinPath(process.env.POSTAL_DATA_DIR, 'postal.json');

const MESSAGE_ID = '__MESSAGE_ID__';
const MESSAGE_VAL = '__MESSAGE_VAL__';

import { init as initData, all as allEmails, get as getEmail, set as saveEmail, del as deleteEmail, save as persistEmails } from 'api/data';

it('should initialize data store', () => {
	initData();
	expect(readFileSync).toHaveBeenCalledTimes(1);
	expect(readFileSync).toHaveBeenCalledWith(DATA_PATH);
});

it('should get all emails', () => {
	const result = allEmails();
	expect(result).toStrictEqual(DATA_OBJ);
});

it('should get one email', () => {
	const result = getEmail('foo');
	expect(result).toBe(DATA_OBJ.foo);
});

it('should save one email', () => {
	saveEmail(MESSAGE_ID, MESSAGE_VAL);
	expect(getEmail(MESSAGE_ID)).toBe(MESSAGE_VAL);
});

it('should delete one email', () => {
	deleteEmail(MESSAGE_ID);
	expect(getEmail(MESSAGE_ID)).toBeUndefined();
});

it('should persist email data', () => {
	const result = persistEmails();

	expect(fs.writeFile).toHaveBeenCalledTimes(1);
	expect(fs.writeFile).toHaveBeenCalledWith(DATA_PATH, DATA_JSON);
});
