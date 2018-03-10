var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messageSchema = new Schema({
    msgType: {
        type: String,
        default: 'message',
        enum: ['message', 'notification', 'image']
    },
    text: {
        type: String,
        min: 1,
        required: true
    },
    from: {
        type: String
    },
    sendersName: {
        type: String
    },
    conversationID: {
        type: Schema.ObjectId,
        ref: 'conversation',
		required: true
    },
    queueNumber: {
        type: Number,
		required: true
    },
    spam: {
        type: Boolean,
        default: false
    },
    sent: {
        type: Boolean,
        default: true
    },
    seen: {
        type: Boolean,
        default: false
    },
    reportCount: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now 
    },
    deleted: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('messageModel', messageSchema);