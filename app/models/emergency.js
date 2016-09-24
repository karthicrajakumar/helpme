var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var EmergencySchema = new Schema({
    
    user: {type: Schema.Types.ObjectId, ref: 'User' },
    lat:{type:String},
    long:{type:String},
    community:{type:String},
    resolved:{type: Boolean}
    
    
});
module.exports = mongoose.model('Emergency',EmergencySchema);