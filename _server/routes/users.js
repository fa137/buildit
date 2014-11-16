var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    db.collection('userlist').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    req.body.pic = req.session.lastpic;
    req.session.lastpic = null;
    db.collection('userlist').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.post('/pic',function(req, res){
    res.redirect('/');
})
/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('userlist').removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: 'deleted' } : { msg:'error: ' + err });
    });
});

router.get('/get/:name', function(req, res){
    var db = req.db;
    var userNameReq = req.params.name;
    db.collection('userlist').findOne({username: userNameReq}, function(err, result) {
        res.json((result) ? result : {msg: "username not found!"});
    });

});

router.put('/update/:name', function(req, res){
    var db = req.db;
    var userNameReq = req.params.name;
    db.collection('userlist').update({username: userNameReq},
        {$set: req.body},
        {safe: true, multi: false},
        function(e, result){
            res.send((result === 1) ? {msg:'success'} : {msg: 'error'})
        });
});

module.exports = router;