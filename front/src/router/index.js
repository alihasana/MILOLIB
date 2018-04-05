/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import Login from "@/modules/auth/Login";
import dashboard from "@/modules/dashboard/dashboard";
import Users from "@/modules/users/Users";
import UserList from "@/modules/users/components/UserList";
import UserDetail from "@/modules/users/components/UserDetail";
import profileUser from "@/modules/profileUser/profileUser";
import calendar from "@/modules/calendar/calendar";
import example from "@/sharedComponents/example";
import Header from "@/sharedComponents/Header";

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
			path: "/users",
			name: "users",
			components: {
				default: Users,
				header: Header
			},
			children: [
				{
					path: "",
					name: "userList",
					component: UserList
				},
				{
					path: ":id",
					name: "userDetail",
					component: UserDetail
				}
			]
		},
		{
			path: "/profileUser",
			name: "profileUser",
			components: {
				default: profileUser,
				header: Header
			},
		},
		{
			path: "/calendar",
			name: "calendar",
			components: {
				default: calendar,
				header: Header
			},
		},
		{
			path: "/example",
			name: "example",
			components: {
				default: example,
				header: Header
			}
		}
	]
});