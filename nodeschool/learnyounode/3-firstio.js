// Write a program that uses a single synchronous filesystem operation to read a file and print the number of newlines it contains to the console (stdout), similar to running cat file | wc -l.

// The full path to the file to read will be provided as the first command-line argument.

var fs = require('fs');

var buf = fs.readFile(process.argv[2]);

var str = buf.toString();

lines = str.split('\n');

console.log(lines.length - 1);
