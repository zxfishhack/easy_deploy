const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MockWebpackPlugin = require('mock-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const copyWebpackPlugin = new CopyWebpackPlugin([ { from: 'assets', to: 'assets' } ]);
const mockWebpackPlugin = new MockWebpackPlugin({config: require('./mock/config.js'), port: 3000});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [htmlWebpackPlugin, copyWebpackPlugin, mockWebpackPlugin],
  devServer: {
    proxy: {
      '/vm': 'http://localhost:3000',
    }
  }
};