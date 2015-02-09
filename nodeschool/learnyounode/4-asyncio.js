// Write a program that uses a single asynchronous filesystem operation to read a file and print the number of newlines it contains to the console (stdout), similar to running cat file | wc -l.

// The full path to the file to read will be provided as the first command-line argument.

var fs = require('fs');

if(process.argv.length < 3) {
    console.log("need file argument to program")
    return
}

fs.readFile(process.argv[2], function(err, data) {
    var str = data.toString();
    lines = str.split('\n');

    console.log(lines.length - 1);
});
