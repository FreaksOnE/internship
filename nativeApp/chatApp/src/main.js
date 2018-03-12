// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

Vue.use(Vuex)

Vue.config.productionTip = false

//import './assets/style.css'

const store = new Vuex.Store({
	state: {
		msgs: [],
		selectedMsgsCount: 0,
		users: [],
		userData: [],
		onlineUsers: [],
		offlineUsers: [],
		convs: [],
		userDetail: {
			name: "",
			id: ""
		},
		showNewChatModal: false,
		startApp: true,
		preLoad: false,
		loaded: 0,
		openedChat: "",
		userOptions: false,
		showProfile: false,
		profileID: "",
		hideChat: false,
	},
	mutations: {
		ADD_TODO: (state, payload) => {
			var newTask = {
				id: payload.newId,
				task: payload.task,
				completed: false
			}
			state.todos.unshift(newTask);
		},
		TOGGLE_TODO: (state, payload) => {
			var item = state.todos.find(todo => todo.id === payload);
			item.completed = !item.completed;
		},
		DELETE_TODO: (state, payload) => {
			var index = state.todos.findIndex(todo => todo.id === payload);
			state.todos.splice(index, 1);
		}
	},
	getters: {
		getTodos: state => state.todos,
	},
	actions: {
		addTodo: (context, payload) => {
			context.commit("ADD_TODO", payload)
		},
		toggleTodo: (context, payload) => {
			context.commit("TOGGLE_TODO", payload)
		},
		deleteTodo: (context, payload) => {
			context.commit("DELETE_TODO", payload)
		},
	},
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App,
	},
	template: '<App/>',
	store: store,
})
