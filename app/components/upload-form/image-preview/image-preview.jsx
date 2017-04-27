'use strict';

import React, { PureComponent } from 'react';

export class ImagePreview extends PureComponent {
	render() {
		return (
			<img
				src={this.props.previewSrc}
				alt="image preview"
				className="img-thumbnail"
			/>
		);
	}
}
