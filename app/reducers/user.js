'use strict';

import actions from '../actions.js';
import { Map } from 'immutable';

export default (state = new Map(), action) => {
	switch (action.type) {
		case actions.USER_SIGNED_IN:
			return state.merge(action.user, { isSignedIn: true });

		case actions.USER_SIGNED_OUT:
			return new Map();

		default:
			return state;
	}
};
