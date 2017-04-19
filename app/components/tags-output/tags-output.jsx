'use strict';

import React from 'react';
import * as _ from 'lodash';
import './tags-output.less';

export const TagsOutput = ({
	tags
}) => {
	return (
		<div>
			<h4>Here we go:</h4>
			<code className="d-block">{_.map(tags, (t, index) => <span key={index}>#{t} </span>)}</code>
		</div>
	);
};
