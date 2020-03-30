import path from 'path';
import nodeExternals from 'webpack-node-externals';
import { Configuration, optimize } from 'webpack';
import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const serverConfig: Configuration = {
  context: __dirname,
  name: 'server',
  externals: [nodeExternals()],
  entry: ['./src/server/renderer.tsx'],
  target: 'node',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: path.join(__dirname, '/build/server'),
    filename: 'renderer.js',
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: path.join(
                __dirname,
                './webpack.ts-transformers.js'
              ),
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/,
        use: ['node-style-loader'],
      },
    ],
  },
  plugins: [
    new optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};

export default serverConfig;
