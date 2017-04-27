'use strict';

import React, { PureComponent } from 'react';

export const HeroUnit = class extends PureComponent {
	render() {
		return (
			<div>
				<h2 className="text-center mb-2">
					Instagram <span className="tag">#</span>tags you were
					missing!
				</h2>
				<p className="mb-4">
					Don't know which tags to use? Let us help you! Upload it below and we'll find the perfect ones in 2
					simple steps.
					It is free.
				</p>
			</div>
		);
	}
};
