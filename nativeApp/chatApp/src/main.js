// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuex from "vuex";
import App from "./App";
import router from "./router";
import axios from "axios";

const serverAddress = "http://localhost:3000/";

Vue.use(Vuex);

Vue.config.productionTip = false;

//import './assets/style.css'

const store = new Vuex.Store({
	state: {
		showMenu: false,
		selectedMsgsCount: 0,
		showUserOptions: false,
		showProfile: false,
		openedChat: "",
		servers: [
			{
				"members": [],
				"_id": "5aa28c735bbed02703410dc8",
				"name": "chat1",
				"notifications": 4
			},
			{
				"members": [],
				"_id": "5aa28c735bbed02703410dc9",
				"name": "chat2",
				"notifications": 1
			},
			
		],
		msgs: [
			{
				"_id": "5aa28csdf735bb",
				"msgType": "notification",
				"conversationID": "fijoiajfoiahfoafjpafk",
				"date": "2018-03-11T08:44:18.716Z",
				"text": "chat created",
				"queueNumber": 0,
				"selected": false,
			},
			{
				"_id": "5aa28c735bb",
				"msgType": "message",
				"from": "fasdrtwekrjieoewjroiqq",
				"conversationID": "fijoiajfoiahfoafjpafk",
				"date": "2018-03-11T08:44:18.716Z",
				"text": "lorem ipsum",
				"queueNumber": 1,
				"selected": false,
			},
			{
				"_id": "5aa28c73234235bb",
				"msgType": "message",
				"from": "fasdrtwekrjieoewjroiqq",
				"conversationID": "fijoiajfoiahfoafjpafk",
				"date": "2018-03-11T08:44:18.716Z",
				"text": "lorem ipsum",
				"queueNumber": 2,
				"selected": false,
			},
			{
				"_id": "5aa28c7werwe35bb",
				"msgType": "message",
				"from": "fasdrtwekrjieoewjroiqq",
				"conversationID": "fijoiajfoiahfoafjpafk",
				"date": "2018-03-11T08:44:18.716Z",
				"text": "lorem ipsum",
				"queueNumber": 3,
				"selected": false,
			},
			{
				"_id": "5aa28c7sdf354b",
				"msgType": "message",
				"from": "sejkfhu3y78rtq87r782",
				"conversationID": "fijoiajfoiahfoafjpafk",
				"date": "2018-03-11T08:44:18.716Z",
				"text": "lorem ipsum",
				"queueNumber": 4,
				"selected": false,
			},
			{
				"_id": "5aa28c7wewrerwe35bb",
				"msgType": "message",
				"from": "fasdrtwekrjieoewjroiqq",
				"conversationID": "fijoiajfoiahfoafjpafk",
				"date": "2018-03-11T08:44:18.716Z",
				"text": "lorem ipsum",
				"queueNumber": 5,
				"selected": false,
			},
			
		],
		usersData: [
			{
				"_id": "sejkfhu3y78rtq87r782",
				"name": "user1",
				"online": false,
				"picture": "test.png"
			},
			{
				"_id": "fasdrtwekrjieoewjroiqq",
				"name": "user2",
				"online": false,
				"picture": "test.png"
			},
		],
		userDetails: {
			"_id": "sejkfhu3y78rtq87r782",
			"username": "user1",
			"picture": "test.png"
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

	},
	mutations: {
		ADD_TODO: (state, payload) => {
			var newTask = {
				id: payload.newId,
				task: payload.task,
				completed: false
			};
			state.todos.unshift(newTask);
		},
		TOGGLE_MENU: (state) => {
			state.showMenu = !state.showMenu;
		},
		TOGGLE_USER_OPTIONS: (state) => {
			state.showUserOptions = !state.showUserOptions;
		},
		TOGGLE_SHOW_PROFILE: (state) => {
			state.showProfile = !state.showProfile;
		},
		TOGGLE_SELECT_MSG: (state, payload) => {
			var item = state.msgs.find(msg => msg._id === payload);
			item.selected = !item.selected;
			if(item.selected){
				state.selectedMsgsCount++;
			} else {
				state.selectedMsgsCount--;
			}
		},
		DESELECT_ALL_MSGS: (state) => {
			state.msgs.forEach(msg => msg.selected = false);
			state.selectedMsgsCount = 0;
		},
		FETCH_SERVERS: (state, payload) => {
			state.servers = payload;
		},
		GET_USER: (state, payload) => {
			state.userDetails._id = payload._id;
			state.userDetails.username = payload.username;
			state.userDetails.picture = payload.picture;
		},
		SET_OPENED_CHAT: (state, payload) => {
			state.openedChat = payload;
		},
	},
	actions: {
		toggleMenu: (context) => {
			context.commit("DESELECT_ALL_MSGS");
			context.commit("TOGGLE_MENU");
		},
		toggleUserOptions: (context) => {
			context.commit("TOGGLE_USER_OPTIONS");
		},
		toggleShowProfile: (context) => {
			context.commit("DESELECT_ALL_MSGS");
			context.commit("TOGGLE_SHOW_PROFILE");
		},
		toggleSelectMsg: (context, payload) => {
			context.commit("TOGGLE_SELECT_MSG", payload);
		},
		deselectAllMsgs: (context) => {
			context.commit("DESELECT_ALL_MSGS");
		},
		fetchServers(context) {
			return new Promise((resolve, reject) => {
				axios.get(serverAddress+"api/convs")
					.then(function (response) {
						//console.log(response);
						if(response.data.message == "done"){
							context.commit("FETCH_SERVERS", response.data.data);
							resolve();						
						} else {
							reject("error");
						}
					}).catch(function (error) {
						reject(error);
					});
			});
		},
		getUser(context) {
			return new Promise((resolve, reject) => {
				axios.get(serverAddress+"api/user")
					.then(function (response) {
						//console.log(response);
						if(response.data.message == "done"){
							context.commit("GET_USER", response.data.data);
							resolve();						
						} else {
							reject("error");
						}
					}).catch(function (error) {
						reject(error);
					});
			});
		},
		openChat: function(context, payload) {
			store.dispatch("getUser");

			var temp = store.getters.getServers.find(server => server._id === payload);

			temp.notifications = 0;

			context.commit("SET_OPENED_CHAT", payload);
			/*context.fetchMessages(payload, function() {
				context.fetchUsernames(function() {
					context.chatScrollBottom(true);
				});
			});*/
		},
	},
});

/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	components: {
		App,
	},
	template: "<App/>",
	store: store,
});
