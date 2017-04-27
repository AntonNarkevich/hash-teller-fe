'use strict';

import actions from '../actions.js';
import Immutable, { Map } from 'immutable';

export default (state = new Map(), action) => {
	switch (action.type) {
		case actions.TAGS_LOADING_STARTED:
			return new Map({
				tags: [],
				tagsLoadingProgress: true
			});

		case actions.TAGS_LOADING_FINISHED:
			return state.merge({
				tags: Immutable.fromJS(action.tags),
				tagsLoadingProgress: false
			});

		case actions.FILE_UPLOADING_PROGRESS:
		case actions.USER_SIGNED_OUT:
			return new Map();

		default:
			return state;
	}
};
