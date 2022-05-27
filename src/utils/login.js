import store from '@/store';
import { getQueryObject } from '@/utils/index';
// const env = process.env.NODE_ENV;
/** **
 * 登录方法 包含isc login
 */
export const login = (to, next) => {
  const iscLogin = () => {
    const addr = window.location.href;
    let hash = location.hash.slice(1);
    hash = hash.indexOf('#') === -1 ? hash : hash.substring(0, hash.indexOf('#'));
    hash = hash.replace(/\?/ig, '$*');
    // 跳转回调到复制的相关页面
    const callback = `${window.location.origin + window.location.pathname}#${hash.indexOf('/login') > -1 ? '/' : hash}`;
    window.location.href = `${config.iscHost}login?service=${encodeURIComponent(callback)}`;
  };
  if (to.path === '/login') {
    next();
  } else {
    next('/login');
  }
  // if (env !== 'production') {
  //   next('/login')
  // } else {
  //   iscLogin()
  // }
};
/** **
 * 获取isc token 判断是否登录
 */
export const getIscToken = (to, next) => {
  const { ticket } = getQueryObject();
  if (ticket) {
    const index = ticket.lastIndexOf('#'); // 截取#号多余的参数
    const token = ticket.slice(0, index);
    store.commit('SET_TOKEN', token);
    let hash = location.hash.slice(1);
    hash = hash.indexOf('#') === -1 ? hash : hash.substring(0, hash.indexOf('#'));
    const host = window.location.origin + window.location.pathname;
    if (hash !== '/' && hash.indexOf('/login') === -1) {
      window.location.href = `${host}#${hash.replace(/\$\*/ig, '?')}`;
    } else {
      window.location.href = `${host}#/`;
    }
  } else {
    login(to, next);
  }
};
