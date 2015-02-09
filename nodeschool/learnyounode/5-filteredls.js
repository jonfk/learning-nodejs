// Create a program that prints a list of files in a given directory, filtered by the extension of the files. You will be provided a directory name as the first argument to your program (e.g. '/path/to/dir/') and a file extension to filter by as the second argument.

// For example, if you get 'txt' as the second argument then you will need to filter the list to only files that end with .txt. Note that the second argument will not come prefixed with a '.'.

// The list of files should be printed to the console, one file per line. You must use asynchronous I/O.

var fs = require('fs')

if(process.argv.length < 3) {
    console.log("missing arguments")
    return
}

if(process.argv.length == 3) {
    fs.readdir(process.argv[2], function(err, list) {
        console.log(list.join("\n"))
    });
}

if(process.argv.length == 4) {
    var ext = process.argv[3]
    fs.readdir(process.argv[2], function(err, list) {
        var filtered = []
        for(var i = 0; i < list.length; i++) {
            var file = list[i].split(".")
            var fileExt = file[file.length - 1]
            if(fileExt.localeCompare(ext) == 0 && file.length > 1) {
                filtered.push(list[i])
            }
        }

        console.log(filtered.join("\n"))
    });
}
