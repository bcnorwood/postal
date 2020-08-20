import React from 'react';

// click handler for import button
const handleImport = () => {
	// create a file input
	const field = Object.assign(
		document.createElement('input'),
		{
			type: 'file',
			multiple: true,
			oninput: () => {
				// create a form data object and append each file to it
				const data = new FormData;
				Array.prototype.forEach.call(field.files, (file) => data.append('emails', file));

				// open the request
				const request = new XMLHttpRequest;
				request.open('post', 'api/emails');

				// automatically parse as JSON and pass through to parent setEmails function
				request.responseType = 'json';
				request.onload = () => setEmails(request.response);

				// send the request
				request.send(data);
			}
		}
	);

	// trigger file input dialog
	field.click();
};

export default function Banner({ setEmails }) {
	return (
		<header className="d-flex justify-content-between align-items-center mb-1">
			<h1>Postal</h1>
			<button className="btn btn-success" onClick={ handleImport }>Import</button>
		</header>
	);
};
