import layout from '@c/layout';
import LazyLoading from '@/router/lazyLoading';
/**
 * 格式化路由
 * @param menu: 格式化单个路由 路由拉成二级目录
 */
function _router(menu) {
  const { path } = menu;
  const componentUrl = menu.component;
  // 按钮不需要构建路由
  if (menu.type === '2') {
    return;
  }
  const component = componentUrl === 'Layout' ? layout : LazyLoading(componentUrl);
  const temp = {
    path: menu.type === '0' ? `/${menu.id}` : (path || '/'),
    name: path && path.replace(/\/|:/g, '_'),
    meta: {
      id: menu.id,
      parentIds: menu.parentIds,
      menuType: menu.type, // 菜单类型 0 目录 1 菜单 2 按钮
      path,
      title: menu.name || '',
      icon: menu.icon || '',
      cache: menu.cache !== 1,
      isShow: menu.showAlways === 1,
      children: menu.children,
    },
  };
  if (menu.type === '0' && componentUrl !== 'Layout') {
    temp.redirect = temp.redirect || path || '/';
  } else {
    temp.component = component;
  }
  return temp;
}
/**
 * 格式化路由
 * @param menus ：后台返回的路由列表
 */
function formatterRoles(menus, routers = []) {
  if (!menus || !menus.length) {
    return menus;
  }
  menus.forEach((menu) => {
    const router = _router(menu);
    if (router !== undefined) {
      routers.push(router);
      if (menu.children && menu.children.length > 0) {
        if (!menu.parentId) {
          router.children = formatterRoles(menu.children);
        } else {
          formatterRoles(menu.children, routers);
        }
      }
    }
  });
  return routers;
}
export default formatterRoles;
