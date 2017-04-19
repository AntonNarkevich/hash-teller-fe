'use strict';

import * as _ from 'lodash';

export const user = (state = {}, action) => {
	switch (action.type) {
	case 'USER_SIGNED_IN':
		let newState = _.clone(action.user);
		newState.isSignedIn = true;

		return newState;
	case 'USER_SIGNED_OUT':
		return {};
	default:
		return state;
	}
};
