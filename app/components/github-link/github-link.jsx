'use strict';

import React from 'react';
import { PureComponent } from 'react';

export class GitHubLink extends PureComponent {
	render() {
		return (
			<a
				className="nav-link"
				href={`https://github.com/AntonNarkevich/${this.props.repoName}`}
				target="_blank"
			>
				<i className="icon-github" />
				<span>GitHub</span>
			</a>
		);
	}
}
