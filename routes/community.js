var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Community = require('../app/models/community');


router.post('/',function(req,res){
    var community = new Community({
        name : req.body.name,
        nss: req.body.nss,
        doctors:req.body.doc,
        beat:req.body.beat
        
    });
    
    
    community.save(function(err){
        if(err){
			
				return res.json({success: false, message:"Could not Save" });
        
    }
        else{
                return res.json({success: true, message:"Success" });
            
        }
    
    
    });
    
    Community.findOne({name : req.body.name}).populate('nss').exec(function (err,post) {
   if (err) return handleError(err);
   console.log(post.nss); 
    });
    
    
    
});
    

module.exports = router;