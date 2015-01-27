var express = require('express');
var router = express.Router();

var users = [{name:"jon", squat:275, bench:170,deadlift:340}
             , {name:"camille", squat:300, bench:100,deadlift:300}]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My first node web service' });
});

// router.get('/users', function(req, res, next) {
//     res.send(users)
// });

// router.get('/users/:name', function(req, res, next) {
//     console.log(req.params.name)
//     for(var i = 0; i < users.length; i++) {
//         if(users[i].name.localeCompare(req.params.name) == 0) {
//             res.send(users[i]);
//             return;
//         }
//     }
//     res.sendStatus(404)
// });

// router.post('/users', function(req, res, next) {
//     res.sendStatus(404)
// });

module.exports = router;
