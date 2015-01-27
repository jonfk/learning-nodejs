var express = require('express');
var router = express.Router();

var users = [{name:"jon", squat:275, bench:170,deadlift:340}
             , {name:"camille", squat:300, bench:100,deadlift:300}]

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(users)
});

router.get('/:name', function(req, res, next) {
    console.log(req.params.name)
    for(var i = 0; i < users.length; i++) {
        if(users[i].name.localeCompare(req.params.name) == 0) {
            res.send(users[i]);
            return;
        }
    }
    res.sendStatus(404)
});

router.post('/', function(req, res, next) {
    var newUser = req.body
    if(newUser.hasOwnProperty("name")) {
        if(!exists(newUser.name)) {
            users.push(newUser);
            res.json(req.body);
        } else {
            res.status(400).send("User already exists")
        }
    } else {
        res.status(400).send("json malformed. Needs name")
    }
});

router.put('/:name', function(req, res, next) {
    if(exists(req.params.name)) {
        for(var i = 0; i < users.length; i++) {
            if(users[i].name.localeCompare(req.params.name) == 0 && validateUser(req.body)) {
                users[i] = req.body
                res.send(req.body);
            }
        }
        res.status(400).send("json malformed. Needs name")
    } else {
        res.status(404).send("User does not exist")
    }
});

router.delete('/:name', function(req, res, next) {
    if(exists(req.params.name)) {
        for(var i = 0; i < users.length; i++) {
            if(users[i].name.localeCompare(req.params.name) == 0) {
                deleted = users[i]
                users.splice(i,1)
                res.send(deleted)
            }
        }
    } else {
        res.status(404).send("User does not exist")
    }
});

function exists(username) {
    for(var i = 0; i < users.length; i++) {
        if(users[i].name.localeCompare(username) == 0) {
            return true;
        }
    }
    return false
}

function validateUser(body) {
    if(body.hasOwnProperty("name")) {
        return true;
    }
    return false;
}


module.exports = router;
