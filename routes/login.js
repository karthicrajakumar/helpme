var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var jwt    = require('jsonwebtoken');
var Community = require('../app/models/community');


router.post('/',function(req,res){
	//var user = new User({
    var helpline;
	//	username: req.body.username,
	//	password : req.body.password
	//});

	User.findOne({username: req.body.username}, function(err,user){

		if(err) {
			return res.json({success:false , message: "Error"});
		}
		if(!user){
			return res.json({success:false , message: "Authentication Failed, User not Found"});

		}

			user.comparePassword(req.body.password, function(err,isMatch){
				if(err) {
					return res.json({success:false , message: err});

				}
			if(!isMatch) {
				return res.json({success:true , message: "Password does not match"});sent = true;
			}
			else
				{

					var token = jwt.sign(user._id,"karthic",{
						expiresIn:"365d"
					});


					user.update({token:token},function(err){
						if(err) {
							return res.json({success:false , message: "Could Not Save User"});
						}else {
               console.log(user.home_community); Community.find({'name':user.home_community},function(err,comm){ 
                    
                    
                    
               
                            
				
                            
                return res.json({
				          success: true,
				          message: 'Successfully Logged in ',
				          token: token,
                          username: user.username,
				          name: user.name,
                          age: user.age,
                          role:user.role,
				          phoneNo : user.phoneNo,
				          sex:user.sex,
                          helpline: comm[0].helpline,
                          emergencynumber: user.emergencynumber
								});
                    });
						};
                                                                
					});
			};
		});
	});
});

module.exports = router;
