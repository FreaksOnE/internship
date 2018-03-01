var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 30
    },
    conversations: {
        type: [Schema.ObjectId],
        ref: 'conversation'
    },
    banned: {
        type: Boolean,
        default: false
    },
    online: {
        type: Boolean,
        default: false
    },
	sessionID: {
		type: String,
		//required: true
	}
});

module.exports = mongoose.model('userModel', userSchema);
