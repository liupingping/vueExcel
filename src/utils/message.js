import { Toast, Dialog } from 'vant';

const Message = {
  showLoading(title = '', detail = '') {
    TMFJSBridge.invoke('showLoading', { title, detail }, () => {
    });
  },
  hideLoading() {
    TMFJSBridge.invoke('hideLoading', {}, callback);
  },
  loading(message) {
    Toast.loading({
      message,
      loadingType: 'spinner',
      forbidClick: true,
    });
  },
  success(text) {
    Toast.success(text);
  },
  error(text) {
    Toast.fail(text);
  },
  toast(toast) {
    if (window.TMFJSBridge) {
      TMFJSBridge.invoke('showToast', { title: toast.title, detail: toast.message, duration: 3000 }, () => {
      });
    } else {
      Toast(toast);
    }
  },
  alert(title, message) {
    return new Promise((resolve, reject) => {
      if (window.TMFJSBridge) {
        TMFJSBridge.invoke('alert', { title, message, okButton: '确定' }, () => {
          resolve();
        });
      } else {
        Dialog.alert({
          title, message,
        }).then(() => {
          resolve();
        });
      }
    });
  },
  confirm(title, message) {
    return new Promise((resolve, reject) => {
      if (window.TMFJSBridge) {
        TMFJSBridge.invoke('confirm', {
          title, message, okButton: '确定', cancelButton: '取消',
        }, ({ clickedButtonIndex }) => {
          if (clickedButtonIndex === 1) {
            resolve();
          } else {
            reject();
          }
        });
      } else {
        Dialog.comfirm({
          title, message,
        }).then(() => {
          resolve();
        }).catch(() => {
          reject();
        });
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
  closeApp () {
    if (window.TMFJSBridge) {
      TMFJSBridge.invoke('closeContainer', {}, (res) => {})
    }
  },
};
Message.install = function (Vue, options) {
  // 4. 添加实例方法
  Vue.prototype.$message = Message;
};
export default Message;
