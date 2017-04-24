'use strict';

import actions from '../actions.js';

export const user = (state = {}, action) => {
	switch (action.type) {

	case actions.USER_SIGNED_IN:
		return Object.assign({}, action.user, {isSignedIn: true});

	case actions.USER_SIGNED_OUT:
		return {};

	default:
		return state;
	}
};
