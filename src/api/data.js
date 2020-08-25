// node imports
import { existsSync, readFileSync, promises as fs } from 'fs';
import { join as joinPath } from 'path';

const path = joinPath(process.env.POSTAL_DATA_DIR, 'postal.json');
let data = {};

// initialize from data file (or empty object)
export function init() {
	data = existsSync(path) ? JSON.parse(readFileSync(path)) : {};
};

// list all emails
export function all() {
	return data;
};

// get single email by id
export function get(id) {
	return data[id];
};

// add/update single email by id
export function set(id, val) {
	data[id] = val;
};

// delete single email by id
export function del(id) {
	delete data[id];
};

// write to disk
export function save() {
	return fs.writeFile(path, JSON.stringify(data));
};
