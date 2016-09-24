var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommunitySchema = new Schema({
    name : {type:String},
    nss:{type: Schema.Types.ObjectId, ref: 'User' },
    doctors : {type: Schema.Types.ObjectId, ref: 'User'},
    beat:{type: Schema.Types.ObjectId, ref: 'User'}
    
    
});
module.exports = mongoose.model('Community',CommunitySchema);