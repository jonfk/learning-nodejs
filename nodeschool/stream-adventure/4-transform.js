var through = require('through');

var tr = through(write, end);

function write(buf) {
    var str = buf.toString().toUpperCase()
    // console.log(buf.toString())
    this.queue(str)
}

function end () {this.queue(null)}

process.stdin.pipe(tr).pipe(process.stdout)

/* Official Solution
    var through = require('through');
    var tr = through(function (buf) {
        this.queue(buf.toString().toUpperCase());
    });
    process.stdin.pipe(tr).pipe(process.stdout);
 */
