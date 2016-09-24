var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Community = require('../app/models/community');
var mongoose = require('mongoose');

router.post('/',function(req,res){
    var id = req.decoded;
    var home = req.body.home;
    var lat = req.body.lat;
    var long = req.body.long;
    var io = req.io;
    
    
    User.find({'_id':mongoose.Types.ObjectId(id)},function(err,user){
      var io = req.io
      
      var doc = {
        user: user,
        lat: lat,
        long : long
      }
      
      console.log(doc);
      io.sockets.emit(home+"_emergency",{result:doc}); // how?

    });
    return res.json({success: true, message:"Success" });
    
    
    
});

module.exports = router;