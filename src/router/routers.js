/** **
 * 基础路由
 */
import Layout from '@c/layout';
import LazyLoading from './lazyLoading';

export default [
  {
    path: '/home',
    name: 'home',
    component: LazyLoading('home/index'),
    meta: { title: '首页' },
  },
  {
    path: '/404',
    name: '404',
    component: LazyLoading('error/404'),
    meta: { title: '404 您的页面飞走了' },
  },
  {
    path: '/504',
    name: '504',
    component: LazyLoading('error/504'),
    meta: { title: '504 网络错误' },
  },
  {
    path: '/',
    redirect: '/home',
  },
];
