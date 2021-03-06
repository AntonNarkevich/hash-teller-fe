'use strict';

import React, { PureComponent } from 'react';
import { GitHubLink } from '../github-link/github-link.jsx';
import { connect } from 'react-redux';
import * as googleAuth from '../../google-oauth.js';
import * as actionCreators from '../../action-creators.js';

let GlobalNavigation = class extends PureComponent {
	render() {
		const { user, signOut } = this.props;

		return (
			<nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse mb-3">
				<a className="navbar-brand" href="#">
					<img
						src="img/logo.png"
						width="30"
						height="30"
						className="d-inline-block align-top"
						alt=""
					/>
					HashTeller
				</a>

				<div className="collapse navbar-collapse">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<GitHubLink repoName="hash-teller-fe" />
						</li>
					</ul>
					{user.get('isSignedIn') &&
						<ul className="navbar-nav">
							<li className="navbar-text navbar-welcome">
								Welcome, {user.get('name')}!
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#" onClick={signOut}>
									(Sign out)
								</a>
							</li>
						</ul>}
				</div>
			</nav>
		);
	}
};

GlobalNavigation = connect(
	state => {
		return { user: state.get('user') };
	},
	dispatch => {
		return {
			signOut: () => {
				googleAuth.signOut();
				dispatch(actionCreators.signOut());
			}
		};
	}
)(GlobalNavigation);

export { GlobalNavigation };
