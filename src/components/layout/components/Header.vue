<template>
  <div class="header-bar">
    <div class="left-logo">
      <img src="../../../assets/login/logo.png" alt="">
      <div class="logo">可视化分析平台</div>
    </div>
    <div class="right-user">
      <div class="header-user-con">
        <!-- 用户名称 -->
        <span>{{username}}</span>
        <!-- 退出登录 -->
        <span class="iconfont icon-tuichu notice-icon"  @click="logout"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    username() {
      return this.$store.getters.userInfo.name;
    },
  },
};
</script>
<style lang="pcss" scoped>
</style>
