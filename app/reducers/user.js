'use strict';

export const user = (state = {}, action) => {
	switch (action.type) {
	case 'USER_SIGNED_IN':
		return {
			...action.user,
			isSignedIn:true
		};
	case 'USER_SIGNED_OUT':
		return {};
	default:
		return state;
	}
};
