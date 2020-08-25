import { all as allEmails } from 'api/data';
jest.mock('api/data.js', () => ({
	all: jest.fn()
}));

const MESSAGE_LIST = {
	foo: {
		date: '__FOO_DATE__',
		from: { value: ['__FOO_FROM__'] },
		to: { value: ['__FOO_TO__'] },
		subject: '__FOO_SUBJECT__'
	},
	bar: {
		date: '__BAR_DATE__',
		from: { value: ['__BAR_FROM__'] },
		to: { value: ['__BAR_TO__'] },
		subject: '__BAR_SUBJECT__'
	},
};
allEmails.mockReturnValue(MESSAGE_LIST);

import { handler } from 'api/routes/emails-get';

it('gets all messages', async () => {
	expect.assertions(2);
	const result = await handler();

	expect(result).toContainEqual({
		id: 'foo',
		date: MESSAGE_LIST.foo.date,
		fromList: MESSAGE_LIST.foo.from.value,
		toList: MESSAGE_LIST.foo.to.value,
		subject: MESSAGE_LIST.foo.subject
	});

	expect(result).toContainEqual({
		id: 'bar',
		date: MESSAGE_LIST.bar.date,
		fromList: MESSAGE_LIST.bar.from.value,
		toList: MESSAGE_LIST.bar.to.value,
		subject: MESSAGE_LIST.bar.subject
	});
});
