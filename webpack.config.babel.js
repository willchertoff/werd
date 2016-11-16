import Webpack from 'webpack';
import path from 'path';

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'public', 'build');
const mainPath = path.resolve(__dirname, 'app', 'main.js');

export default {
  devtool: 'eval',
  entry: ['webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080', mainPath],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [`babel?${JSON.stringify({ presets: ['react', 'es2015', 'stage-0'] })}`],
        exclude: [nodeModulesPath],
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass'],
      },
    ],
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()],
};
