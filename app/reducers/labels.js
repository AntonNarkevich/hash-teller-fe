'use strict';

import actions from '../actions.js';
import Immutable, { List } from 'immutable';

export default (state = new List(), action) => {
	switch (action.type) {
		case actions.LABELS_LOADED: {
			return Immutable.fromJS(action.labels).map((label, index) => {
				if (index < 4) {
					return label.set('isSelected', true);
				}

				return label;
			});
		}

		case actions.LABEL_SELECTED_TOGGLED: {
			let labelIndex = state.findIndex(l => l.get('name') === action.name);
			if (labelIndex !== -1) {
				return state.setIn([labelIndex, 'isSelected'], action.isSelected);
			}

			return state;
		}

		case actions.FILE_UPLOADING_PROGRESS:
		case actions.USER_SIGNED_OUT:
			return new List();

		default:
			return state;
	}
};
