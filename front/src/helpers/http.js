import axios from "axios"

let http = axios.create({
    baseURL: 'http://localhost:1408'
  })

http.interceptors.request.use(config => {
	config.headers.common["Authorization"] = localStorage.getItem("token");
	console.log("Request Interceptor", config);
	return config;
});

// NE PAS TOUCHER. UTILSE POUR LES TEST
// const resInterceptor = axios.interceptors.response.use(res => {
// 	console.log("Response Interceptor", res);
// 	return res;
// });

//Laisser au cas ou
// axios.defaults.headers.post["Content-Type"] =
// 	"application/x-www-form-urlencoded";


// axios.interceptors.request.eject(reqInterceptor);
// axios.interceptors.response.eject(resInterceptor);

export default http