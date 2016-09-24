var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    SALT_WORK_FACTOR = 10;
var jwt    = require('jsonwebtoken');

var UserSchema = new Schema({
  username : {type:String, required : true},
  password : {type:String, required : true },
  socketid	: {type:String, default:false},
  token:{type:String},
  name : {type:String},
  age: { type: String},
  phoneNo : {type: String},
  sex:{type:String},
  home_community : {type: Schema.Types.Mixed, ref: 'Community' },
  current_community : {type: Schema.Types.Mixed, ref: 'Community' },
  role: {type:String}



});
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.verifyToken = function(token,cb){
	if(token)
	{
		jwt.verify(token,"karthic", function(err, decoded) {
	      if (err) {
	      	console.log(err);
	        return cb(err);
	      } else {
	      	console.log(decoded);
	        // if everything is good, save to request for use in other routes
	        return true;
	        //next();
      }
    });
	}
}
module.exports = mongoose.model('User',UserSchema);
module.exports = mongoose.model('User',UserSchema);
