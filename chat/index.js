// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var mongoose = require('mongoose');
var mongoDB = 'mongodb://chatUser:123@ds249718.mlab.com:49718/chatdb';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var userModel = require('./models/user');
var conversationModel = require('./models/conversation');
var messageModel = require('./models/message');

var math = require('mathjs');


/*userModel.create({ name: 'name2' }, function (err, instance) {
    if (err) return handleError(err);
    // saved!
    console.log(instance.id);
});*/

server.listen(port, function () { // "192.168.42.221",
	console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
	res.json({
		message: 'api'
	});
});

app.use('/api', router);


/*
Route					HTTP Verb	Description
/api/bears 				GET 		Get all the bears.
/api/bears 				POST 		Create a bear.
/api/bears/:bear_id 	GET 		Get a single bear.
/api/bears/:bear_id 	PUT 		Update a bear with new info.
/api/bears/:bear_id 	DELETE 		Delete a bear.
*/

// on routes that end in /convs
router.route('/convs').post(function (req, res) {
	var newConversation = new conversationModel();

	newConversation.save(function (err, result) {
		if (err)
			res.send(err);
		console.log(result._id);
		messageModel.create({
			msgType: 'notification',
			text: 'chat created',
			conversationID: result._id,
			queueNumber: 0
		}, function (err, result) {
			if (err) return handleError(err);
			// saved!
		});

		res.json({
			message: 'done'
		});
	});

}).get(function (req, res) {
	conversationModel.find(function (err, result) {
		if (err)
			res.send(err);

		res.json({
			message: 'done',
			data: result
		});
	});
});

// on routes that end in /convs/:conv_id
router.route('/convs/:conv_id').get(function (req, res) {
	conversationModel.findById(req.params.conv_id, function (err, result) {
		if (err)
			res.send(err);
		res.json(result);
	});
}).delete(function (req, res) {
	conversationModel.remove({
		_id: req.params.conv_id
	}, function (err) {
		if (err)
			res.send(err);

		res.json({
			message: 'done'
		});
	});
});



// on routes that end in /users
router.route('/users').post(function (req, res) {
	var newUser = new userModel();

	newUser.name = req.body.name;
	newUser.sessionID = req.body.sessionID;

	newUser.save(function (err) {
		if (err)
			res.send(err);

		res.json({
			message: 'done'
		});
	});

}).get(function (req, res) {
	userModel.find().select('name online sessionID').exec(function (err, result) {
		if (err)
			res.send(err);

		res.json({
			message: 'done',
			data: result
		});
	});
});

// on routes that end in /convs/:conv_id
router.route('/users/:user_id').get(function (req, res) {
	userModel.findById(req.params.user_id).select('name online').exec(function (err, result) {
		if (err)
			res.send(err);
		res.json({
			message: 'done',
			data: result
		});
	});
}).put(function (req, res) {
	userModel.findById(req.params.user_id, function (err, result) {
		if (err)
			res.send(err);

		result.name = req.body.name;

		result.save(function (err) {
			if (err)
				res.send(err);

			res.json({
				message: 'done'
			});
		});

	});
}).delete(function (req, res) {
	userModel.remove({
		_id: req.params.user_id
	}, function (err) {
		if (err)
			res.send(err);

		res.json({
			message: 'done'
		});
	});
});




// on routes that end in /msgs
router.route('/msgs').post(function (req, res) {
	var newMsg = new messageModel();

	newMsg.msgType = req.body.msgType;
	newMsg.text = req.body.text;
	newMsg.conversationID = req.body.conversationID;

	messageModel.find({
		conversationID: newMsg.conversationID
	}).select('queueNumber').exec(function (err, result) {
		if (err)
			console.log(err);

		var temp = [];
		result.forEach(function (elem) {
			temp.push(elem.queueNumber);
		});
		if (temp.length < 1) {
			newMsg.queueNumber = 0;
		} else {
			newMsg.queueNumber = math.max(temp) + 1;
			//console.log(newMsg.queueNumber);
		}

		userModel.find({
			sessionID: 12345
		}, function (err, result2) {
			if (err)
				res.send(err);

			newMsg.from = result2._id

			newMsg.save(function (err) {
				if (err)
					res.send(err);

				res.json({
					message: 'done'
				});
			});
		});
	});
}).get(function (req, res) {
	messageModel.find(function (err, result) {
		if (err)
			res.send(err);

		res.json({
			message: 'done',
			data: result
		});
	});
});

// on routes that end in /msgs/:msg_id
router.route('/msgs/:msg_id').get(function (req, res) {
	messageModel.findById(req.params.msg_id, function (err, result) {
		if (err)
			res.send(err);
		res.json({
			message: 'done',
			data: result
		});
	});
}).put(function (req, res) {
	messageModel.findById(req.params.msg_id, function (err, result) {
		if (err)
			res.send(err);

		result.text = req.body.text;

		result.save(function (err) {
			if (err)
				res.send(err);

			res.json({
				message: 'done'
			});
		});

	});
}).delete(function (req, res) {
	messageModel.remove({
		_id: req.params.msg_id
	}, function (err) {
		if (err)
			res.send(err);

		res.json({
			message: 'done'
		});
	});
});

// Chatroom

var numUsers = 0;

var msgs = [];
var users = [];

function logUsers() {
	console.log(numUsers + " online");
	console.log(users);
}

io.on('connection', function (socket) {
	//console.log("user joined.");
	var addedUser = false;

	socket.on('new message', function (data) {
		msgs.push(data);
		console.log(data);
		io.emit('new message', data); //socket.broadcast.emit('new message', data);
	});

	// when the client emits 'add user', this listens and executes
	socket.on('add user', function (username) {
		if (addedUser) return;

		socket.username = username;
		++numUsers;
		addedUser = true;

		var userID = Math.floor((Math.random() * (99999 - 10000)) + 10000);

		var userIDs = [];
		users.forEach(function (elem) {
			userIDs.push(elem.id);
		});

		var IDexists = userIDs.includes(userID);

		while (IDexists) {
			userID = Math.floor((Math.random() * (99999 - 10000)) + 10000);
			if (!userIDs.includes(userID))
				break;
		}

		socket.userID = userID;

		socket.emit('login', {
			id: socket.userID,
		});

		users.push({
			id: socket.userID,
			name: socket.username,
			conversations: 1,
			banned: false,
		});

		io.emit('user joined', {
			id: socket.userID,
			name: socket.username,
		});
		logUsers();
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function () {
		if (addedUser) {
			--numUsers;

			io.emit('user left', {
				id: socket.userID,
				name: socket.username,
			});
			users.forEach(function (elem) {
				if (elem.name == socket.username) {
					users.splice(users.indexOf(elem), 1);
				}
			});
			logUsers();
		}
	});
});
