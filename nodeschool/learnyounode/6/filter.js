var fs = require('fs')

module.exports = function(dir, ext, callback) {
    fs.readdir(dir, function(err, list) {
        if(err) {
            return callback(err)
        }
        var filtered = []
        for(var i = 0; i < list.length; i++) {
            var file = list[i].split(".")
            var fileExt = file[file.length - 1]
            if(fileExt.localeCompare(ext) == 0 && file.length > 1) {
                filtered.push(list[i])
            }
        }
        return callback(null, filtered)
})};
