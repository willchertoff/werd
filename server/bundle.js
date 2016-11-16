/* eslint-disable no-console */
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './../webpack.config.babel.js';

export default () => {
  let bundleStart = null;
  const compiler = Webpack(webpackConfig); // eslint-disable-line new-cap
  compiler.plugin('compile', () => {
    console.log('Bundling...');
    bundleStart = Date.now();
  });
  compiler.plugin('done', () => {
    console.log(`Bundled in ${(Date.now() - bundleStart)}ms!`);
  });
  const bundler = new WebpackDevServer(compiler, {
    publicPath: '/build/',
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true,
    },
  });
  bundler.listen(8080, 'localhost', () => {
    console.log('Bundling project, please wait...');
  });
};
