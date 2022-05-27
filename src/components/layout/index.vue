<template>
  <div class="wrapper" >
    <keep-alive :max="maxKeep">
      <router-view ref="routerView" v-if="$route.meta.cache" :key="getKeys($route.fullPath)"/>
      <el-row style="display: none;" v-else ref="routerView"></el-row>
    </keep-alive>
    <router-view v-if="!$route.meta.cache" :key="getKeys($route.fullPath)"></router-view>
  </div>
</template>

<script>
// import vHead from './components/Header.vue';
// import vTags from './components/Tags.vue';
import md5 from 'js-md5';

export default {
  name: 'layout',
  data() {
    return {
      maxKeep: 30,
      collapse: false,
    };
  },
  components: {
  },
  methods: {
    getKeys(path) {
      return md5(path);
    },
    /** **
     * 删除keep-alive 缓存
     * keep-alive只能通过缓存的组件的$vnode的parent获取,不能通过$refs获取
     * 这里 hasClient 的情形无法删除 缓存, 领导看板的缓存无法删除
     */
    removeKeepAlive(keepAlive) {
      // 删除缓存
      const removeCache = (instance, key) => {
        const { cache } = instance;
        const { keys } = instance;
        // 删除缓存
        if (cache[key]) {
          if (keys.length) {
            const index = keys.indexOf(key);
            if (key > -1) {
              keys.splice(index, 1);
            }
          }
          delete cache[key];
        }
      };
      // 获取router-view 的 父节点keep-alive,
      const node = this.$refs.routerView.$vnode;
      if (node && node.data.keepAlive) {
        if (node.parent && node.parent.componentInstance && node.parent.componentInstance.cache) {
          if (node.parent.componentOptions) {
            // 删除被关闭的页面的缓存
            keepAlive.forEach((n) => {
              const keys = this.getKeys(n);
              removeCache(node.parent.componentInstance, keys);
            });
          }
        }
      }
    },
  },
};
</script>
