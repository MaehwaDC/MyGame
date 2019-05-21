const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  mode: "development",
  devtool: 'source-map',
  entry: [
    './src/index.ts',
    './src/styles/index.scss'
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build')
  },
  devServer: {
    contentBase: './build',
    stats: 'errors-only'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/styles'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }, 
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
          ]
        })
      }
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new ExtractTextPlugin('style.css'),
    new CleanWebpackPlugin(),
  ]
}