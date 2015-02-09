/*
  Write an HTTP server that receives only POST requests and converts incoming POST body characters to upper-case and returns it to the client.

Your server should listen on the port provided by the first argument to your program.
*/

if (process.argv.length < 3) {
    console.log("missing arguments");
    return;
}

var http = require('http');
var map = require('through2-map');

var server = http.createServer(function (req, res) {
    // missing post method check!
    req.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase();
    })).pipe(res)
});

server.listen(process.argv[2])

/* Solution:
    var http = require('http')
    var map = require('through2-map')

    var server = http.createServer(function (req, res) {
      if (req.method != 'POST')
        return res.end('send me a POST\n')

      req.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase()
      })).pipe(res)
    })

    server.listen(Number(process.argv[2]))
*/
