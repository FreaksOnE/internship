// Configuring basic Express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var math = require('mathjs');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
// Add db models
var userModel = require('./models/user');
var conversationModel = require('./models/conversation');
var messageModel = require('./models/message');
var LocalStrategy = require('passport-local').Strategy;

// Configuring Express
app.use(morgan('dev')); // log requests to the console
app.use(cookieParser());

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(expressSession({
	secret: 'mySecretKey'
}));
app.use(passport.initialize());
app.use(passport.session());

// Configuring Mangoose
var mongoDB = 'mongodb://chatUser:123@ds249718.mlab.com:49718/chatdb';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.listen(port, function () { // "192.168.42.221",
	console.log('Server listening at port %d', port);
});

// Configuring Passport
passport.serializeUser(function (user, done) {
	done(null, user._id);
});

passport.deserializeUser(function (id, done) {
	userModel.findById(id, function (err, user) {
		done(err, user);
	});
});

passport.use('local_login', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	function (req, username, password, done) {
		userModel.findOne({
				'local.name': username
			},
			function (err, user) {
				if (err)
					return done(err);
				if (!user) {
					console.log('User Not Found with username ' + username);
					//return done();
					return done(null, false, {
						message: 'User Not Found with username ' + username + '.'
					});
				}
				//console.log("passwd: " + user.validPassword(password));
				if (!user.validPassword(password)) {
					console.log('Invalid Password');
					//return done();
					return done(null, false, {
						message: 'Invalid Password.'
					});
				}
				return done(null, user);
			}
		);
	}));

passport.use('local_signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	function (req, username, password, done) {
		findOrCreateUser = function () {
			userModel.findOne({
				'local.name': username
			}, function (err, user) {
				if (err) {
					console.log('Error in SignUp: ' + err);
					return done(err);
				}
				if (user) {
					console.log('User already exists');
					return done(null, false, {
						message: 'User Already Exists'
					});
				} else {
					var newUser = new userModel();
					newUser.local.name = username;
					newUser.local.password = newUser.generateHash(password);

					newUser.save(function (err) {
						if (err) {
							console.log('Error in Saving user: ' + err);
							throw err;
						}
						console.log('User Registration succesful');
						return done(null, newUser);
					});
				}
			});
		};
		process.nextTick(findOrCreateUser);
	}));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/chat.html'));
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));



var router = express.Router();
app.use('/api', router);

router.get('/', function (req, res) {
	res.json({
		message: 'api'
	});
});



router.route('/login').post(function (req, res, next) {
	passport.authenticate('local_login', function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.json(info);;
		}
		req.logIn(user, function (err) {
			if (err) {
				return next(err);
			}
			return res.json({
				message: 'done'
			});
		});
	})(req, res, next);
});
app.route('/login').get(function (req, res) {
	res.sendFile(path.join(__dirname + '/public/login.html'));
});

router.route('/signup').post(function (req, res, next) {
	passport.authenticate('local_signup', function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.json(info);;
		}
		return res.json({
			message: 'done'
		});
		/*req.logIn(user, function (err) {
			if (err) {
				return next(err);
			}
			return res.json({
				message: 'done'
			});
		});*/
	})(req, res, next);
});
app.route('/signup').get(function (req, res) {
	res.sendFile(path.join(__dirname + '/public/signup.html'));
});

// Handle Logout
router.get('/signout', function (req, res) {
	if (req.isAuthenticated()) {
		req.logout();
		res.json({
			message: 'done'
		});
	} else {
		res.json({
			message: 'unauthorized'
		});
	}

});

router.all('/*', function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.json({
		message: 'unauthorized'
	});
});

//router.all('/api/*', requireAuthentication);

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

	newConversation.name = req.body.name;

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
/*router.route('/users').post(function (req, res) {
	var newUser = new userModel();

	newUser.local.name = req.body.name;
	newUser.local.password = newUser.generateHash(req.body.password);

	newUser.save(function (err) {
		if (err)
			res.send(err);

		res.json({
			message: 'done'
		});
	});

})*/

router.route('/user').get(function (req, res) {
	res.json({
		message: 'done',
		data: { name: req.user.local.name,
			  id: req.user.id}
	});
});

router.route('/users').get(function (req, res) {
	userModel.find().select('local.name local.online').exec(function (err, result) {
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


		newMsg.from = req.user.id;
		newMsg.sendersName = req.user.name;

		newMsg.save(function (err) {
			if (err)
				res.send(err);

			res.json({
				message: 'done'
			});
		});
	});
});

router.route('/msgs/:conv_id').get(function (req, res) {
	messageModel.find({
		conversationID: req.params.conv_id
	}, function (err, result) {
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
