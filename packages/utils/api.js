import request from './request'
export default {
  // 获取省市区
  getCity (obj) {
    return request({
      url: '/postStation/op/findCityByParentCode',
      method: 'post',
      data: obj
    });
  }
}