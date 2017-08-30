var express = require('express');
var app = express();
var webpack = require('webpack');
var webpackConfig = require('../../webpack.config');
var compiler = webpack(webpackConfig);

app.set('view engine', 'ejs');
app.set('views', 'src/server');

app.use(express.static('./dist'));

const webpackDevMiddleware = require('webpack-dev-middleware');
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: '/',
    stats: {
        colors: true
    },
    historyApiFallback: true
}));

const webpackHotMiddleware = require('webpack-hot-middleware');
app.use(webpackHotMiddleware(compiler));

app.get('*', function(req, res) {
    res.render('index');
});

app.listen(3000, function () {
    console.log('Server listening on port 3000!')
});





