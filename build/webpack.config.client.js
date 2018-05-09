/**
 *Create by 李翔 on 2018/4/27.
 */

const path = require('path');
const webpack = require("webpack");
const webpackMerge = require('webpack-merge');
const HTMLPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base');

//是否开启开发环境
const isDev = process.env.NODE_ENV === 'development';

const config = webpackMerge(baseConfig, {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: '[name].[hash].js'
    },
    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, '../client/template.html')
        })
    ]
});


//在开发环境下dev-server的配置
if (isDev) {
    config.entry = {
      app: [
          'react-hot-loader/patch',
          path.join(__dirname, '../client/app.js')
      ]
    };
    config.devServer = {
        host: '0.0.0.0', //指定服务启动的IP地址  局域网可访问
        port: '8888',//服务启动端口号
        contentBase: path.join(__dirname, '../dist'), //指定服务启动目录  一般在dist目录
        hot: true, //是否开启模块热更新
        overlay: {//当有错误时提醒在页面中  警告不会提醒
            errors: true
        },
        publicPath: '/public/', //配置的公共路径名称
        historyApiFallback: {
            index: '/public/index.html'  //当页面遇到404重定向
        }
    };
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config;
