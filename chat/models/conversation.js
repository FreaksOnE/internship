var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var conversationSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	members: {
		type: [Schema.ObjectId],
        ref: 'user'
	}
});

module.exports = mongoose.model('conversationModel', conversationSchema);
