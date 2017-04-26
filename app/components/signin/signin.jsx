'use strict';

import React from 'react';
import './signin.less';

export class SignIn extends React.Component {
	render() {
		return (
			<div className={`mt-5 ${this.props.className}`}>
				<h4 className="text-center mb-3">Sign in</h4>

				<div
					className="g-signin2"
					data-theme="light"
					data-longtitle="true"
					data-width="auto"
					data-onsuccess="signinCallback"
				/>
			</div>
		);
	}
}
