const PORT = 3000;

const path = require('path');
const express = require('express');
const body = require('body-parser');
// const multer = require('multer');

const fs = require('fs');

console.log('Starting server');
const app = express();
const indexPath = path.resolve(__dirname, './static/index.html');
app.use(express.static(__dirname + '/static'));

app.use(body.json());

// const storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, './static/avatars');
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname + '-' + Date.now() + '.' + ((file.mimetype === 'image/png') ? 'png' : 'jpeg'));
//     }
// });

// const upload = multer({ storage: storage });

app.get('/favicon.ico', (req, res) => {
    res.sendFile('./static/img/test.png');
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