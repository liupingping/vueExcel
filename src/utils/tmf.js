import store from '@/store';

const env = process.env;
export default {
  ready(callback) {
    // 入口准备
    if (window.TMFJSBridge) {
      callback && callback();
    } else {
      let timer = setTimeout(() => {
        callback()
      }, 2000)
      document.addEventListener('TMFJSBridgeReady', () => {
        clearTimeout(timer)
        callback && callback();
      }, false);
    }
  },
  getToken() {
    return new Promise((resolve, reject) => {
      if (window.TMFJSBridge) {
        let temp = {
          appCode: env.VUE_APP_APPCODE,
          pz: env.VUE_APP_PZ,
          SGCCISCAppId: env.VUE_APP_SGCCISC_APPID,
          SGCCISCService: env.VUE_APP_SGCCISC_SERVICE,
          iscAppId: env.VUE_APP_SGCCISC_APPID,
          iscService: env.VUE_APP_SGCCISC_SERVICE,
        }
        TMFJSBridge.invoke('getTk', temp, (res) => {
          console.log(temp, res)
          // 获取token
          if (res.errMsg === 'ok') {
            let tk = res.tk
            let error = 'request failed:'
            if (tk.includes(error)) {
              store.commit('SET_TKERROR', tk.slice(error.length))
              reject(504);
            } else {
              store.commit('SET_TOKEN', tk);
              resolve();
            }
          } else {
            reject();
          }
        });
      } else {
        reject();
      }
    });
  },
  setToolBar(show) {
    // 设置导航栏隐藏/开启
    if (window.TMFJSBridge) {
      TMFJSBridge.invoke('setToolBar', { show: show ? 1 : 0 },
        (res) => {});
    }
  },
  getVersion() {
    if (window.TMFJSBridge) {
      // 用于获取当前 app 的版本号。
      TMFJSBridge.invoke('getVersion', {}, (res) => {});
    }
  },
};
