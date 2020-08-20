// module imports
import React, { useEffect, useState } from 'react';
import { HashRouter, Route } from 'react-router-dom';

// local imports
import Banner from './banner';
import EmailList from './email-list';
import EmailView from './email-view';

export default function App() {
	const [emails, setEmails] = useState([]);

	// get emails array on pageload
	useEffect(() => {
		fetch('api/emails')
			.then((response) => response.json())
			.then(setEmails)
			.catch(console.error);
	}, []);

	// callback for EmailView delete button
	const deleteEmail = (deleteId) => {
		if (!confirm('Are you sure you want to delete this email?')) {
			return;
		}

		fetch(`api/emails/${deleteId}`, { method: 'delete' })
			.then(() => {
				// delete from emails array
				setEmails(emails.filter(({ id }) => id !== deleteId));

				// return to email list
				location.hash = '/';
			})
			.catch(console.error);
	};

	return (
		<HashRouter>
			<Banner setEmails={ setEmails } />
			<EmailList emails={ emails } />
			<Route exact path="/view/:id" render={ (routeProps) => <EmailView { ...routeProps } deleteEmail={ deleteEmail } /> } />
		</HashRouter>
	);
};
