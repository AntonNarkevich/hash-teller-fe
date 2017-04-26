'use strict';

import actions from '../actions.js';

export const tagsData = (state = {}, action) => {
	switch (action.type) {
		case actions.TAGS_LOADING_STARTED:
			return {
				tags: [],
				tagsLoadingProgress: true
			};

		case actions.TAGS_LOADING_FINISHED:
			return {
				tags: action.tags,
				tagsLoadingProgress: false
			};

		case actions.FILE_UPLOADING_PROGRESS:
		case actions.USER_SIGNED_OUT:
			return {};

		default:
			return state;
	}
};
