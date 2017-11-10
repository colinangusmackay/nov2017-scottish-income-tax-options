const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  devServer: {
      contentBase: path.resolve(__dirname, 'dist')
  },
  plugins: [
      new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
      new HtmlWebpackPlugin({
        title: 'November 2017 Scottish Government Tax Proposals',
        template: 'src/index.html',
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