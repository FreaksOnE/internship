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
var cookie = require('cookie');
// Add db models
var userModel = require('./models/user');
var conversationModel = require('./models/conversation');
var messageModel = require('./models/message');
var LocalStrategy = require('passport-local').Strategy;
const Auth0Strategy = require('passport-auth0');

var envs = require('envs');

var auth0 = require("auth0-js");

var socketioJwt = require("socketio-jwt");

const requireAuth = true;
const production = true;

const callbackURL = 'http://5.160.218.90:3000/api/callback';
//var passportSocketIo = require('passport.socketio');

var expressjwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwt = require('jsonwebtoken');

var jwtSecret = jwks.expressJwtSecret({
	cache: true,
	rateLimit: true,
	jwksRequestsPerMinute: 15,
	jwksUri: "https://chat-demo-app.eu.auth0.com/.well-known/jwks.json"
});

var jwtAud = "";

if (production) {
	jwtAud = "http://5.160.218.90:3000/";
} else {
	jwtAud = "http://localhost:3000/";
}

var jwtCheck = expressjwt({
	secret: jwtSecret,
	audience: jwtAud + 'api',
	issuer: "https://chat-demo-app.eu.auth0.com/",
	algorithms: ['RS256'],
});


var cuSecret = '{"alg":"RS256","kty":"RSA","use":"sig","x5c":["MIIDDzCCAfegAwIBAgIJHb21YeziEU5IMA0GCSqGSIb3DQEBCwUAMCUxIzAhBgNVBAMTGmNoYXQtZGVtby1hcHAuZXUuYXV0aDAuY29tMB4XDTE4MDMwOTEwMzgyMVoXDTMxMTExNjEwMzgyMVowJTEjMCEGA1UEAxMaY2hhdC1kZW1vLWFwcC5ldS5hdXRoMC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC0RoGw+RKA7G8wOj+IaXcN36aulf+4ZL/WM99ucmG/BGSyoaHoqsAahzlNQ2bEI3EBAcIoLVi1D4uwWGRnaOcavIqyIWW6r4VGw+6VhTv9tyVn8QAArTZSy81kqhe8sNxBVvh93pb8Vlv6yihqskfdTTmeopU82P/k6UCgP2s9AP72rgG9r0WRLBJh3B+Gucs4D1jKecVNqUG9JL3TrWRplIct7PlvB3uYVMnrPwEiugD2B+5yP4wqzJskXHO6Kdv/kW5CoJRwpJ53MbmCr8F51CAMLM7LscsH/gKSdA4aqSGl7dWa2nQkIAvRYc6qoNTQ/FjSiUqJXEdvrbZ+/vmZAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFBOGacz6Cvr9fyvCp/dGdq6uGIraMA4GA1UdDwEB/wQEAwIChDANBgkqhkiG9w0BAQsFAAOCAQEAUjBl7hbdwoLuzJbdUTZD5Qf5DDkXuI4iujTUkjvAizjd4lQ9tZuRzkrd9ydQfuHXeNawFm7F6Vp+g2EG+vS31hCBciDhYCKdNTj9PGrtczYoT/qd6PA+IKt/xHceU0IhF4VaebEsenGNIC9UC5ngFoCj8ZPVq3CLPCU06rdsXmd7VIj2dwK4NOg4YTG2DHkytrU4Gvb+y4L0+WpMamEz7IjJR6TgTUukg0uYsYDRoWL8sYLW7XOoQIctjcn87zZu10Ki+VBMv+zOSCt56oKcMR6MYl5TYos5y2RUTNDMFpefTMSfDrGcOtQ/KU4wauNOlJi2biOAVmi0E1uXEd/Z0Q=="],"n":"tEaBsPkSgOxvMDo_iGl3Dd-mrpX_uGS_1jPfbnJhvwRksqGh6KrAGoc5TUNmxCNxAQHCKC1YtQ-LsFhkZ2jnGryKsiFluq-FRsPulYU7_bclZ_EAAK02UsvNZKoXvLDcQVb4fd6W_FZb-sooarJH3U05nqKVPNj_5OlAoD9rPQD-9q4Bva9FkSwSYdwfhrnLOA9YynnFTalBvSS9061kaZSHLez5bwd7mFTJ6z8BIroA9gfucj-MKsybJFxzuinb_5FuQqCUcKSedzG5gq_BedQgDCzOy7HLB_4CknQOGqkhpe3Vmtp0JCAL0WHOqqDU0PxY0olKiVxHb622fv75mQ","e":"AQAB","kid":"NzEyQ0VGMkMwOEUyNEM1Q0M1RjExMjI2N0I4N0YwRDVGRUM2QzA3Rg","x5t":"NzEyQ0VGMkMwOEUyNEM1Q0M1RjExMjI2N0I4N0YwRDVGRUM2QzA3Rg"}';
//app.use(jwtCheck);

