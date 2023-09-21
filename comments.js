// create web server
// use express framework
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');
var multer = require('multer');
var upload = multer({dest: './uploads/'});

// use cors to allow cross origin resource sharing
app.use(cors());

// use body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// use multer to parse multipart form data
// app.use(upload.array());
// app.use(express.static('public'));

// read comments from file
var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// get comments
app.get('/comments', function (req, res) {
    console.log("GET From Server");
    res.json(comments);
});

// post comment
app.post('/comments', function (req, res) {
    console.log("POST From Server");
    var newComment = {
        id: Date.now(),