import store from '@/store';
import router from '@/router';
const env = process.env;
export default {
  apiData: [],
  igwRequest (type, data, resolve) {
    let temp =  {
      type,
      // contentType: 'application/json',
      contentType: 'text/plain',
      appcode: env.VUE_APP_APPCODE,
      appservercode: 'SZHGK_APP',
      areid: '0',
      params: {ticket: store.getters.token, ...data},
    }
    TMFJSBridge.invoke('igwRequest', temp, 
    (res) => {
      console.log('igwRequest', temp.params, res)

      if (res.errMsg === 'ok') {
        try {
          let result = res.result
          resolve(result)
          setTimeout(() =>{
            this.apiData.splice(0, 1)
          }, 50)
        } catch(e) {
          router.replace('/404')
        }
      } else {
        router.replace('/404')
      }
    })
  },
  igwRequestNscy (type, data, resolve){
    let temp =  {
      type,
      // contentType: 'application/json',
      contentType: 'text/plain',
      appcode: env.VUE_APP_APPCODE,
      appservercode: 'SZHGK_APP',
      areid: '0',
      params: {ticket: store.getters.token, ...data},
    }
    TMFJSBridge.invoke('igwRequest', temp, 
    (res) => {
      console.log('igwRequest', temp.params, res)

      if (res.errMsg === 'ok') {
        try {
          let result = res.result
          if (typeof result === 'string') {
            result = {successful: false, resultHint: result}
          }
          resolve(result)
        } catch(e) {
          router.replace('/404')
        }
      } else {
        router.replace('/404')
      }
    })
  },
  request ( type, data) {
    return new Promise((resolve, reject) => {
      if (window.TMFJSBridge) {
        // this.apiData.push(data)
        // let timer = setInterval(() => {
        //   let temp = this.apiData[0]
        //   if (temp.url === data.url) {
        //     clearInterval(timer)
        //     this.igwRequest(type, data, resolve)
        //   }
        // }, 100)
        this.igwRequestNscy(type, data, resolve)
        
      } else {
        router.replace('/404')
      }
    })
  }
}