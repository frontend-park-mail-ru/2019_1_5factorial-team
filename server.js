const http = require('http'),
      express = require('express'),
      app = express(),
      body = require('body-parser'),
      multer = require('multer');  // @1.4.1

app.use(body.json());
http.createServer(app).listen(3000);
console.log('Server started at' + ' http://127.0.0.1:3000');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './static/avatars')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + '.' + ((file.mimetype === 'image/png') ? 'png' : 'jpeg'))
    }
});

// var upload = multer({dest: './static/avatars'});
var upload = multer({storage: storage});

let users = {
    'kek': {
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

app.post('/avatar', (req, res) => {
    console.log('GET Avatar');
    console.log(req.headers);
    let nick = req.body.nickname;
    console.log(users);
    console.log(req.body);
    console.log(users[req.body.nickname].avatarLink);

    res.status(200).json(users[req.body.nickname].avatarLink);
})

// имя пользователя передается в Form-Data по ключу 'nickname'
// в будущем перекатиться на куку
app.post('/profile', (req, res) => {
    console.log('POST Profile');
    console.log(req.headers);

    console.log('---------');
    upload.single('avatar')(req, res, (err) => {
        console.log(req.file);

        if (err instanceof multer.MulterError) {
            res.send("Multer error");
        } else if (err) {
            res.send("An unknown error occurred when uploading");
        }

        console.log(req.body.nickname);
        console.log(req.file.filename);

        // TODO(): проверка на существование пользователя
        users[req.body.nickname].avatarType = (req.file.mimetype === 'image/png') ? 'png' : 'jpeg';
        users[req.body.nickname].avatarLink = ('./avatars/' + req.file.filename);

        console.log(users);
        res.status(200).json(users[req.body.nickname].avatarLink);

        console.log('----end----');
    })
    
})

app.get('/registration', (req, res) => {
    res.sendFile('./static/registration.html', {root: __dirname});
    console.log('GET registration');
});

app.use(express.static(__dirname + '/static'));