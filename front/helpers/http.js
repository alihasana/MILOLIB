import axios from "axios"; 
//Create an axios wrapper to be used in express as an express module
let http = axios.create({
    baseURL: 'http://localhost:1407'
  })

// let http = axios.defaults.baseURL = "";
// axios.defaults.headers.post["Content-Type"] =
// 	"application/x-www-form-urlencoded";

//Get token in local storage 
http.interceptors.request.use(config => {
	config.headers.common["Authorization"] = localStorage.getItem("token");
	console.log("Request Interceptor", config);
	return config;
});
 

export default http