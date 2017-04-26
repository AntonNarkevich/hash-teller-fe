'use strict';

import { cloneDeep, take, forEach } from 'lodash';
import actions from '../actions.js';

export const labels = (state = [], action) => {
	switch (action.type) {
		case actions.LABELS_LOADED: {
			let labels = cloneDeep(action.labels);

			//Select first 3 by default
			forEach(take(labels, 4), l => {
				l.isSelected = true;
			});

			return labels;
		}

		case actions.LABEL_SELECTED_TOGGLED: {
			let labelIndex = state.findIndex(l => l.name === action.name);
			if (labelIndex !== -1) {
				let label = state[labelIndex];

				return [
					...state.slice(0, labelIndex),
					Object.assign({}, label, { isSelected: action.isSelected }),
					...state.slice(labelIndex + 1)
				];
			}

			return state;
		}

		case actions.FILE_UPLOADING_PROGRESS:
		case actions.USER_SIGNED_OUT:
			return {};

		default:
			return state;
	}
};
