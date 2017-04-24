'use strict';

import {cloneDeep, take, forEach} from 'lodash';

export const labels = (state = [], action) => {

	switch (action.type) {
	case 'LABELS_LOADED': {
		let labels = cloneDeep(action.labels);

		//Select first 3 by default
		forEach(take(labels, 4), l => {
			l.isSelected = true;
		});

		return labels;
	}
	case 'LABEL_SELECTED_TOGGLED': {
		let labelIndex = state.findIndex(l => l.name === action.name);
		if (labelIndex !== -1) {
			let label = state[labelIndex];

			return [
				...state.slice(0, labelIndex),
				{
					...label,
					isSelected: action.isSelected
				},
				...state.slice(labelIndex + 1, state.length)
			];
		}

		return state;
	}
	default:
		return state;
	}
};
