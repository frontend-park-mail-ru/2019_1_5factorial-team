const http = require('http');
const express = require('express');
const app = express();
const body = require('body-parser');
const multer = require('multer');  // @1.4.1

app.use(body.json());
http.createServer(app).listen(3000);
console.log('Server started at' + ' http://127.0.0.1:3000');

// сохраняет файлы по пути './static/avatars' 
// с имененем file.fieldname + '-' + Date.now() + тип файла
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './static/avatars')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + '.' + ((file.mimetype === 'image/png') ? 'png' : 'jpeg'))
    }
});

const upload = multer({storage: storage});

// пользователи
let users = {
    'pashaPidor': {
        email: 'kek.k.ek',
        password: 'password',
        age: 1,
        score: 100500,
        avatarType: 'jpg',
        avatarLink: `./avatars/default.jpg`
    },
    'lol': {
        email: 'lol.l.ol',
        password: 'password',
        age: 1,
        score: 100500,
        avatarType: 'jpg',
        avatarLink: `./avatars/default.jpg`
    },
};

app.get('/', (req, res) => {
    res.sendFile('./static/index.html', {root: __dirname});
    console.log('GET index');
});

app.get('/login', (req, res) => {
    res.sendFile('./static/login.html', {root: __dirname});
    console.log('GET login');
});

app.get('/about', (req, res) => {
    res.sendFile('./static/about.html', {root: __dirname});
    console.log('GET about');
});

app.get('/leaderboard', (req, res) => {
    res.sendFile('./static/leaderboard.html', {root: __dirname});
    console.log('GET leaderboard');
});

app.get('/profile', (req, res) => {
    res.sendFile('./static/Profile.html', {root: __dirname});

    console.log('GET Profile');
});

// отправка картинки пользователя
app.post('/avatar', (req, res) => {
    console.log('GET Avatar');
    console.log(req.headers);

    // user not found
    if (users[req.body.nickname] === undefined) {
        res.status(400).json({error: "user not found"});
        return;
    }

    res.status(200).json(users[req.body.nickname].avatarLink);
})

// обновляет аватарку пользователя
// имя пользователя передается в Form-Data по ключу 'nickname'
// в будущем перекатиться на куку
app.post('/profile', (req, res) => {
    console.log('POST Profile');
    console.log(req.headers);

    upload.single('avatar')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            res.send("Multer error");
        } else if (err) {
            res.send("An unknown error occurred when uploading");
        }

        // user not found
        if (users[req.body.nickname] === undefined) {
            console.log('\t{400} Error: user not found')
            res.status(400).json({error: "user not found"});
            return;
        }

        // console.log('req.files', req.file);
        // console.log('req.body.nickname', req.body.nickname);

        users[req.body.nickname].avatarType = (req.file.mimetype === 'image/png') ? 'png' : 'jpeg';
        users[req.body.nickname].avatarLink = `./avatars/${req.file.filename}`;

        res.status(200).json(users[req.body.nickname].avatarLink);
    })
})

app.get('/registration', (req, res) => {
    res.sendFile('./static/registration.html', {root: __dirname});
    console.log('GET registration');
});

app.use(express.static(__dirname + '/static'));