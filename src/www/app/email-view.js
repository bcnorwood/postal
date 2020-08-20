// module imports
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Route } from 'react-router-dom';
import { sanitize } from 'dompurify';

export default function EmailView({ match: { params: { id } }, deleteEmail }) {
	const backdrop = useRef(null);
	const container = useRef(null);

	const [email, setEmail] = useState(null);

	// if an email is available to display, fade in - otherwise, get one
	useEffect(() => {
		if (email) {
			backdrop.current.classList.add('show');
			container.current.classList.add('show');
		} else {
			fetch(`api/emails/${id}`)
				.then((response) => response.json())
				.then(setEmail)
				.catch(console.error);
		}
	});

	// if no email yet, skip the rest
	if (!email) {
		return <Fragment />;
	};

	// create date object to display localized date/time
	const localDate = new Date(email.date);

	return (
		<Fragment>
			<div className="modal-backdrop fade" ref={ backdrop } />
			<div className="modal fade d-block" ref={ container }>
				<div className="modal-lg modal-dialog modal-dialog-scrollable">
					<div className="modal-content">
						<header className="modal-header">
							<h5>{ email.subject }</h5>
							<button className="close" onClick={ () => location.hash = '/' }>&times;</button>
						</header>
						<main className="modal-body" dangerouslySetInnerHTML={ { __html: sanitize(email.html) } } />
						<footer className="modal-footer justify-content-between">
							<div>
								<div>
									<strong>Received:</strong>
									&nbsp;
									{ localDate.toLocaleString() }
								</div>
								<div className="text-truncate">
									<strong>From:</strong>
									&nbsp;
									{ email.from }
								</div>
								<div className="text-truncate">
									<strong>To:</strong>
									&nbsp;
									{ email.to }
								</div>
							</div>
							<div className="d-flex flex-column justify-content-start">
								<button className="btn btn-primary" onClick={ () => location = `api/emails/${id}/dl` }>Export</button>
								<button className="btn btn-danger mt-1" onClick={ () => deleteEmail(id) }>Delete</button>
							</div>
						</footer>
					</div>
				</div>
			</div>
		</Fragment>
	);

};
