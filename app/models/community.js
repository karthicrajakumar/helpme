var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommunitySchema = new Schema({
    name : {type:String},
    nss-members:{type: Schema.Types.Mixed, ref: 'User' },
    doctors : {type: Schema.Types.Mixed, ref: 'User'},
    beat-officers:{type: Schema.Types.Mixed, ref: 'User'}
    
    
});