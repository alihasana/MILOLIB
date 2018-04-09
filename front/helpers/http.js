import axios from "axios"; 

let http = axios.create({
    baseURL: 'http://localhost:1408'
  })

http.interceptors.request.use(config => {
	config.headers.common["Authorization"] = localStorage.getItem("token");
	console.log("Request Interceptor", config);
	return config;
});
 

export default http