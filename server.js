var http = require('http'),
    express = require('express'),
    app = express();

http.createServer(app).listen(3000);
console.log('Server started at' + ' http://127.0.0.1:3000');

app.get('/', function (req, res) {                       //Пока что это будет страничка меню, ибо все равно стартовая
    res.sendFile('./static/index.html', {root: __dirname});
    console.log('GET index');
});

app.get('/login', function (req, res) {
    res.sendFile('./static/login.html', {root: __dirname});
    console.log('GET login');
});

app.get('/registration', function (req, res) {
    res.sendFile('./static/registration.html', {root: __dirname});
    console.log('GET registration');
});

app.get('/about', function (req, res) {
    res.sendFile('./static/about.html', {root: __dirname});
    console.log('GET about');
});

app.get('/profile', function (req, res) {
    res.sendFile('./static/profile.html', {root: __dirname});
    console.log('GET profile');
});

app.get('/leaderboard', function (req, res) {
    res.sendFile('./static/leaderboard.html', {root: __dirname});
    console.log('GET leaderboard');
});

app.use(express.static(__dirname + '/static'));