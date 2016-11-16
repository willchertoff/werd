/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import httpProxy from 'http-proxy';
import bundle from './server/bundle';

const proxy = httpProxy.createProxyServer();
const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 5002;
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

if (!isProduction) {
  bundle();

  app.all('/build/*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:8080',
    });
  });
}

proxy.on('error', e => console.log(`Could not connect to proxy, here is the error ${e}`));
app.listen(port, () => console.log(`WERD is running on ${port}`));
