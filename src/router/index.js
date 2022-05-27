import Vue from 'vue';
import Router from 'vue-router';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress'; // 路由进度条样式
import store from '@/store';
import Routers, { home } from './routers';
// 静态路由
Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: Routers, // 静态路由
});

// 全局路由钩子：用于监听路由跳转，实现一些在跳转前的业务逻辑
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();
  // 是否有令牌
  const hasToken = store.getters.token;
  const { userInfo } = store.getters;
  // 有token
  if (to.matched.length > 0) {
    // 在静态路由文件中直接访问
    next();
  } else {
    next('/404')
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