// Configuring Express
app.use(morgan('dev')); // log requests to the console
app.use(cookieParser());

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// Configure Passport to use Auth0
var strategy = new Auth0Strategy({
		domain: 'chat-demo-app.eu.auth0.com',
		clientID: 'xLdhXhO_gp2bCFQ0B5cJTcqJqqpq_hBI',
		clientSecret: 'ANQXjiqmUrpMzkxstT94TuJUL1l_xbvPtgCT5ds2kvYgrHitpphpb48ycbwewWdp',
		callbackURL: callbackURL
	},
	(accessToken, refreshToken, extraParams, profile, done) => {
		return done(null, profile);
	}
);

//passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});


var sessionMiddleware = expressSession({
	//store: sessionStore,
	secret: 'mySecretKey',
	resave: true,
	saveUninitialized: false

});

io.use(function (socket, next) {
	sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(sessionMiddleware);
//app.use(passport.initialize());
//app.use(passport.session());


/*io.use(passportSocketIo.authorize({
	key: 'connect.sid',
	secret: process.env.SECRET_KEY_BASE,
	store: sessionStore,
	passport: passport,
	cookieParser: cookieParser
}));*/

// Configuring Mangoose
var mongoDB = 'mongodb://localhost:27017/test';
//var mongoDB = 'mongodb://chatUser:123@ds249718.mlab.com:49718/chatdb';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.listen(port, '::', function () { // "192.168.42.221",
	console.log('Server listening at port %d', port);
});

userModel.find({
	'local.online': true
}, function (err, result) {
	if (result) {
		for (var i = 0; i < result.length; i++) {
			result[i].local.online = false;
			result[i].save(function (err, result2) {
				if (err)
					console.log(err);
				//console.log('res: ' + result2);
			});
		}
	}
});

/*// Configuring Passport
passport.serializeUser(function (user, done) {
	done(null, user._id);
});

passport.deserializeUser(function (id, done) {
	userModel.findById(id, function (err, user) {
		done(err, user);
	});
});*/

/*passport.use('local_login', new LocalStrategy({
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
				user.local.sessionID = req.sessionID;
				console.log('req: ' + req.sessionID);
				user.save(function (err, updatedUser) {
					if (err) return handleError(err);
					console.log(updatedUser);
					return done(null, user);
				});
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
*/
app.get('/', function (req, res) {
	if (requireAuth) {
		if (req.isAuthenticated())
			res.sendFile(path.join(__dirname + '/public/chat.html'));
		else
			res.sendFile(path.join(__dirname + '/public/index.html')); //res.redirect('/login');
	} else {
		res.sendFile(path.join(__dirname + '/public/chat.html'));
	}

});

// Routing
app.use(express.static(path.join(__dirname, 'public')));



var router = express.Router();
app.use('/api', router);

var env = {
	AUTH0_CLIENT_ID: 'xLdhXhO_gp2bCFQ0B5cJTcqJqqpq_hBI',
	AUTH0_DOMAIN: 'chat-demo-app.eu.auth0.com',
	AUTH0_CALLBACK_URL: callbackURL
};

/*router.route('/login').post(function (req, res, next) {
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
});*/

