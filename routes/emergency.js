var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Community = require('../app/models/community');
var Emergency = require('../app/models/emergency');
var mongoose = require('mongoose');

router.post('/',function(req,res){
    var id = req.decoded;
    var home = req.body.home;
    var lat = req.body.lat;
    var long = req.body.long;
    var io = req.io;
    
    var emergency  = new Emergency({
       user: id,
       lat : lat,
       long : long,
       community: home,
       resolved : false
        
    });
    emergency.save(function(err,emer){
        if(err)
        {
            return res.json({success: false, message:"Could not Save" });
        }
        else{
                                    
        User.find({'_id':mongoose.Types.ObjectId(id)},function(err,user){
              var io = req.io
              var doc = {
                user: user,
                emergency_id: emer._id,
                lat: lat,
                long : long
                
              }

              console.log(doc);
              io.sockets.emit(home+"_emergency",{result:doc}); // how?

            });
            return res.json({success: true, message:"Success" });
            
        }
        
        
        
    });  
});

router.post('/resolved',function(req,res){
    var id = req.decoded;
    var emergency_id = req.body.emergency_id;
    Emergency.findById(emergency_id,function(err,emergency){
        emergency.set({resolved:true}).save();
       var home = emergency.community; User.find({'_id':mongoose.Types.ObjectId(id)},function(err,user){
              var io = req.io
              var doc = {
                user: user
                
                
              }
              
              Emergency.findOne({'_id':emergency_id}).populate('user').exec(function(err,post){
                  
             if (err) return handleError(err);
              console.log(post.user);
              io.sockets.emit(home+"_emergency_abort",{result:doc});                io.sockets.emit(post.user.username+"_emergency_abort",{result:doc});
              
            
            return res.json({success: true, message:doc });
       });
            });
        
        
        
    });
    
});

module.exports = router;