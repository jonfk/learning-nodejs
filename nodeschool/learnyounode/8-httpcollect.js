/*
Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argu
ment. Collect all data from the server (not just the first "data" event) and then write two lines to the
console (stdout).

The first line you write should just be an integer representing the number of characters received from th
e server. The second line should contain the complete String of characters sent by the server.
 */

var http = require('http')

if(process.argv.length < 3) {
    console.log("missing url argument");
    return;
}

http.get(process.argv[2], function(res) {
    res.setEncoding('utf8')
    var totalData = ""
    res.on('data', function(data){
        totalData = totalData + data
    });

    res.on('end', function(){
        console.log(totalData.length)
        console.log(totalData)
    });

});

/* Solution:
    var http = require('http')
    var bl = require('bl')

    http.get(process.argv[2], function (response) {
      response.pipe(bl(function (err, data) {
        if (err)
          return console.error(err)
        data = data.toString()
        console.log(data.length)
        console.log(data)
      }))
    })
 */
