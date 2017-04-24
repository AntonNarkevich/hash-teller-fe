'use strict';

import {combineReducers} from 'redux';
import {user} from '../reducers/user.js';
import {imageData} from './image-data.js';
import {tagsData} from './tags-data.js';
import {labels} from '../reducers/labels.js';

export default combineReducers({
	user,
	imageData,
	labels,
	tagsData
});
