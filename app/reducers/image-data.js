'use strict';

import actions from '../actions.js';

export const imageData = (state = {}, action) => {
	switch (action.type) {
		case actions.FILE_SELECTED:
			return {
				file: action.file,
				previewSrc: action.previewSrc
			};

		case actions.FILE_UPLOADING_PROGRESS:
			return Object.assign(state, {
				uploadPercent: action.percent
			});

		case actions.USER_SIGNED_OUT:
			return {};

		default:
			return state;
	}
};
