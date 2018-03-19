/* eslint-disable */
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App";
import router from "./router";
Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
axios.defaults.headers.post["Content-Type"] =
	"application/x-www-form-urlencoded";

/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	components: { App },
	template: "<App/>"
});
