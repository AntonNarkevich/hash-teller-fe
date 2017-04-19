'use strict';

import {combineReducers} from 'redux';
import {user} from '../reducers/user.js';
import {upload} from '../reducers/upload.js';

export default combineReducers({
	user,
	upload
});
