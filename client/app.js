/**
 *Create by 李翔 on 2018/4/27.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader'; //eslint-disable-line
import App from './App.jsx';

const root = document.getElementById('root');

const render = Component => {
	ReactDOM.hydrate(
		<AppContainer>
			<Component/>
		</AppContainer>,
		root
	)
};

render(App);

if (module.hot) {
	module.hot.accept('./App.jsx', () => {
		const NextApp = require('./App.jsx').default;
		render(NextApp);
	})
}
