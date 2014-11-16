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
    db.collection('projectlist').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

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

module.exports = router;