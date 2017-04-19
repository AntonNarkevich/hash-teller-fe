'use strict';

import React from 'react';
import './tags-output.less';

export const TagsOutput = ({
	tags
}) => {
	return (
		<div>
			<h4>Here we go:</h4>
			<code className="d-block">{(tags || []).map(tags, (t, index) => <span key={index}>#{t} </span>)}</code>
		</div>
	);
};