var webAuth = new auth0.WebAuth({
	domain: env.AUTH0_DOMAIN,
	clientID: env.AUTH0_CLIENT_ID,
	redirectUri: env.AUTH0_CALLBACK_URL,
	audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
	responseType: "token id_token code",
	scope: "openid profile email"
});

/*app.route('/login').get(passport.authenticate('auth0', {
	clientID: env.AUTH0_CLIENT_ID,
	domain: env.AUTH0_DOMAIN,
	redirectUri: env.AUTH0_CALLBACK_URL,
	audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
	responseType: 'code',
	scope: 'openid profile email'
}), function (req, res) {
	//res.sendFile(path.join(__dirname + '/public/login.html'));
	res.redirect('/');
});*/

router.get(
	'/callback', //passport.authenticate('auth0', {failureRedirect: '/'}),
	function (req, res) {
		//console.log(req.session.passport.user.id);

		/*userModel.findOne({
			'local.auth_id': req.user.sub
		}, function (err, result) {
			if (err)
				console.log(err);
			//console.log('res: '+result);
			if (result) {
				result.local.name = req.session.passport.user.displayName;
				result.local.picture = req.session.passport.user.picture;
				result.local.sessionID = req.sessionID;
				result.save(function (err) {
					if (err)
						console.log(err);

				});
			} else {
				var newUser = new userModel();
				newUser.local.name = req.session.passport.user.displayName;
				newUser.local.auth_id = req.session.passport.user.id;
				newUser.local.picture = req.session.passport.user.picture;
				newUser.local.sessionID = req.sessionID;

				newUser.save(function (err, result2) {
					if (err)
						console.log(err);
					console.log('new user saved');
					//console.log(result2);
				});
			}
		});*/
		res.redirect(req.session.returnTo || '/');
	}
);

/*router.route('/signup').post(function (req, res, next) {
	passport.authenticate('local_signup', function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.json(info);;
		}
		return res.json({
			message: 'done'
		});*/
/*req.logIn(user, function (err) {
			if (err) {
				return next(err);
			}
			return res.json({
				message: 'done'
			});
		});/*
	})(req, res, next);
});
app.route('/signup').get(function (req, res) {
	res.sendFile(path.join(__dirname + '/public/signup.html'));
});*/

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

function getToken(req) {
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		return req.headers.authorization.split(' ')[1];
	} else if (req.query && req.query.token) {
		return req.query.token;
	}
	return null;
}

router.all('/*', jwtCheck, function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Authorization");

	//console.log(req.user);

	if (getToken(req)) {
		//console.log("token: "+getToken(req));
		/*jwt.verify(getToken(req), cuSecret, {
			audience: 'http://localhost:3000/api',
			issuer: "https://chat-demo-app.eu.auth0.com/",
			algorithms: ['RS256'],
		}, function (err, decoded) {
			if (err)
				console.log(err);
			console.log(decoded);
		});*/
		jwtCheck(req, res, () => {
			//console.log("done");
		});
	}


	return next();
	/*if (requireAuth) {
		if (req.isAuthenticated())
			console.log("authenticated");
			return next();
		res.json({
			message: 'unauthorized'
		});
	} else {
		return next();
	}*/
});

router.get('/', function (req, res) {
	//res.setHeader("Access-Control-Allow-Origin", "*");
	//res.setHeader("Access-Control-Allow-Headers", "Authorization");
	if (req.user) {
		//console.log(JSON.stringify(req.user, null, '  '));
		userModel.findOne({
			'local.auth_id': req.user.sub
		}, function (err, result) {
			if (err)
				console.log(err);

			//console.log('res: ' + result);
			var userPF = {};
			webAuth.client.userInfo(getToken(req), function (err, profile) {
				if (err)
					console.log(err);
				if (profile) {
					userPF = profile;
					req.user.profile = profile;
					if (result) {
						result.local.name = userPF.name;
						result.local.picture = userPF.picture;
						result.local.sessionID = req.sessionID;
						result.save(function (err) {
							if (err)
								console.log(err);

						});
					} else {
						var newUser = new userModel();
						newUser.local.name = userPF.name;
						newUser.local.auth_id = userPF.sub;
						newUser.local.picture = userPF.picture;
						newUser.local.sessionID = req.sessionID;

						newUser.save(function (err, result2) {
							if (err)
								console.log(err);
							console.log('new user saved');
							//console.log(result2);
						});
					}
				} else {
					console.log("error");
				}
				//console.log(profile);
			});
		});
	}
	res.json({
		message: 'api'
	});
});

