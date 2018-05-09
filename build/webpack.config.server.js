/**
 *Create by 李翔 on 2018/4/27.
 */
'use strict';

const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');


module.exports = webpackMerge(baseConfig, {
	target: 'node',
	entry: {
		app: path.join(__dirname, '../client/server-entry.js')
	},
	output: {
		filename: 'server-entry.js',
		libraryTarget: 'commonjs2' //配置模块加载方案  node端使用commonjs2规范
	}
});
