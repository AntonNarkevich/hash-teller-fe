'use strict';

import React from 'react';

export class ImagePreview extends React.Component {
	render() {
		return (
			<img src={this.props.previewImageSrc} alt="image preview" className="img-thumbnail"/>
		);
	}
}
