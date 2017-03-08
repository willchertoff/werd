import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppContainer from './containers/AppContainer';
import HomeContainer from './containers/HomeContainer';

const routes = (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={HomeContainer} />
  </Route>
);

export default routes;
