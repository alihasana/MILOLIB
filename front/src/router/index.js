/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import Login from "@/modules/auth/Login";
import dashboard from "@/modules/dashboard/dashboard";
import listUser from "@/modules/listUser/listUser";
import profileUser from "@/modules/profileUser/profileUser";
import calendar from "@/modules/calendar/calendar";
import example from "@/sharedComponents/example";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "login",
			component: Login
		},
		{
			path: "/dashboard",
			name: "dashboard",
			component: dashboard
		},
		{
			path: "/listUser",
			name: "listUser",
			component: listUser
		},
		{
			path: "/profileUser",
			name: "profileUser",
			component: profileUser
		},
		{
			path: "/calendar",
			name: "calendar",
			component: calendar
		},
		{
			path: "/example",
			name: "example",
			component: example
		}
	]
});
