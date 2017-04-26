'use strict';

import store from './store.js';
import actions from './actions.js';

export const registerLoginCallback = () => {
	window.signinCallback = function(authResult) {
		if (authResult.Zi && authResult.Zi.id_token) {
			AWS.config.region = 'eu-west-1';
			// Add the Google access token to the Cognito credentials login map.
			AWS.config.credentials = new AWS.CognitoIdentityCredentials({
				IdentityPoolId: 'eu-west-1:3c8041e1-eb00-49d8-90b9-4f667b3e9757',
				Logins: {
					'accounts.google.com': authResult.Zi.id_token
				}
			});

			// Obtain AWS credentials
			AWS.config.credentials.get(() => {
				store.dispatch({
					type: actions.USER_SIGNED_IN,
					user: {
						name: authResult.w3.ig,
						email: authResult.w3.U3
					}
				});
			});
		}
	};
};

export const signOut = () => {
	let auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut();
};
