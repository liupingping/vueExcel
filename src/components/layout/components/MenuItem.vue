<template>

  <el-submenu :popper-append-to-body="false" v-if="hasChildren"
    :index='routerItem.id'
    :key="routerItem.id" >
    <template slot="title">
      <span> {{routerItem.name}}</span>
    </template>
    <menu-item v-for="childrenItem in subRouter" :key='childrenItem.id' :routerItem="childrenItem"></menu-item>
  </el-submenu>

  <el-menu-item v-else-if="routerItem.hideInMenu === 1"
                :index='routerItem.id'
                :route="routerItem.path" >
    <span slot="title">{{routerItem.name}}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'menu-item',
  props: {
    routerItem: Object,
  },
  computed: {
    hasChildren() {
      return this.routerItem.type === '0' && this.routerItem.hideInMenu === 1 && this.subRouter.length > 0;
    },
    subRouter() {
      return this.routerItem.children.filter((n) => n.hideInMenu === 1);
    },
  },
};
</script>
