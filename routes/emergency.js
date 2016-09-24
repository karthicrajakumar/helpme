var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../app/models/user');
var Community = require('../app/models/community');
var Emergency = require('../app/models/emergency');
var mongoose = require('mongoose');

router.post('/',function(req,res){
    var id = req.decoded;
    var home = req.body.home;
    var lat = req.body.lat;
    var long = req.body.long;
    var internet = req.body.net;
    var io = req.io;
    
    var emergency  = new Emergency({
       user: id,
       lat : lat,
       long : long,
       community: home,
       resolved : false,
       internet : internet
        
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
              io.sockets.emit(home+"_emergency_beat",{result:doc});
            io.sockets.emit(home+"_emergency_nss",{result:doc});
            io.sockets.emit(home+"_emergency_doctor",{result:doc});// how?

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
              io.sockets.emit(home+"_emergency_abort_beat",{result:doc});
                  io.sockets.emit(home+"_emergency_abort_nss",{result:doc});
                  io.sockets.emit(home+"_emergency_abort_doctor",{result:doc});
                  io.sockets.emit(post.user.username+"_emergency_abort",{result:doc});
            var boolean = post.internet;
            if(boolean == "false")
            {
            request.post(
                'http://api.textlocal.in/send/',
                { form: { 'username': 'redrageclan@gmail.com',
                         'hash':'77899f2bdb7e1611cd11ebb7e7bacc6f5bf117e6',
                         'sender':"TXTLCL",
                         'numbers':post.user.phoneNo,
                         'message'	: "Help is On Your Way "+user.name+"is on your way to help You"}                 },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body)
                    }
                }
            );
              }
            
            return res.json({success: true, message:doc });
       });
            });
        
        
        
    });
    
});

module.exports = router;