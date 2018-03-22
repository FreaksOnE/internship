// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuex from "vuex";
import App from "./App";
import router from "./router";
import axios from "axios";

var serverAddress  = process.env.API_ADDR;

import io from "socket.io-client";
var socket = io.connect(serverAddress, {
	"query": "token=" + localStorage.getItem("access_token"),
});

import qs from "qs";
//import Auth0Lock from "auth0-lock";

import AuthService from "./auth/AuthService";

const auth = new AuthService();

const { login, logout, } = auth;


import Vuebar from "vuebar";
Vue.use(Vuebar);

Vue.use(Vuex);

Vue.config.productionTip = false;

//import './assets/style.css'

/*var lock = new Auth0Lock(
	"xLdhXhO_gp2bCFQ0B5cJTcqJqqpq_hBI",
	"chat-demo-app.eu.auth0.com", {
		auth: {
			redirectUrl: "http://localhost:8080/#/",
			responseType: "token",
			autoParseHash: true,
			redirect: true,
			//responseMode: "form_post",
			sso: true,
			audience: "http://localhost:3000/api",
			params: {
				scope: "openid profile email",
			},
		},
	}
);*/

// Listening for the authenticated event
/*lock.on("authenticated", function(authResult) {
	// Use the token in authResult to getUserInfo() and save it to localStorage
	lock.getUserInfo(authResult.accessToken, function(error, profile) {
		if (error) {
			// Handle error
			console.log(error);
			return;
		}
		//console.log(profile);
		//console.log(authResult);
		//document.getElementById("nick").textContent = profile.nickname;

		localStorage.setItem("accessToken", authResult.accessToken);
		localStorage.setItem("profile", JSON.stringify(profile));
		console.log("logged in");
		store.dispatch("toggleLoggedIn", true);
	});
});*/

