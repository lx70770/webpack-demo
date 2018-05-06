/**
 *Create by 李翔 on 2018/4/27.
 */

const path = require('path');
const webpack = require("webpack");
const HTMLPlugin = require('html-webpack-plugin');

//是否开启开发环境
const isDev = process.env.NODE_ENV === 'development';

const config = {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public/'  // 后面的斜线必须加  不然热更新不能使用
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /.(js|jsx)$/,
                loader: 'eslint-loader',
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ]
            },
            {
                test: /.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            }
        ]
    },

    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, '../client/template.html')
        })
    ]
};


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
