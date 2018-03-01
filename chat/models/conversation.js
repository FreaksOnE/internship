var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var conversationSchema = new Schema();

module.exports = mongoose.model('conversationModel', conversationSchema);
