// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuex from "vuex";
import App from "./App";
import router from "./router";
import axios from "axios";

import qs from "qs";

const serverAddress = "http://localhost:3000/";

Vue.use(Vuex);

Vue.config.productionTip = false;

//import './assets/style.css'

const store = new Vuex.Store({
	state: {
		showMenu: true,
		selectedMsgsCount: 0,
		showUserOptions: false,
		showProfile: false,
		openedChat: "",
		servers: [
			{
				"members": [],
				"_id": "5aa28c735bbed02703410dc8",
				"name": "chat1",
				"notifications": 4,
			},
			{
				"members": [],
				"_id": "5aa28c735bbed02703410dc9",
				"name": "chat2",
				"notifications": 1,
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
				"picture": "test.png",
			},
			{
				"_id": "fasdrtwekrjieoewjroiqq",
				"name": "user2",
				"online": false,
				"picture": "test.png",
			},
		],
		userDetails: {
			"_id": "sejkfhu3y78rtq87r782",
			"name": "user1",
			"picture": "test.png",
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
			getters.getServerByID(state.openedChat).members.forEach((member) => {
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
		
	},
	mutations: {
		ADD_TODO: (state, payload) => {
			var newTask = {
				id: payload.newId,
				task: payload.task,
				completed: false,
			};
			state.todos.unshift(newTask);
		},
		TOGGLE_MENU: (state, payload) => {
			if(payload)
				state.showMenu = true;
			else
				state.showMenu = false;
		},
		TOGGLE_USER_OPTIONS: (state) => {
			state.showUserOptions = !state.showUserOptions;
		},
		TOGGLE_SHOW_PROFILE: (state, payload) => {
			if(payload)
				state.showProfile = true;
			else
				state.showProfile = false;
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
	},
	actions: {
		toggleMenu: (context, payload) => {
			context.commit("DESELECT_ALL_MSGS");
			context.commit("TOGGLE_MENU", payload);
		},
		toggleUserOptions: (context) => {
			context.commit("TOGGLE_USER_OPTIONS");
		},
		toggleShowProfile: (context, payload) => {
			context.commit("DESELECT_ALL_MSGS");
			context.commit("TOGGLE_SHOW_PROFILE", payload);
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
							response.data.data.picture = decodeURIComponent(response.data.data.picture.replace(/^https.*?(?=https)/gi, ""));
							response.data.data.picture = decodeURIComponent(response.data.data.picture.replace(/lh4\.google/, "lh3.google"));	
							console.log(response.data.data);
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
			store.dispatch("getUser").then(() => {
				var temp = store.getters.getServers.find(server => server._id === payload);

				temp.notifications = 0;
	
				context.commit("SET_OPENED_CHAT", payload);
				
				store.dispatch("fetchMsgs", payload).then(() => {
					store.dispatch("fetchUsers").then(() => {

						this.dispatch("toggleMenu", false);
					}, error => {
						console.log(error);
					});		
				}, error => {
					console.log(error);
				});		
			}, error => {
				console.log(error);
			});		
		},
		fetchMsgs: (context, payload) => {
			return new Promise((resolve, reject) => {
				axios.get(serverAddress+"api/msgs/"+payload)
					.then(function (response) {
						if(response.data.message == "done"){
							context.commit("FETCH_MSGS", response.data.data);
							resolve();						
						} else {
							reject("error");
						}
					}).catch(function (error) {
						reject(error);
					});
			});
		},
		fetchUsers: (context) => {
			return new Promise((resolve, reject) => {
				axios.get(serverAddress+"api/users")
					.then(function (response) {
						if(response.data.message == "done"){
							response.data.data.forEach((user) => {
								user.picture = decodeURIComponent(user.picture.replace(/^https.*?(?=https)/gi, ""));
								user.picture = decodeURIComponent(user.picture.replace(/lh4\.google/, "lh3.google"));								
							});
							context.commit("FETCH_USERS", response.data.data);
							resolve();						
						} else {
							reject("error");
						}
					}).catch(function (error) {
						reject(error);
					});
			});
		},
		sendMessage: (context, payload) => {
			console.log(payload);

			return new Promise((resolve, reject) => {
				axios.post(serverAddress+"api/msgs/",  qs.stringify(payload))
					.then(function (response) {
						console.log(response);
						if(response.data.message == "done"){
							store.dispatch("fetchMsgs", store.getters.getOpenedChat);
							resolve();						
						} else {
							reject("error");
						}
					}).catch(function (error) {
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
	template: "<App/>",
	store: store,
	mounted: function(){
		store.dispatch("fetchServers");
		store.dispatch("getUser");
	},
});
vm;
