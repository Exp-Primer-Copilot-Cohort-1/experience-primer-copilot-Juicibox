// Create web server
// Run: node comments.js
// Test: curl http://localhost:8080/comments
// Test: curl -d "body=This is a comment" http://localhost:8080/comments
// Test: curl -X PUT -d "body=This is an updated comment" http://localhost:8080/comments/1
// Test: curl -X DELETE http://localhost:8080/comments/1

var http = require('http');
var url = require('url');
var qs = require('querystring');

var comments = [
    { "body": "This is a comment" },
    { "body": "This is another comment" },
    { "body": "This is the last comment" }
];

function getComments() {
    var body = JSON.stringify(comments);
    return body;
}

function addComment(comment) {
    comments.push(comment);
}

function updateComment(comment, index) {
    comments[index] = comment;
}

function deleteComment(index) {
    comments.splice(index, 1);
}

http.createServer(function(req, res) {
    if (req.method === "GET") {
        if (req.url === "/comments") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(getComments());
        }
    } else if (req.method === "POST") {
        if (req.url === "/comments") {
            var body = "";

            req.on("data", function(chunk) {
                body += chunk;
            });

            req.on("end", function() {
                var comment = qs.parse(body);
                addComment(comment);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(comment));
            });
        }
    } else if (req.method === "PUT") {
        var path = url.parse(req.url).pathname;
        var match = path.match(/^\/comments\/(\d+)$/);

        if (match) {
            var index = match[1];

            var body = "";

            req.on("data", function(chunk) {
                body += chunk;
            });

            req.on("end", function() {
                var comment = qs.parse(body);
                updateComment(comment, index);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(comment));
            });
        }
    } else if (req.method === "DELETE") {
        var path = url