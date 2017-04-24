'use strict';

import actions from './actions.js';

export const signOut = () => {
	return {type: actions.USER_SIGNED_OUT};
};

export const fileSelected = (previewSrc, file) => {
	return {
		type: actions.FILE_SELECTED,
		previewSrc,
		file
	};
};

export const tagsLoaded = tags => {
	return {
		type: actions.TAGS_LOADING_FINISHED,
		tags
	};
};

export const loadingProgress = percent => {
	return {
		type: actions.FILE_UPLOADING_PROGRESS,
		percent
	};
};

export const labelSelectionToggled = (name, isSelected) => {
	return {
		type: actions.LABEL_SELECTED_TOGGLED,
		isSelected,
		name
	};
};

export const labelsLoaded = (rekognitionData) => {
	let labels = rekognitionData.Labels.map(l => ({name: l.Name}));

	return {
		type: actions.LABELS_LOADED,
		labels
	};
};

export const tagsLoadingStarted = () =>{
	return {
		type: actions.TAGS_LOADING_STARTED
	};
};
