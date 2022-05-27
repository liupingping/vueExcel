/** **
 * 系统 相关信息
 */
import formatterRoles from '@/utils/formmateRouters';
import ChartsColors from './chartsColors';

export default {
  state: {
    addRoutes: [], // 当前用户路由菜单列表，格式化后
    menus: [], // 原始 菜单列表
    chartsColors: ChartsColors,
  },
  getters: {
    router: (state) => state.addRoutes || [],
    menus: (state) => state.menus,
    chartsColors: (state) => state.chartsColors, // echarts 图表颜色配色
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus;
    },
    // 设置异步路由
    SET_ADDROUTES: (state, routers) => {
      state.addRoutes = routers;
    },
  },
  actions: {
    getRoutes({ commit }) {
      return new Promise((resolve, reject) => {
        // 获取菜单路由信息
            // 现在使用虚拟路由，后续后台ok将使用真实场景
            // const temp = res.resultValue.items[0] ? res.resultValue.items[0] : {};
            // commit('SET_MENUS', JSON.parse(JSON.stringify(temp.children || [])));
            // const routers = formatterRoles([temp]);
            // commit('SET_ADDROUTES', routers);
            // resolve(routers);
      });
    },

  },
};
