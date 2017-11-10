const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  devServer: {
      contentBase: path.resolve(__dirname, 'dist')
  },
  plugins: [
      new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
      new CopyWebpackPlugin([
          {from: 'node_modules/bootstrap/dist/js/*', to: 'js/[name].[ext]'},
          {from: 'node_modules/bootstrap/dist/css/*', to:'css/[name].[ext]'}
        ]),
      new HtmlWebpackPlugin({
        title: 'November 2017 Scottish Government Tax Proposals',
        template: 'src/index.html',
        inject: false,
        minify: {
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeRedundantAttributes: true
        }
      })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};