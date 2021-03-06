import path from 'path';
import nodeExternals from 'webpack-node-externals';
import { Configuration, optimize } from 'webpack';

const serverConfig: Configuration = {
  context: __dirname,
  name: 'server',
  mode: 'production',
  externals: [nodeExternals()],
  entry: ['./src/server/index.ts'],
  target: 'node',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: path.join(__dirname, '/build/server'),
    filename: 'index.js',
    publicPath: '/static/',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: __dirname + '/src/renderer.tsx',
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
