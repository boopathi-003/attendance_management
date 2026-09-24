import axios from "axios";
const axiosInstance  = axios.create({
    baseURL : "http://localhost:8080",
});
axiosInstance.interceptors.response.use(
    response=> {
        return response;
    },
   ( error)=>{
        if(error.response){
            switch(error.response.status){
                case 400:
                  console.error('Bad Request', error.response.data);
                  break;
                case 401:
                  console.error('Unauthorized', error.response.data);
                  break;
                case 404:
                  console.error('Not Found', error.response.data);
                  break;
                case 500:
                  console.error('Internal Server Error', error.response.data);
                  break;
                default:
                  console.error('Unexpected Error', error.response.data);
              }
            } 
            else {
              console.error('Network Error', error.message);
            }
            return Promise.reject(error);
          }
);
export default axiosInstance;