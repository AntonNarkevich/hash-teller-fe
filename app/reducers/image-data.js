'use strict';

import actions from '../actions.js';
import { Map } from 'immutable';

export default (state = new Map(), action) => {
	switch (action.type) {
		case actions.FILE_SELECTED:
			return new Map({
				file: action.file,
				previewSrc: action.previewSrc
			});

		case actions.FILE_UPLOADING_PROGRESS:
			return state.set('uploadPercent', action.percent);

		case actions.USER_SIGNED_OUT:
			return new Map();

		default:
			return state;
	}
};
