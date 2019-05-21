const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const conf = {
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
    contentBase: './build'
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
    new ExtractTextPlugin('style.css')
  ]
}

module.exports = (env, options) => {
  let production = options.mode === 'production';

  conf.devtool = production ? false : 'source-map';

  return conf;
};