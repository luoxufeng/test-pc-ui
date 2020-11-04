import axios from 'axios';
import Vue from 'vue';
const service = axios.create({
  // baseURL: env == 'production' ? PROURI : DEVURI, // api的base_url
  baseURL: '', // api的base_url
  timeout: 60000, // request timeout
  headers: {
    'Content-Type': 'application/json'
  }
});
service.interceptors.request.use(
  config => {
    // config.withCredentials = true;
    // let token = getStore('yz-token');
    // let orgCode = '';
    // let stationCode = '';
    // let userInfo = getStore('userInfo');
    // if (userInfo) {
    //   orgCode = JSON.parse(userInfo).orgCode;
    //   stationCode = JSON.parse(userInfo).stationCode;
    //   config.headers.orgCode = orgCode;
    //   config.headers.stationCode = stationCode;
    // }
    // if (token) {
    //   config.headers.token = token;
    // }
    // 为了测试，先写死这个token
    config.headers.token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5dG8tc3RhdGlvbi15aWFwcCIsInVzZXJuYW1lIjoiMTgwMTYyMDYyMzEiLCJlbXBDb2RlIjoiMDAwMDM1MTgiLCJpYXQiOjE2MDM5NTcxMzh9.RgKhe9iT8_yAkyqVZzCI2zsvaXKNnTMQyhlJx8IuuBE'
    config.headers.orgCode = '210045';
    config.headers.stationCode = '0000048303';
    return config;
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
);

// respone interceptor
service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      // console.log('请求错误：', data.message);
      Vue.prototype.$message({
        type: 'warning',
        message: response.data.message
      });
      return Promise.reject(response.data);
    }
    return response.data;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default service;
