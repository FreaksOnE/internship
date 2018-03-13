// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuex from "vuex";
import App from "./App";
import router from "./router";

Vue.use(Vuex);

Vue.config.productionTip = false;

//import './assets/style.css'

const store = new Vuex.Store({
	state: {
		showMenu: false,
		selectedMsgsCount: 0,
		showUserOptions: false,
		servers: [
			{
				"members": [],
				"id": "5aa28c735bbed02703410dc8",
				"name": "chat1",
				"notifications": 4
			},
			{
				"members": [],
				"id": "5aa28c735bbed02703410dc9",
				"name": "chat2",
				"notifications": 1
			},
			
		],
		msgs: [
			{
				"id": "5aa28c735bb",
				"msgType": "message",
				"from": "fasdrtwekrjioewjroiqq",
				"conversationID": "fijoiajfoiahfoafjpafk",
				"date": "12:10",
				"text": "lorem ipsum",
				"queueNumber": 1,
				"selected": false,
			},
			{
				"id": "5aa28c7354b",
				"msgType": "message",
				"from": "fasdrtwekrjioewjroiqq",
				"conversationID": "fijoiajfoiahfoafjpafk",
				"date": "12:10",
				"text": "lorem ipsum",
				"queueNumber": 2,
				"selected": false,
			},
			
		],
		userData: [
			{
				"id": "afihiauwhf73qyrhq38u",
				"name": "user1",
				"online": false,
				"picture": ""
			},
			{
				"id": "sefj38u89eyf3r7wyr3e",
				"name": "user2",
				"online": false,
				"picture": ""
			},
		]

	},
	getters: {
		getServers: state => state.servers,
		getMsgs: state => state.msgs,
		getUsers: state => state.userData,
		getShowMenu: state => state.showMenu,
		getSelectedMsgsCount: state => state.selectedMsgsCount,
		getShowUserOptions: state => state.showUserOptions,
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
		
	},
	actions: {
		toggleMenu: (context) => {
			context.commit("TOGGLE_MENU");
		},
		toggleUserOptions: (context) => {
			context.commit("TOGGLE_USER_OPTIONS");
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
