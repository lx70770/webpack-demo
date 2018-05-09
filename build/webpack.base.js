/**
 *Create by 李翔 on 2018/5/6.
 */
const path = require('path');

module.exports = {
	output: {
		path: path.join(__dirname, '../dist'),
		publicPath: '/public/'  // 后面的斜线必须加  不然热更新不能使用
	},
	module: {
		rules: [
			// {
			//     enforce: 'pre',
			//     test: /.(js|jsx)$/,
			//     loader: 'eslint-loader',
			//     exclude: [
			//         path.resolve(__dirname, '../node_modules')
			//     ]
			// },
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
};
