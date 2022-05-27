<template>
  <el-menu
    class="menu-box"
    :default-active="onRoutes"
    mode="horizontal"
    background-color='#fff'
    text-color="#2d345c"
    active-text-color="#5864ff"
    router
  >
    <router-menu v-for='item in menus' :routerItem='item' :key='item.id'></router-menu>
  </el-menu>
</template>

<script>
import routerMenu from './MenuItem';

export default {
  props: {
    menuType: {
      type: String,
      default: 'left',
    },
  },
  data() {
    return {
      collapse: false,
    };
  },
  components: { routerMenu },
  computed: {
    menus() {
      return this.$store.getters.menus;
    },
    onRoutes() {
      const { meta } = this.$route;
      return meta && meta.id;
    },
  },
};
</script>
<style lang="scss">
  $menuItemFont: 16px;
  $menuItemActiveBg: #eff0fe;
  .menu-box{
    .el-menu-item,.el-submenu__title{
      padding: 0 23px;
    }
    .el-menu-item,.el-submenu__title{
      font-size:$menuItemFont;
    }
    .el-menu-item.is-active{
      background: $menuItemActiveBg !important;
      border-bottom:4px solid  !important;
    }
    .is-active{
      .el-submenu__title{
        background: $menuItemActiveBg !important;
        border-bottom:4px solid  !important;
      }
    }
    .el-menu--horizontal{
      .el-menu-item.is-active{
        border-bottom:none  !important;
      }
    }

  }
</style>
