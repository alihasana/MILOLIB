/* eslint-disable */
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import http from './helpers/http'
import swal from "sweetalert2"
import { store } from './store/store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/sass/main.scss'
import 'material-design-icons/iconfont/material-icons.css'

Vue.config.productionTip = false;

Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	store,
	components: { App },
	template: "<App/>"
});

