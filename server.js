/* eslint-disable no-console, react/no-danger */

import express from 'express';
import serialize from 'serialize-javascript';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import React, { PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { configureStore } from './app/store';
import routes from './app/routes';
import webpackConfig from './webpack.config.babel.js';

const app = express();

app.use(webpackDevMiddleware(webpack(webpackConfig), {
  publicPath: '/__build__/',
  stats: {
    colors: true,
  },
}));

const pt = {
  content: PropTypes.string,
  store: PropTypes.object,
};
const HTML = ({ content, store }) => (
  <html
    lang="en"
  >
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
      <div id="devtools" />
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }} />
      <script src="/__build__/bundle.js" />
    </body>
  </html>
);

HTML.propTypes = pt;

app.use((req, res) => {
  const memoryHistory = createMemoryHistory(req.url);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      res.send(`<!doctype html>\n ${renderToString(<HTML content={content} store={store} />)}`);
    }
  });
});

app.listen(8080, () => {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop');
});
