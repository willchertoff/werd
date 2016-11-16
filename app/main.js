import 'babel-polyfill';
import 'isomorphic-fetch';

import { Router, Route, browserHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '../public/styles/main.scss';
import AppContainer from './containers/AppContainer';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store} >
    <Router history={browserHistory} >
      <Route path="/" component={AppContainer} />
    </Router>
  </Provider>,
  document.getElementById('main') // eslint-disable-line
);
