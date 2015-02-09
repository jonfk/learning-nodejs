// Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argu
// ment. Write the String contents of each "data" event from the response to a new line on the console (stdo
// ut).


var http = require('http')

if(process.argv.length < 3) {
    console.log("missing url argument");
    return;
}

http.get(process.argv[2], function(res) {
    res.setEncoding('utf8')
    res.on('data', function(data){
        console.log(data)
    });

});

/*Solution:
    var http = require('http')

    http.get(process.argv[2], function (response) {
      response.setEncoding('utf8')
      response.on('data', console.log)
      response.on('error', console.error)
    })
*/
