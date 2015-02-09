/*
Write a TCP time server!

Your server should listen to TCP connections on the port provided by the first argument to your program.
For each connection you must write the current date & 24 hour time in the format:

    "YYYY-MM-DD hh:mm"

followed by a newline character. Month, day, hour and minute must be zero-filled to 2 integers. For examp
le:

    "2013-07-06 17:42"
 */

if(process.argv.length < 3) {
    console.log("missing arguments")
}

var net = require('net')

var server = net.createServer(function(socket) {
    var data = getDate();
    socket.write(data);
    socket.write("\n");
    socket.end()
});

server.listen(process.argv[2])

function getDate() {
    var date = new Date();
    var year = date.getFullYear().toString()
    var month = function () {
        var month = date.getMonth() + 1
        if (month < 10) {
            return "0" + month.toString()
        }
        return month.toString()
    }();
    var day = date.getDate().toString()
    var hours = date.getHours().toString()
    var min = date.getMinutes().toString()

    var strDate = "" + year + "-" + month + "-" + day + " " + hours + ":" + min
    return strDate
}

/*Solution:
    var net = require('net')

    function zeroFill(i) {
      return (i < 10 ? '0' : '') + i
    }

    function now () {
      var d = new Date()
      return d.getFullYear() + '-'
        + zeroFill(d.getMonth() + 1) + '-'
        + zeroFill(d.getDate()) + ' '
        + zeroFill(d.getHours()) + ':'
        + zeroFill(d.getMinutes())
    }

    var server = net.createServer(function (socket) {
      socket.end(now() + '\n')
    })

    server.listen(Number(process.argv[2]))
*/
