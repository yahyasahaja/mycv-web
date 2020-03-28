import path from 'path';
import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const clientProductionConfig: Configuration = {
  context: __dirname,
  mode: 'production',
  entry: ['./src/client/index.tsx'],
  devtool: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: path.join(__dirname, '/build/client'),
    filename: '[name]-[contenthash]-bundle.js',
    publicPath: '/',
  },
  performance: {
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
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
    new ForkTsCheckerWebpackPlugin({
      eslint: true,
    }),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'TypeScript',
      excludeWarnings: false,
    }),
    new CopyWebpackPlugin([{ from: './public' }]),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/public/template.html'),
      filename: 'template.html',
      inject: true,
      scriptLoading: 'defer',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
};

export default clientProductionConfig;
