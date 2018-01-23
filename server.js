var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');


var server = new webpackDevServer(webpack(config), {
    // host: '0.0.0.0',
    // hot: true,
    // disableHostCheck: true,
    // publicPath: config.output.publicPath,
    // proxy: {
    //     "/api/*": {
    //         target: 'https://cnodejs.org/',
    //         secure: false
    //     }
    // },
    // stats: {
    //     colors: true
    // }
})

//将其他路由，全部返回index.html
server.app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
});

server.listen(8081);