const http = require('http'),
      express = require('express'),
      app = express(),
      body = require('body-parser'),
      multer = require('multer');  // @1.4.1

app.use(body.json());
http.createServer(app).listen(3000);
console.log('Server started at' + ' http://127.0.0.1:3000');

var upload = multer({dest: './static/avatars'});

let users = {
    'kek': {
        email: 'kek.k.ek',
		password: 'password',
		age: 1,
        score: 100500,
        avatar: 'default',
        avatarType: 'jpg',
        avatarLink: `./static/avatars/${this.avatar}.${this.avatarType}`
    }, 
    'lol': {
        email: 'lol.l.ol',
		password: 'password',
		age: 1,
        score: 100500,
        avatar: 'default',
        avatarType: 'jpg',
        avatarLink: `./static/avatars/${this.avatar}.${this.avatarType}`
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

// app.post('/profile', (req, res) => {
//     console.log('POST Profile');
//     console.log(req.headers);
//     console.log(req.file);
//     console.log(req.files);
//     console.log(req.body);
//     // console.log(req.body.avatar);
//     // console.log('file info: ',req.avatar.file);
//     // console.log('---------');
//     // console.log('file info: ',req.body.avatar.files);
//     // console.log(req.headers);

//     upload(req, res, function(err) {
//         if(err) {
//             console.log('----err----');
//             console.log(err);
//             return res.end("Error uploading file.");
//         }
//         console.log('----ok----');
//         res.end("File is uploaded");
//     });

//     console.log('----end----');
// });

app.post('/profile', upload.single('avatar'),  (req, res) => {
    console.log('POST Profile');
    console.log(req.headers);
    console.log('---------');
    console.log(req.file);
    console.log('----end----');
    res.send("OK");
})

app.get('/registration', (req, res) => {
    res.sendFile('./static/registration.html', {root: __dirname});
    console.log('GET registration');
});

app.use(express.static(__dirname + '/static'));