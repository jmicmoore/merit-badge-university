var express = require('express');
var app = express();


app.set('view engine', 'ejs');
app.set('views', 'src/server');

app.use(express.static('./dist'));


app.get('*', function(req, res) {
    res.render('index');
});

app.listen(3000, function () {
    console.log('Server listening on port 3000!')
});
