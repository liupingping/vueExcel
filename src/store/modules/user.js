/** **
 * 系统用户信息
 */
export default {
  state: {
    token: sessionStorage.getItem('admin-token') ? sessionStorage.getItem('admin-token') : null,
    tkError: '', // tkerror
    userInfo: null,

  },
  getters: {
    token: (state) => state.token,
    userInfo: (state) => state.userInfo,
    tkError: state => state.tkError,
  },
  mutations: {
    // 设置token
    SET_TOKEN: (state, token) => {
      state.token = token;
	  if (token) {
		  sessionStorage.setItem('admin-token', token)
	  } else {
		  sessionStorage.removeItem('admin-token')
	  }
    },
    // 设置用户信息
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_TKERROR: (state, error) => {
      state.tkError = error
    }

  },
  actions: {
    // 登录逻辑
    login({ commit }, loginForm) {
      // 这里调用项目的登录接口
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', token);
        resolve(res);
      });
    },
    setToken ({ commit }, token){
      commit('SET_TOKEN', token)
    },
    layout({ commit }) {
      commit('SET_TOKEN', null);
      commit('SET_ADDROUTES', null);
      commit('SET_USERINFO', null);
    },
    // 获取用户信息逻辑
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        // 设置用户信息
        commit('SET_USERINFO', res.resultValue);
        resolve();
      });
    },
  },
};
