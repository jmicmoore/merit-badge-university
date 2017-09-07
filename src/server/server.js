var express = require('express');
var app = express();
const router = express.Router();
const appBaseUrl =  '/merit-badge-university';

if(process.env.NODE_ENV !== 'production'){
    console.log('Starting Development Environment...');

    var webpack = require('webpack');
    var webpackConfig = require('../../webpack.local.config');
    var compiler = webpack(webpackConfig);

    const webpackDevMiddleware = require('webpack-dev-middleware');
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: appBaseUrl,
        stats: {
            colors: true
        },
        historyApiFallback: true
    }));

    const webpackHotMiddleware = require('webpack-hot-middleware');
    app.use(webpackHotMiddleware(compiler));
} else {
    console.log('Starting Production Environment...');
}

app.set('view engine', 'ejs');
app.set('views', 'src/server'); // tell Express our templates are in a different folder than the default

router.use(express.static('./dist'));
router.get('*', function(req, res) {
    res.render('index');
});
app.use(appBaseUrl, router);

app.listen(process.env.PORT || 3000, () => {
    if(process.env.NODE_ENV === 'development') {
        require('opener')('http://localhost:3000');
    }
});