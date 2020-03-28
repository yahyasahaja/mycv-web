import path from 'path';
import nodeExternals from 'webpack-node-externals';
import { Configuration, optimize } from 'webpack';

const serverConfig: Configuration = {
  context: __dirname,
  name: 'server',
  mode: 'development',
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
          { loader: 'cache-loader' },
          {
            loader: 'thread-loader',
            options: {
              workers: require('os').cpus().length - 1,
              poolTimeout: Infinity,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
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
