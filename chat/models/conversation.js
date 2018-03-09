var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var conversationSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	members: {
		type: [String]
	}
});

module.exports = mongoose.model('conversationModel', conversationSchema);
