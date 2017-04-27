'use strict';

import React, { PureComponent } from 'react';

export class GlobalFooter extends PureComponent {
	render() {
		return (
			<div className="row">
				<div className="col-md-8 offset-md-2">
					<nav className="navbar navbar-toggleable-md bg-faded fixed-bottom justify-content-center">
						<small className="nav-text">
							© 2017,
							{' '}
							<a href={`mailto:${this.props.contactEmail}`} target="_top">
								{this.props.contactName}
							</a>
						</small>
					</nav>
				</div>
			</div>
		);
	}
}