const store = new Vuex.Store({
	state: {
		preLoad: true,
		showMenu: false,
		selectedMsgsCount: 0,
		showUserOptions: false,
		showProfile: false,
		openedChat: "",
		hideChat: true,
		showNewServerModal: false,
		servers: [
			{
				members: [],
				_id: "5aa28c735bbed02703410dc8",
				name: "chat1",
				notifications: 4,
			},
			{
				members: [],
				_id: "5aa28c735bbed02703410dc9",
				name: "chat2",
				notifications: 1,
			},
		],
		msgs: [
			{
				_id: "5aa28csdf735bb",
				msgType: "notification",
				conversationID: "fijoiajfoiahfoafjpafk",
				date: "2018-03-11T08:44:18.716Z",
				text: "chat created",
				queueNumber: 0,
				selected: false,
			},
			{
				_id: "5aa28c735bb",
				msgType: "message",
				from: "fasdrtwekrjieoewjroiqq",
				conversationID: "fijoiajfoiahfoafjpafk",
				date: "2018-03-11T08:44:18.716Z",
				text: "lorem ipsum",
				queueNumber: 1,
				selected: false,
			},
			{
				_id: "5aa28c73234235bb",
				msgType: "message",
				from: "fasdrtwekrjieoewjroiqq",
				conversationID: "fijoiajfoiahfoafjpafk",
				date: "2018-03-11T08:44:18.716Z",
				text: "lorem ipsum",
				queueNumber: 2,
				selected: false,
			},
			{
				_id: "5aa28c7werwe35bb",
				msgType: "message",
				from: "fasdrtwekrjieoewjroiqq",
				conversationID: "fijoiajfoiahfoafjpafk",
				date: "2018-03-11T08:44:18.716Z",
				text: "lorem ipsum",
				queueNumber: 3,
				selected: false,
			},
			{
				_id: "5aa28c7sdf354b",
				msgType: "message",
				from: "sejkfhu3y78rtq87r782",
				conversationID: "fijoiajfoiahfoafjpafk",
				date: "2018-03-11T08:44:18.716Z",
				text: "lorem ipsum",
				queueNumber: 4,
				selected: false,
			},
			{
				_id: "5aa28c7wewrerwe35bb",
				msgType: "message",
				from: "fasdrtwekrjieoewjroiqq",
				conversationID: "fijoiajfoiahfoafjpafk",
				date: "2018-03-11T08:44:18.716Z",
				text: "lorem ipsum",
				queueNumber: 5,
				selected: false,
			},
		],
		usersData: [
			{
				_id: "sejkfhu3y78rtq87r782",
				name: "user1",
				online: false,
				picture: "test.png",
			},
			{
				_id: "fasdrtwekrjieoewjroiqq",
				name: "user2",
				online: false,
				picture: "test.png",
			},
		],
		userDetails: {
			_id: "sejkfhu3y78rtq87r782",
			name: "user1",
			picture: "test.png",
		},
	},
	getters: {
		getServers: state => state.servers,
		getMsgs: state => state.msgs,
		getUsers: state => state.usersData,
		getShowMenu: state => state.showMenu,
		getSelectedMsgsCount: state => state.selectedMsgsCount,
		getShowUserOptions: state => state.showUserOptions,
		getShowProfile: state => state.showProfile,
		getUserDetails: state => state.userDetails,
		getOpenedChat: state => state.openedChat,
		getServerByID: state => serverID => {
			return state.servers.find(server => server._id === serverID);
		},
		getServerMembers: (state, getters) => {
			return getters.getServerByID(state.openedChat).members;
		},
		getUserByID: state => userID => {
			return state.usersData.find(user => user._id === userID);
		},
		getMembersObj: (state, getters) => {
			var temp = [];
			getters.getServerByID(state.openedChat).members.forEach(member => {
				temp.push(getters.getUserByID(member));
			});
			return temp;
		},
		getOnlineMembers: (state, getters) => {
			return getters.getMembersObj.filter(member => member.online);
		},
		getOfflineMembers: (state, getters) => {
			return getters.getMembersObj.filter(member => !member.online);
		},
		getHeaders: () => {
			if (localStorage.getItem("access_token"))
				return {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token"),
					},
				};
			else store.dispatch("doLogin");
		},
		getPreLoad: state => state.preLoad,
		getHideChat: state => state.hideChat,
		getShowNewServerModal: state => state.showNewServerModal,
	},
	mutations: {
		TOGGLE_MENU: (state, payload) => {
			if (payload) state.showMenu = true;
			else state.showMenu = false;
		},
		TOGGLE_PRELOAD: (state, payload) => {
			if (payload) state.preLoad = true;
			else state.preLoad = false;
		},
		TOGGLE_USER_OPTIONS: state => {
			state.showUserOptions = !state.showUserOptions;
		},
		TOGGLE_SHOW_PROFILE: state => {
			state.showProfile = !state.showProfile;
		},
		HIDE_PROFILE: (state, payload) => {
			if (payload) state.showProfile = false;
			else state.showProfile = true;
		},
		TOGGLE_SELECT_MSG: (state, payload) => {
			var item = state.msgs.find(msg => msg._id === payload);
			item.selected = !item.selected;
			if (item.selected) {
				state.selectedMsgsCount++;
			} else {
				state.selectedMsgsCount--;
			}
		},
		DESELECT_ALL_MSGS: state => {
			state.msgs.forEach(msg => (msg.selected = false));
			state.selectedMsgsCount = 0;
		},
		FETCH_SERVERS: (state, payload) => {
			state.servers = payload;
		},
		GET_USER: (state, payload) => {
			state.userDetails._id = payload._id;
			state.userDetails.name = payload.name;
			state.userDetails.picture = payload.picture;
		},
		SET_OPENED_CHAT: (state, payload) => {
			state.openedChat = payload;
		},
		FETCH_MSGS: (state, payload) => {
			state.msgs = payload;
		},
		FETCH_USERS: (state, payload) => {
			state.usersData = payload;
		},
		TOGGLE_HIDE_CHAT: (state, payload) => {
			state.hideChat = payload;
		},
		TOGGLE_SHOW_NEW_SERVER_MODAL: (state) => {
			state.showNewServerModal = !state.showNewServerModal;
		},
	},
	actions: {
		toggleMenu: (context, payload) => {
			context.commit("DESELECT_ALL_MSGS");
			context.commit("TOGGLE_MENU", payload);
			//vm.login();
		},
		toggleLoggedIn: (context, payload) => {
			context.commit("TOGGLE_LOGGEDIN", payload);
		},
		toggleHideChat: (context, payload) => {
			context.commit("TOGGLE_HIDE_CHAT", payload);
		},
		togglePreLoad: (context, payload) => {
			context.commit("TOGGLE_MENU", !payload);
			context.commit("TOGGLE_PRELOAD", payload);
		},
		toggleUserOptions: context => {
			context.commit("TOGGLE_USER_OPTIONS");
		},
		toggleShowNewServerModal: context => {
			context.commit("TOGGLE_SHOW_NEW_SERVER_MODAL");
		},
		toggleShowProfile: context => {
			context.commit("DESELECT_ALL_MSGS");
			context.commit("TOGGLE_SHOW_PROFILE");
		},
		hideProfile: (context, payload) => {
			context.commit("DESELECT_ALL_MSGS");
			context.commit("HIDE_PROFILE", payload);
		},
		toggleSelectMsg: (context, payload) => {
			context.commit("TOGGLE_SELECT_MSG", payload);
		},
		deselectAllMsgs: context => {
			context.commit("DESELECT_ALL_MSGS");
		},
		fetchServers(context) {
			return new Promise((resolve, reject) => {
				console.log(serverAddress + "api/convs");
				axios
					.get(serverAddress + "api/convs", store.getters.getHeaders)
					.then((response) => {
						//console.log(response);
						if (response.data.message == "done") {
							context.commit("FETCH_SERVERS", response.data.data);
							resolve();
						} else {
							reject("error");
							//store.dispatch("doLogin");
						}
					})
					.catch((error) => {
						reject(error);
						//store.dispatch("doLogin");
					});
			});
		},
		getUser(context) {
			return new Promise((resolve, reject) => {
				console.log(serverAddress + "api/user");
				axios
					.get(serverAddress + "api/user", store.getters.getHeaders)
					.then((response) => {
						//console.log(response);
						if (response.data.message == "done") {
							response.data.data.picture = decodeURIComponent(
								response.data.data.picture.replace(/^https.*?(?=https)/gi, "")
							);
							response.data.data.picture = decodeURIComponent(
								response.data.data.picture.replace(/lh4\.google/, "lh3.google")
							);
							context.commit("GET_USER", response.data.data);
							resolve();
						} else {
							reject("error");
							//store.dispatch("doLogin");
						}
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		openChat: function(context, payload) {
			if(payload != store.getters.getOpenedChat || store.getters.getShowMenu){
				store.dispatch("toggleHideChat", true);
				var temp = store.getters.getServers.find(
					server => server._id === payload
				);

				temp.notifications = 0;

				context.commit("SET_OPENED_CHAT", payload);

				

				store.dispatch("fetchMsgs", payload).then(() => {
					store.dispatch("fetchServers").then(() => {
						store.dispatch("fetchUsers").then(() => {
						//setTimeout(() => {
							this.dispatch("toggleHideChat", false);
							this.dispatch("toggleMenu", false);
						//},300);
						},	error => {
							console.log(error);
						});
					});
				},
				error => {
					console.log(error);
				});
			}
		},
		fetchMsgs: (context, payload) => {
			return new Promise((resolve, reject) => {
				console.log(serverAddress + "api/msgs/");
				axios
					.get(serverAddress + "api/msgs/" + payload, store.getters.getHeaders)
					.then((response) => {
						if (response.data.message == "done") {
							context.commit("FETCH_MSGS", response.data.data);
							resolve();
						} else {
							reject("error");
							//store.dispatch("doLogin");
						}
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		fetchUsers: context => {
			return new Promise((resolve, reject) => {
				console.log(serverAddress + "api/users");
				axios
					.get(serverAddress + "api/users", store.getters.getHeaders)
					.then((response) => {
						if (response.data.message == "done") {
							response.data.data.forEach(user => {
								user.picture = decodeURIComponent(
									user.picture.replace(/^https.*?(?=https)/gi, "")
								);
								user.picture = decodeURIComponent(
									user.picture.replace(/lh4\.google/, "lh3.google")
								);
							});
							context.commit("FETCH_USERS", response.data.data);
							resolve();
						} else {
							reject("error");
							//store.dispatch("doLogin");
						}
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		sendMessage: (context, payload) => {
			console.log(payload);

			return new Promise((resolve, reject) => {
				console.log("POST " + serverAddress + "api/msgs/");
				axios
					.post(
						serverAddress + "api/msgs/",
						qs.stringify(payload),
						store.getters.getHeaders
					)
					.then((response) => {
						if (response.data.message == "done") {
							store.dispatch("fetchMsgs", store.getters.getOpenedChat);
							resolve();
						} else {
							reject("error");
							//store.dispatch("doLogin");
						}
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		doLogin: () => {
			//window.location.replace(serverAddress+"login");
			//console.log("login");
			vm.login();
			//lock.show();
		},
		doLogout: () => {
			console.log("logout");
			vm.logout();
			store.dispatch("togglePreLoad", true);
			//store.dispatch("toggleLoggedIn", false);
		},
		checkAuth() {
			console.log("check auth");
			return new Promise((resolve, reject) => {
				axios
					.get(serverAddress + "api", store.getters.getHeaders)
					.then((response) => {
						//console.log(response);
						if (response.data.message == "api") {


							store.dispatch("getUser").then(() => {
								store.dispatch("fetchServers").then(() => {
									resolve();
								});
							});
						} else {
							console.log("unauth");
							reject();
							//store.dispatch("toggleLoggedIn", false);
							//store.dispatch("doLogin");
							//this.login();
						}
					})
					.catch(() => {
						//error
						console.log("error");
						reject();
						//store.dispatch("toggleLoggedIn", false);
						//store.dispatch("doLogin");
						//vm.login();
					});
			});
		},
		newServer: (context, payload) => {
			//console.log(payload);

			return new Promise((resolve, reject) => {
				console.log("POST " + serverAddress + "api/convs/");
				axios
					.post(
						serverAddress + "api/convs/",
						qs.stringify(payload),
						store.getters.getHeaders
					)
					.then((response) => {
						if (response.data.message == "done") {
							store.dispatch("fetchServers");
							resolve();
						} else {
							reject("error");
							//store.dispatch("doLogin");
						}
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
	},
});

/* eslint-disable no-new */
var vm = new Vue({
	el: "#app",
	router,
	components: {
		App,
	},
	mounted: function() {
		//store.dispatch("checkAuth");
		//console.log(this.authenticated);
	},
	methods: {
		login,
		logout,
	},
	template: "<App/>",
	store: store,
});


socket.on("connect", () => {
	console.log("socket connected: "+socket.connected);
	socket
		.emit("authenticate", {token: localStorage.getItem("access_token"),}) //send the jwt
		.on("authenticated", () => {
			//do other things
			console.log("auth");
		})
		.on("unauthorized", (msg) => {
			console.log("unauthorized: " + JSON.stringify(msg.data));
			//console.log(localStorage.getItem("access_token"));
			throw new Error(msg.data.type);
		});
});

socket.on("disconnect", () => {
	
});

socket.on("reconnect", () => {
	
});

socket.on("reconnect_error", () => {

});

