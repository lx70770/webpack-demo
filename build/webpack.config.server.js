/**
 *Create by 李翔 on 2018/4/27.
 */
'use strict';

const path = require('path');

module.exports = {
    target: 'node',
    entry: {
        app: path.join(__dirname, '../client/server-entry.js')
    },
    output: {
        filename: 'server-entry.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public/',
        libraryTarget: 'commonjs2' //配置模块加载方案  node端使用commonjs2规范
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
    }
};
