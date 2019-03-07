const path = require('path');
const express = require('express');
const body = require('body-parser');
const debug = require('debug');

const log = debug('*');
const fs = require('fs');

log('Starting server');
const app = express();
const indexPath = path.resolve(__dirname, '../public/index.html');
app.use(express.static(__dirname + '/static'));

app.use(body.json());

app.get('/favicon.ico', (req, res) => {
    res.sendFile('./static/img/test.png');
});

app.get('*', (req, res) => {	
    fs.readFile(indexPath, { encoding: 'utf-8' }, (err, file) => {
        if (err) {
            log(err);
            res.statusCode = 404;
            res.end();
        }
        log('request: index.html');
        res.write(file);
        res.end();
    });
});

app.listen(process.env.PORT || 3000, () => {
    log(`Server listening port ${process.env.PORT || 3000}`);
});