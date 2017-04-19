'use strict';

import React from 'react';

export class GitHubLink extends React.Component {
	render() {
		return (
			<a className="nav-link" href={`https://github.com/AntonNarkevich/${this.props.repoName}`} target="_blank">
				<i className="fa fa-github-alt fa-inverse align-text-top" aria-hidden="true" />
				<span>GitHub</span>
			</a>
		);
	}
}
