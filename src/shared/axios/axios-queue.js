import axios from 'axios';

const axiosQueuesInstance = axios.create({
    headers: {'X-Queues' : 'data'},
    baseURL : 'https://react-demo-4c66c-default-rtdb.firebaseio.com/'
})

axiosQueuesInstance.interceptors.request.use(
    (req) => {
        return req
    }
)

axiosQueuesInstance.interceptors.response.use(
    (res) => {
        return res
    }
)


export default axiosQueuesInstance