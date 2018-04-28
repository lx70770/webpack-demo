const express = require('express');
const ReactSSR = require('react-dom/server');
const path = require('path');
const fs = require('fs');

const isDev = process.env.NODE_ENV === 'development';

const app = express();

//在生产环境下的服务端渲染设置
if (!isDev) {
    const serverEntry = require('../dist/server-entry').default;
        const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
        app.use('/public', express.static(path.join(__dirname, '../dist'))); //使用静态文件方法
        app.get('*', (req, res) => {
            const appString = ReactSSR.renderToString(serverEntry);
            res.send(template.replace('<!-- app -->', appString));
    });
}
//在开发环境下的配置
else {
    const devStatic = require('./util/dev-static');
    devStatic(app);
}

const port = 3333;

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});