const PORT = 4000;

const https = require('https');
const path = require('path');
const express = require('express');
const body = require('body-parser');
const fs = require('fs');
const morgan = require('morgan');

const options = {
    key: fs.readFileSync("/srv/www/keys/my-site-key.pem"),
    cert: fs.readFileSync("/srv/www/keys/chain.pem")
};

const app = express();
app.use(morgan('dev'));

const indexPath = path.resolve(__dirname, './static/index.html');
const root = path.resolve(__dirname, 'static');
app.use(express.static(__dirname + '/static'));

app.use(body.json());

app.get('/sw.js', (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(root + '/dist/sw.js');
});

app.get('/favicon.ico', (req, res) => {
    res.sendFile(root + '/img/favicon.png');
});

app.get('*', (req, res) => {
    fs.readFile(indexPath, { encoding: 'utf-8' }, (err, file) => {
        if (err) {
            console.log(err);
            res.statusCode = 404;
            res.end();
        }
        res.write(file);
        res.end();
    });
});

https.createServer(options, app).listen(process.env.PORT || PORT, () => {
    console.log(`Server listening port ${process.env.PORT || PORT}`);
});