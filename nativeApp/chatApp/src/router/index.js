import Vue from "vue";
import Router from "vue-router";
//import HelloWorld from "@/components/HelloWorld";
//import sideBar from '@/components/sideBar'
import Callback from "@/components/Callback";

Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
		{
			path: "/callback",
			name: "Callback",
			component: Callback,
		},
	],
});
