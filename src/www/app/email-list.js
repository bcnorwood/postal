import React from 'react';
import { Link } from 'react-router-dom';

export default function EmailList({ emails }) {
	return (
		<nav className="nav nav-pills flex-column flex-nowrap">
			{
				// turn each email into a router link
				emails.map(({ id, date, subject, fromList, toList }) => {
					// create date object to display localized date/time
					const localDate = new Date(date);

					return (
						<Link key={ id } to={ `/view/${id}` } className="text-dark mb-3 p-2 border rounded">
							<div className="text-truncate">
								{ subject }
							</div>
							<div className="row mt-2">
								<div className="col col-8">
									<div className="info text-truncate">
										<strong>From:</strong>
										&nbsp;
										{
											// display all From: values (name OR address only), separated by commas
											fromList.map(({ name, address }) => name || address).join(', ')
										}
									</div>
									<div className="info text-truncate">
										<strong>To:</strong>
										&nbsp;
										{
											// display all To: values (name OR address only), separated by commas
											toList.map(({ name, address }) => name || address).join(', ')
										}
									</div>
								</div>
								<div className="col col-4 text-right">
									<div className="info">{ localDate.toLocaleDateString() }</div>
									<div className="info">{ localDate.toLocaleTimeString() }</div>
								</div>
							</div>
						</Link>
					);
				})
			}
		</nav>
	);
};
