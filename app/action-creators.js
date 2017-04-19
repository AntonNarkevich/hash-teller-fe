'use strict';

export const signOut = () => {
	return {type: 'USER_SIGNED_OUT'};
};

export const fileSelected = (previewImageSrc, file) => {
	return {
		type: 'FILE_SELECTED',
		previewImageSrc,
		file
	};
};

export const tagsLoaded = tags => {
	return {
		type: 'TAGS_LOADED',
		tags
	}
};

export const loadingProgress = percent => {
	return {
		type: 'LOADING_PROGRESS',
		percent
	}
};
