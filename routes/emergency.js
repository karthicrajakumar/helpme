var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Community = require('../app/models/community');


router.post('/',function(req,res){
    var id = req.decoded;
    var home = req.body.home;
    var lat = req.body.lat;
    var long = req.body.long;
    
    var community;
    User.find({'_id':mongoose.Types.ObjectId(id)},function(err,user){
        community = user.community;
    })
    
});

module.exports = router;