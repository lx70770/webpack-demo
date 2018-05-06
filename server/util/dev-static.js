/**
 *Create by 李翔 on 2018/4/27.
 */
'use strict';
const axios = require('axios');
const webpack = require('webpack');
const path = require('path');
const MemoryFs = require('memory-fs');
const proxy = require('http-proxy-middleware');
const ReactDOMServer = require('react-dom/server');

const serverConfig = require('../../build/webpack.config.server.js');

/*
* 在开发环境下获取dev-server生成的项目模板
* */
const getTemplate = () => {
	return new Promise((resolve, reject) => {
		axios.get('http://localhost:8888/public/index.html')
			.then(res => {
				resolve(res.data);
			}, err => {
				reject(err);
			})
			.catch(reject)
	})
};

const Module = module.constructor;


const mfs = new MemoryFs;  // 使用内存文件读写模块 使得读写速度提高
const serverCompiler = webpack(serverConfig);  //webpack自带编译方法
serverCompiler.outputFileSystem = mfs;
let serverBundle = null;

/*
* webpack编译方法监听打包过程
* 输出错误信息以及警告信息
* */
serverCompiler.watch({}, (err, stats) => {
	if (err) throw err;
	stats = stats.toJson();
	stats.errors.forEach(err => console.error(err));
	stats.warnings.forEach(warn => console.warn(warn));

	const bundlePath = path.join(
		serverConfig.output.path,
		serverConfig.output.filename
	);
	const bundle = mfs.readFileSync(bundlePath, 'utf8');
	const m = new Module();
	m._compile(bundle, 'server-entry.js'); //使用module的_compile方法生成新的模块
	serverBundle = m.exports.default;
});

module.exports = function (app) {

	//使用代理将静态文件代理到对应端口的文件目录下
	app.use('/public', proxy({
		target: 'http://localhost:8888'
	}));

	app.get('*', (req, res) => {
		getTemplate().then(template => {
			const content = ReactDOMServer.renderToString(serverBundle);
			res.send(template.replace('<!--app-->', content));
		})
	})
};
