import HttpRequest from './request'
import TmfRequest from './tmfRequest'
export default {
  async request (params) {
    let data = {
      method: params.method,
      url: params.url,
    }
    if (params.method === 'post') {
      data.req = JSON.stringify(params.data)
      data.url = params.url
    } else {
      let arr = []
      for (let index in params.params) {
        if (typeof params.params[index] !== 'object') {
          arr.push(index + '=' + params.params[index])
        }
      }
      data.url = params.url + (arr.length > 0 ? '?' + arr.join('&') : '')
    }
    if (window.TMFJSBridge) {
      return await TmfRequest.request('POST', JSON.parse(JSON.stringify(data)))
    } else {
      const url = '/szhgk/getIntData';
      return HttpRequest.request({
        url,
        method: 'post',
        data,
      })
    }
  },
}