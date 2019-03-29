const PORT = 4000;

const path = require('path');
const express = require('express');
const body = require('body-parser');
const fs = require('fs');

console.log('Starting server');
const app = express();
const indexPath = path.resolve(__dirname, './static/index.html');
const publicRoot = path.resolve(__dirname, 'static');
app.use(express.static(__dirname + '/static'));

app.use(body.json());

app.get('/sw.js', (req, res) => {
    console.log('sw.js');
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(publicRoot + '/js/sw.js');
});

app.get('*', (req, res) => {
    fs.readFile(indexPath, { encoding: 'utf-8' }, (err, file) => {
        if (err) {
            console.log(err);
            res.statusCode = 404;
            res.end();
        }
        console.log('request: index.html');
        res.write(file);
        res.end();
    });
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening port ${process.env.PORT || PORT}`);
});
