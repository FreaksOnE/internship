var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	local: {
		name: {
			type: String,
			required: true,
			max: 30
		},
		password: {
			type: String,
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
		deleted: {
			type: Boolean,
			default: false
		},
		sessionID: {
			type: String
		},
		auth_id: {
			type: String
		},
		picture: {
			type: String
		}
	},

});

// generating a hash
userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('userModel', userSchema);
