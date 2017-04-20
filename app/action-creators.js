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

export const labelSelectionToggled = (name, isSelected) => {
	return {
		type: 'LABEL_SELECTED_TOGGLED',
		isSelected,
		name
	}
};

export const labelsLoaded = (rekognitionData) => {
	let labels = rekognitionData.Labels.map(l => ({name: l.Name}));

	return {
		type: 'LABELS_LOADED',
		labels
	};
};

export const tagsLoadingStarted = () =>{
	return {
		type: 'TAGS_LOADING_STARTED'
	};
};
