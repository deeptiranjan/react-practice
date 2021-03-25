import axios from 'axios';

const usersAxiosInstance = axios.create({
    headers: {'X-Custom-Header': 'foobar'}
});


usersAxiosInstance.interceptors.request.use((config)=>{
    console.log("success in interceptor in request", config);
    const header = {
        'x-custom-app' : 'depti'
    }
    const headers = {...config.headers,...header};
    config.headers = headers;
    return config;
},(error) => {
    console.log("error in interceptor in req", error);
    return Promise.reject(error);
});

usersAxiosInstance.interceptors.response.use((response) => {
    console.log("success in interceptor in res", response);
    return response;
},(error) => {
    console.log("error in interceptor resp", error);
    return Promise.reject(error);
})

export default usersAxiosInstance;