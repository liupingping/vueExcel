<template>
  <div class="tags" >
    <div class="tags-list" :class="{'tags-list-left':visible}"  ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div class="ul"    ref="scrollBody" :style="{left: tagBodyLeft + 'px'}">
        <transition-group name="taglist-moving-animation">
        <div class="tags-li" v-for="(item,index) in tagsList" @click.stop="goPage(item)" :class="{'active': isActive(item.path)}" :key="index" :ref="'item'+index">
          <a class="tags-li-title">
            {{item.title}}
          </a>
          <span class="tags-li-icon" @click.stop="closeTags(item.path)"><i class="el-icon-close"></i></span>
        </div>
         </transition-group>
      </div>
    </div>
    <div class="tags-left tags-icon"  @click="handleScroll(240)"  v-if="visible"><i class="el-icon-arrow-left"></i></div>
    <div class="tags-right tags-icon"  @click="handleScroll(-240)" v-if="visible"><i class="el-icon-arrow-right"></i></div>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags" trigger="click">
        <i class="el-icon-caret-bottom"></i>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tagRowList: [],
      tagBodyLeft: 0,
      rightOffset: 40,
      outerPadding: 4,
      contextMenuLeft: 0,
      contextMenuTop: 0,
      visible: false,
    };
  },
  computed: {
    tagsList() {
      return this.$store.getters.tagRow;
    },
    showTags() {
      return this.tagsList.length > 0;
    },
  },
  watch: {
    $route(newValue, oldValue) {
      this.setTags(newValue);
    },
    'tagsList.length': {
      handler(newVal, oldVal) {
        if (newVal > oldVal) {
          this.setTimeIcon(1);
        }
      },
    },
  },
  created() {
    this.setTags(this.$route);
    this.setTimeIcon(3);
  },
  methods: {
    goPage(item) {
      this.$router.push(item.path);
    },
    isActive(path) {
      return path === this.$route.fullPath;
    },
    // 关闭单个标签
    closeTags(path) {
      const index = this.tagsList.findIndex((n) => n.path === path);
      this.$store.dispatch('closeTag', [path]);
      const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
      if (item) {
        this.$router.push(item.path);
      } else {
        this.$router.push('/');
      }
      const keyName = `item${index}`;
      const width = this.$refs[keyName] ? this.$refs[keyName].clientWidth : 0;
      this.setTagsIcons('one', width);
    },
    // 关闭全部标签
    closeAll() {
      const closeTag = [];
      this.tagsList.forEach((n) => closeTag.push(n.path));
      this.$store.dispatch('closeTag', closeTag);
      this.$router.push('/');
    },
    // 关闭其他标签
    closeOther() {
      const closeTag = [];
      this.tagsList.filter((item) => item.path !== this.$route.fullPath).forEach((n) => closeTag.push(n.path));
      this.$store.dispatch('closeTag', closeTag);
    },
    // 设置标签
    setTags(route) {
      const isExist = this.tagsList && this.tagsList.length > 0 && this.tagsList.some((item) => item.path === route.fullPath);
      if (!isExist) {
        const temp = {
          title: route.meta.title,
          path: route.fullPath,
          name: route.name,
          query: route.query,
          params: route.params,
        };
        const arr = this.tagsList && this.tagsList.length > 0 ? [...this.tagsList, temp] : [temp];
        this.$store.commit('SET_TAGROW', arr);
      }
    },
    handleTags(command) {
      command === 'other' ? this.closeOther() : this.closeAll();
      this.setTagsIcons('all'); // 去掉左右箭头
    },
    // 滑动相关的函数
    setTimeIcon(type) {
      setTimeout(() => {
        this.setTagsIcons();
      }, 300);
    },
    handlescroll(e) {
      const { type } = e;
      let delta = 0;
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      this.handleScroll(delta);
    },
    handleScroll(offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth;
      const bodyWidth = this.$refs.scrollBody.offsetWidth;
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset);
      } else if (outerWidth < bodyWidth) {
        if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
          this.tagBodyLeft = this.tagBodyLeft;
        } else {
          this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth);
        }
      } else {
        this.tagBodyLeft = 0;
      }
    },
    setTagsIcons(type, width) {
      if (type && type == 'all') {
        this.tagBodyLeft = 0;
        this.visible = false;
      } else {
        if (this.$refs.scrollOuter && this.$refs.scrollBody) {
          const outerWidth = this.$refs.scrollOuter.offsetWidth - 20;
          let bodyWidth = this.$refs.scrollBody.offsetWidth;
          if (type == 'one') {
            bodyWidth -= width;
          }
          if (bodyWidth > outerWidth) {
            this.visible = true;
          } else {
            this.tagBodyLeft = 0;
            this.visible = false;
          }
        }
      }
    },
  },
};

</script>

<style lang="scss">
  @import "~@/styles/variables.scss";
  .tags {
    margin-top: 16px;
    position: relative;
    height: 40px;
    overflow: hidden;
    background: $contentColor;
    width: 100%;
    /*padding-right: 120px;*/
    /*box-shadow: 0 5px 10px #ddd;*/
    .tags-icon{
      height: 40px;
      width: 20px;
      position: absolute;
      top: 0;
      cursor: pointer;
      background: #646fff;
      color: #fff;
      font-weight: bold;
      line-height: 40px;
      text-align: center;
      &:hover{
        color: #fc905c;
      }
    }
    .tags-left{
      left: 0;
    }
    .tags-right{
      right: 28px;
    }

    .tags-list{
      position: absolute;
      left: 0px;
      right: 28px;
      top: 0;
      bottom: 0;
      overflow: hidden;
    }
    .tags-list-left{
      left: 28px;
      right: 56px;
    }
    .ul {
      // box-sizing: border-box;
      // width: 100%;
      height: 100%;
      border-bottom:1px solid #f0f1f7;
      white-space: nowrap;
      position: absolute;
      transition: left .3s ease;
      display: inline-block;
      .tags-li {
        display: inline-block;
        // width:116px;
        padding: 0 20px;
        // float: left;
        text-align: center;
        border-radius: 8px 8px 0 0;
        font-size: 14px;
        overflow: hidden;
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        background: #fff;
        vertical-align: middle;
        color: #879eb8;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
        margin-right:8px;
        .tags-li-icon{
          position: relative;
          top: 1px;
          font-size: 18px;
          margin-left: 10px;
        }
      }
    }
  }
  .tags-li:not(.active):hover {
    background: #f8f8f8;
  }

  .tags-li.active {
    color: $primaryColor;
    .tags-li-icon{
      color: $primaryColor;
    }
  }
  .tags-li.active .tags-li-title {
    color: $primaryColor;
  }
  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 26px;
    height: 40px;
    line-height: 40px;
    background: $primaryColor;
    .el-dropdown{
      display: block;
    }
    .el-icon-caret-bottom{
      display: block;
      width: 26px;
      height: 40px;
      line-height: 40px;
      color:#fff;
    }
  }

</style>
