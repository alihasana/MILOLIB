/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import Login from "@/modules/auth/Login";
import dashboard from "@/modules/dashboard/dashboard";
import Users from "@/modules/users/Users";
import UserList from "@/modules/users/components/UserList";
import UserDetail from "@/modules/users/components/UserDetail";
import CreateUser from "@/modules/users/components/CreateUser"; 
import ProfileDetails from "@/modules/profileUser/components/ProfileDetails";
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
			path: "/users",
			name: "users",
			component: Users,
			children: [
				{
					path: "/list",
					name: "userList",
					component: UserList
				},
				{
					path: ":id",
					name: "userDetail",
					component: UserDetail
				}, 
				{
					path: "/create-user",
					name: "createUser",
					component: CreateUser
				}
			]
		},
		{
			path: "/profile-details",
			name: "profileDetails",
			component: ProfileDetails
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
