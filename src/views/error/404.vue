<template>
  <div class="content-wrapper">
    <header-nav title="" @on-left="leftHandle">
    </header-nav>
    <div class="content-main">
      <error></error>
    </div>
  </div>
</template>
<script>
import Error from '@/components/error/404'
import {mapGetters} from 'vuex'
export default {
  components: {
    Error,
  },
  computed: {
    ...mapGetters(['menus']),
  },
  methods: {
    leftHandle () {
      if (this.menus.length) {
        // 返回上一页
        this.$router.replace(-1)
      } else {
        this.$message.closeApp()
      }
    }
  }
}
</script>
