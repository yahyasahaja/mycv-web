import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { HotModuleReplacementPlugin, Configuration } from 'webpack';
import path from 'path';

const clientDevelopmentConfig: Configuration = {
  context: __dirname, // to automatically find tsconfig.json
  name: 'client',
  mode: 'development',
  entry: ['webpack-hot-middleware/client', './src/client/index.tsx'],
  devtool: 'inline-source-map',
  watch: true,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
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
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|ico|txt|gif|png|svg|woff|ttf|wav|mp3)$/,
        loader: 'file-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/public/template.html'),
      filename: 'template.html',
      inject: true,
      scriptLoading: 'defer',
    }),
  ],
};

export default clientDevelopmentConfig;
