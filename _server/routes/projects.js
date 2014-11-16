var express = require('express');
var router = express.Router();

/*
 * GET projectlist.
 */
router.get('/projectlist', function(req, res) {
    var db = req.db;
    db.collection('projectlist').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST to addproject.
 */
router.post('/addproject', function(req, res) {
    var db = req.db;
    req.body.pic = req.session.lastpic;
    req.session.lastpic = null;
    db.collection('projectlist').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});
router.post('/pic',function(req, res){
    req.session.picMSG = "upload complete!"
    res.redirect('/project-create.html#uploaded');
})
/*
 * DELETE to deleteproject.
 */
router.delete('/deleteproject/:id', function(req, res) {
    var db = req.db;
    var projectToDelete = req.params.id;
    db.collection('projectlist').removeById(projectToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.get('/get/:id', function(req, res){
    var db = req.db;
    var projectID = req.params.id;
    db.collection('projectlist').findById(projectID, function(err, result) {
        res.json((result)? result: {msg: "project not found!"});
    });

});

router.put('/update/:id', function(req, res){
    var db = req.db;
    var projectID = req.params.id;
    db.collection('projectlist').updateById(projectID,
        {$set: req.body},
        {safe: true, multi: false},
        function(e, result){
            res.send((result === 1) ? {msg:'success'} : {msg: 'error'})
        });
});


module.exports = router;
