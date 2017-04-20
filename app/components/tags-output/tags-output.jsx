'use strict';

import React from 'react';
import './tags-output.less';

export const TagsOutput = ({
	tags
}) => {
	return (
		<div>
			<h4 className="mb-2">Here we go:</h4>
			<code className="d-block">{(tags || []).map((t, index) => <span key={index}>#{t} </span>)}</code>
		</div>
	);
};
