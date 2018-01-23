const path = require('path');
const HtmlWebpackPlugin = require('Html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: ['babel-polyfill', 'react-hot-loader/patch', './src/index.js'],
  // output: {
  //   filename: '[name].bundle.js',
  //   path: path.resolve(__dirname, './dist')
  // },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    // new HtmlWebpackPlugin({
    //   title: 'output Management'
    // }),
    // 提取公共依赖模块，防止多个bundle文件对资源重复引用
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: common
    // }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'inline-source-map',
  // webpack-dev-server 的配置 https://doc.webpack-china.org/configuration/dev-server
  devServer: {
    // contentBase: path.join(__dirname, './dist'),
    contentBase: './dist',
    compress: true,
    hotOnly: true,
    port: 9001,
    inline: true,
    // 使 webpack-dev-server 支持browserHistory
    historyApiFallback: {
      index: '/'
    }
  }
};

module.exports = config