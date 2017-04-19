'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {registerLoginCallback} from './google-oauth.js';
import store from './store.js';
import {Application} from './components/application/application.jsx';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../fonts/fontello/css/fontello.css';

registerLoginCallback();

//store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
	<Provider store={store}>
		<Application />
	</Provider>,
	document.getElementById('root')
);
