export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
        };
      },
      computed: {
        permissionBtn() {
          const children = this.$route.meta.children || [];
          return children.map((n) => n.name);
        },
      },
      methods: {
        checkPermissionBtn(text) {
          return this.permissionBtn.findIndex((n) => n.indexOf(text) !== -1) !== -1;
        },
      },
    });
  },
};