//router.all('/api/*', requireAuthentication);

// on routes that end in /convs
router.route('/convs').post(function (req, res) {
	var newConversation = new conversationModel();

	newConversation.name = req.body.name;

	newConversation.save(function (err, result) {
		if (err)
			res.send(err);
		//console.log(result._id);
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

	var temp = {};
	if (requireAuth) {
		/*temp = {
			name: req.session.passport.user.displayName, //req.user.local.name,
			_id: req.session.passport.user.id,
			picture: req.session.passport.user.picture
		}*/
		userModel.findOne({
			"local.auth_id": req.user.sub
		}, (err, result) => {
			if (err)
				console.log(err);
			if (result) {
				temp = {
					name: result.local.name, //req.user.local.name,
					_id: result.local.auth_id,
					picture: result.local.picture
				}
				res.json({
					message: 'done',
					data: temp
				});
			} else {
				res.json({
					message: 'error',
					data: null
				});
			}
		});
	} else {
		temp = {
			name: "Saman Asady :|",
			_id: "google-oauth2|116452869023753433087",
			picture: "https://lh3.googleusercontent.com/-ikUEdC7uVck/AAAAAAAAAAI/AAAAAAAABK0/GOgt-AJQdoY/photo.jpg"
		}
		res.json({
			message: 'done',
			data: temp
		});
	}

});

router.route('/users').get(function (req, res) {
	userModel.find().select('local.name local.online local.picture local.auth_id').exec(function (err, result) {
		if (err)
			console.log(err);

		var temp = [];

		result.forEach((user) => {
			temp.push({
				name: user.local.name,
				_id: user.local.auth_id,
				online: user.local.online,
				picture: user.local.picture
			});
		});

		res.json({
			message: 'done',
			data: temp
		});
	});
});

// on routes that end in /users/:user_id
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

router.route('/userdata').post(function (req, res) {
	//console.log(req.body.users[0]);
	//var temp = JSON.parse(req.body.users);
	//console.log(temp[0]);

	var temp = req.body.users;

	for (var i = 0; i < temp.length; i++) {
		//temp[i] = mongoose.Types.ObjectId(temp[i]);
	}

	userModel.find({
		'local.auth_id': {
			$in: temp
		}
	}).select('local.auth_id local.name local.online local.picture').exec(function (err, result) {
		if (err)
			console.log(err);

		//console.log(result);

		res.json({
			message: 'done',
			data: result
		});
	});

});

// on routes that end in /msgs
router.route('/msgs').post(function (req, res) {
	var newMsg = new messageModel();

	console.log(req.body);

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

		if (requireAuth)
			newMsg.from = req.user.sub;
		else
			newMsg.from = "google-oauth2|116452869023753433087";

		newMsg.save(function (err) {
			if (err)
				console.log(err);
			io.to(newMsg.conversationID).emit('refresh chat', {
				'convID': newMsg.conversationID
			});
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
		conversationModel.findById(req.params.conv_id, function (err, result2) {
			if (err)
				console.log(err);
			//console.log('res2: '+result2);
			if (result2) {
				//console.log(result2.members.indexOf(req.user.id));
				//console.log(result2.members);
				//console.log(req.user.id);

				if (requireAuth) {
					//console.log("pf: ");
					//console.log(req.user.profile);
					if (result2.members.indexOf(req.user.sub) < 0) {
						result2.members.push(req.user.sub);
						result2.save(function (err) {
							if (err)
								res.send(err);
							var temp = [];
							var tmp_queue = 0;
							result.forEach(function (elem) {
								temp.push(elem.queueNumber);
							});
							if (temp.length < 1) {
								tmp_queue = 0;
							} else {
								tmp_queue = math.max(temp) + 1;
								//console.log(newMsg.queueNumber);
							}

							userModel.findOne({
								"local.auth_id": req.user.sub
							}, (err, result4) => {
								if (err)
									console.log(err);
								if (result4) {
									messageModel.create({
										msgType: 'notification',
										text: result4.local.name + ' joined',
										conversationID: req.params.conv_id,
										queueNumber: tmp_queue
									}, function (err, result3) {
										if (err) return handleError(err);
										// saved!
										//console.log(result3);
										result.push(result3);
										//console.log(result);
										io.to(req.params.conv_id).emit('refresh chat', {
											'convID': req.params.conv_id
										});
										res.json({
											message: 'done',
											data: result
										});
									});
								}
							});
						});
					} else {
						res.json({
							message: 'done',
							data: result
						});
					}
				} else {
					/*io.to(req.params.conv_id).emit('refresh chat', {
						'convID': req.params.conv_id
					});*/
					res.json({
						message: 'done',
						data: result
					});
				}
			} else {
				res.json({
					message: 'done',
					data: null
				});
			}
		});
	});
});

router.route('/conv_users/:conv_id').get(function (req, res) {
	conversationModel.findById(req.params.conv_id, function (err, result) {
		res.json({
			message: 'done',
			data: result.members
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

var users = [];
var sockets = {};

function logUsers() {
	console.log(numUsers + " online");
	console.log(users);
}

/*io.set('authorization', function (data, accept) {
	// check if there's a cookie header
	console.log(data);
	if (data.headers.cookie) {
		//console.log('cookie: ' + data.headers.cookie);
		// if there is, parse the cookie
		data.cookie = cookie.parse(data.headers.cookie);
		// note that you will need to use the same key to grad the
		// session id, as you specified in the Express setup.
		//console.log(data.cookie['connect.sid']);
		//console.log(data.cookie['connect.sid'].match(/(?!\:)[A-Za-z0-9_-]+(?=\.)/g));
		data.headers.sessionID = data.cookie['connect.sid'].match(/(?!\:)[A-Za-z0-9_-]+(?=\.)/g)[0];
		//console.log('session: ' + data.headers.sessionID);
		//console.log(data);
	} else {
		// if there isn't, turn down the connection with a message
		// and leave the function.
		return accept('No cookie transmitted.', false);
	}
	// accept the incoming connection
	accept(null, true);
});*/

/*io.use(socketioJwt.authorize({
  secret: 'your secret or public key',
  handshake: true
}));*/

/*
io.use((socket, next) => {


	return next();
	//return next(new Error('authentication error'));
});

io.on('connection', function (socket) {
	socket.joinedRoom = '';
	console.log("user joined.");

	//console.log(socket.handshake.query.token);
	var decodedToken = jwt.decode(socket.handshake.query.token, {
		complete: true
	});
	//console.log(decodedToken);

	if (decodedToken) {
		if (decodedToken.header.alg !== 'RS256') {
			return next(new Error('algorithm error'));
		}

		userModel.findOne({
			'local.auth_id': decodedToken.payload.sub
		}, function (err, user) {
			if (err)
				return done(err);
			if (user) {
				user.local.online = true;
				user.save(function (err) {
					io.emit('refresh chat');
				});
			}

		});
	}

	socket.emit('login');

	socket.on('typing', function () {

	});

	socket.on('join room', function (data) {
		//console.log('join room: '+data.chatID);
		socket.join(data.chatID);
		socket.joinedRoom = data.chatID;
	});

	socket.on('disconnect', function () {
		userModel.findOne({
			'local.auth_id': decodedToken.payload.sub
		}, function (err, user) {
			if (err)
				return done(err);
			if (user) {
				user.local.online = false;
				user.save(function (err) {
					io.emit('refresh chat');
				});
			}

		});
	});
});*/
