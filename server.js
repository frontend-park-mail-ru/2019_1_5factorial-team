const PORT = 4000;

const path = require('path');
const express = require('express');
const body = require('body-parser');
const multer = require('multer');

const fs = require('fs');

console.log('Starting server');
const app = express();
const indexPath = path.resolve(__dirname, './static/index.html');
app.use(express.static(__dirname + '/static'));

app.use(body.json());
// сохраняет файлы по пути './static/avatars'
// с имененем file.fieldname + '-' + Date.now() + тип файла
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './static/img');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + '.' + ((file.mimetype === 'image/png') ? 'png' : 'jpeg'));
    }
});

const upload = multer({ storage: storage });

app.post('/profile', (req, res) => {
    console.log('POST Profile');
    console.log(req.headers);

    upload.single('avatar')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            res.status(500).send('Multer error');
            return;
        } else if (err) {
            res.status(500).send('An unknown error occurred when uploading');
            return;
        }

        // console.log(req.file.filename);

        res.status(200).json(req.file.filename);
    });
});

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