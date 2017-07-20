const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const svgGenerator = require('./svg-generator');

app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.all('*', (req, res, next) => {
    console.info(req.method, req.url);
    next();
});

app.post('/svg', function (req, res) {
    svgGenerator(req.body.data, req.body.config).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
        res.send();
    });

})

const server = app.listen(app.get('port'), function () {
    const port = server.address().port;
    console.info('Server running on localhost:' + port);
});