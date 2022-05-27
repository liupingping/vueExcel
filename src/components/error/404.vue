<template>
  <div class="err_bg">
    <div class="err_text">{{message}}</div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: '您没有被授权访问，请联系管理员'
    }
  }
}
</script>
<style scoped lang="pcss">
.err_bg{
  background: url(../../assets/images/404.png) no-repeat center center;
  background-size: contain;
  height: 20rem;
  margin: 8rem auto;
  .err_text{
    padding-top: 17rem;
    font-size: 1.6rem;
    text-align: center;
    color: var(--text-info);
  }
}
</style>
