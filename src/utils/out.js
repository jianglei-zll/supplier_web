import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken,get } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 35000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    let test = config.data;
    if(test){
      config.data['access_token']= getToken()
    }

    if (get('storeId') && 'undefined'!=get('storeId')){
      config.headers['storeid'] = get('storeId')
    }
    config.headers['responseType'] = 'blob';
    config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }else{
    config.headers['client_id'] = 'app';
    config.headers['client_secret'] = 'app';
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    const res = response.data
    console.log(res)
  
      // 401:未登录;
     
  },
  error => {
    console.log(error);
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
