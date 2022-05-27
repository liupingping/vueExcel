import axios from 'axios';
// import config from '@/config'
import store from '@/store';
import router from '@/router';
import { Message } from 'element-ui';

const HttpRequest = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 60000, // request timeout
});

HttpRequest.interceptors.request.use(
  (config) => {
    config.headers.token = store.getters.token;
    return config;
  },
  (error) => Promise.reject(error),
);

HttpRequest.interceptors.response.use(

  (response) => {
    /**
     * 请求成功 200
     * 传过来的数据有问题：201
     * 数据库操作失败：500
     * 还有：401、403
     */
    if (response.config.responseType === 'blob') { // 导出
      let fileName = response.headers.filename;
      fileName = decodeURIComponent(fileName);
      return { fileName, blob: response.data };
    }
    const res = response.data;
    // http 返回200
    if (response.status === 200) {
      return res;
    }
    return Promise.reject(response);
  },
  (error) => {
    if (error = error.response) {
      switch (error.status) {
        case 401:
          Message.error('登录信息已过期，请重新登录');
          store.dispatch('layout');
          router.replace('/login');
          break;
      }
    } else {
      return Promise.reject(error);
    }
  },
);

export default HttpRequest;
