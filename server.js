const http = require('http'),
      express = require('express'),
      app = express();
      body = require('body-parser');

http.createServer(app).listen(3000);
console.log('Server started at' + ' http://127.0.0.1:3000');


let users = {
    'kek': {
        email: 'kek.k.ek',
		password: 'password',
		age: 1,
        score: 100500,
        avatar: 'default',
        avatarLink: `./static/avatars/${avatar}.jpg`
    }, 
    'lol': {
        email: 'lol.l.ol',
		password: 'password',
		age: 1,
        score: 100500,
        avatar: 'default',
        avatarLink: `./static/avatars/${avatar}.jpg`
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

app.post('/profile', (req, res) => {
    // const usr = req.body.email;
    console.log(req)
})

app.get('/registration', (req, res) => {
    res.sendFile('./static/registration.html', {root: __dirname});
    console.log('GET registration');
});

app.use(express.static(__dirname + '/static'));