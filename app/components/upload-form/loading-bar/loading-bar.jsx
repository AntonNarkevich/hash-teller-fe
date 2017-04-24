'use strict';

import React from 'react';
import {isNumber} from 'lodash';
import './loading-bar.less';

export class LoadingBar extends React.Component {
	render() {
		return (
			<div className="progress mb-2">
				<div className="progress-bar progress-bar-striped progress-purple progress-bar-animated"
					role="progressbar"
					style={{width: `${this.props.percent || 0}%`}}>

					{isNumber(this.props.percent) && this.props.percent !== 0 && (
						<span>{this.props.label || `${this.props.percent}%`}</span>
					)}
				</div>
			</div>
		);
	}
}
