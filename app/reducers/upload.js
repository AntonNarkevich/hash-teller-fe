'use strict';

export const upload = (state = {}, action) => {
	switch (action.type) {
	case 'USER_SIGNED_OUT':
		return {};

	case 'FILE_SELECTED':
		return {
			file: action.file,
			previewImageSrc: action.previewImageSrc
		};

	case 'LOADING_PROGRESS':
		return {
			...state,
			percent: action.percent
		};

	case 'TAGS_LOADED':
		return {
			...state,
			tags: action.tags
		};

	default:
		return state;
	}
};
