import express from 'express';
import { config } from './configs';
import webpack, { Compiler } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import clientConfig from '../../webpack.client.dev';
import serverConfig from '../../webpack.server.renderer';
import compression from 'compression';

const app = express();
app.use(compression());
app.use('/', express.static(config.staticPath));

if (config.isDev) {
  serverConfig.mode = 'development';
  const compiler = webpack([clientConfig, serverConfig]);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: clientConfig?.output?.publicPath || config.staticPath,
      serverSideRender: true,
      noInfo: true,
    })
  );

  app.use(
    webpackHotMiddleware(
      compiler.compilers.find((c: Compiler) => c.name === 'client')
    )
  );

  app.use(
    '*',
    webpackHotServerMiddleware(compiler, {
      serverRendererOptions: {
        clientCompiler: compiler.compilers[0],
      },
    })
  );

  let started = false;
  console.log('Compiling and starting server ...');
  compiler.hooks.done.tap('LimitChunkCountPlugin', () => {
    if (!started) {
      started = true;
      startServer();
    }
  });
} else {
  serverConfig.mode = 'production';
  const serverRenderer = require('./renderer').default;
  // tslint:enable:no-var-requires
  console.log(serverRenderer());
  app.use(serverRenderer());
  startServer();
}

function startServer() {
  app.listen(config.serverPort, () => {
    console.log(`running at http://localhost:${config.serverPort}`);
    console.log(`environemt: ${config.env}`);
  });
}
