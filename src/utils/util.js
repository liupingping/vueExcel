// let [tm_id] = location.hostname.split('.');
import { mapGetters, mapState } from 'vuex';

export default {
  install(Vue) {
    Vue.mixin({
      filters: {
      },
      data() {
        return {
        };
      },
      computed: {
      },
      methods: {
        /** **
         * 窗口滚动动画
         * @targetY
         * @currentY
         */
        scrollAnimation(targetY, currentY = document.documentElement.scrollTop || document.body.scrollTop) {
          // 获取当前位置方法

          // 计算需要移动的距离
          const needScrollTop = targetY - currentY;
          let _currentY = currentY;
          setTimeout(() => {
            // 一次调用滑动帧数，每次调用会不一样
            const dist = Math.ceil(needScrollTop / 10);
            _currentY += dist;
            window.scrollTo(_currentY, currentY);
            // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
            if (needScrollTop > 10 || needScrollTop < -10) {
              this.scrollAnimation(targetY, _currentY);
            } else {
              window.scrollTo(_currentY, targetY);
            }
          }, 2);
        },
        /** **
         * 处理懒加载图片 宽高resize
         */
        loadedImg({ el }) {
          if (el.getAttribute('resize')) {
            if (el.offsetHeight < el.offsetWidth) {
              el.style.width = 'auto';
              el.style.height = '100%';
            }
          }
        },
      },
    });

    Vue.prototype.$page = {
      init() {
        return {
          loading: false,
          finished: false,
          loaded: false,
          no_data: false,
          refresh: true,
          pages: 0,
          next_page: 1,
          page_num: 1,
          list: [],
          query: {},
        };
      },

      update(page, res, type = 'down') {
        // 加载过数据
        page.loaded = true;
        // 没有数据
        if (!res.list || !res.list.length) {
          // 新接口数据
          page.pages = 0;
          page.page_num = 1;
          page.list = [];
          page.no_data = true;
          page.finished = true;
        } else {
          // 页码
          page.page_num = Number(res.page_num);
          page.no_data = false;
          // 第一页
          if (res.is_first_page) {
            page.pages = Number(res.pages);
            page.list = res.list;
          } else if (type === 'down') {
            page.list = page.list.concat(res.list);
          } else {
            page.list = res.list.concat(page.list);
          }
          page.finished = page.no_data || page.pages === page.page_num;
          page.next_page = page.pages === 0 ? page.page_num : page.page_num + 1;
        }
        page.refresh = false;
        page.loading = false;
      },
    };

    Vue.prototype.$util = {
      copy(obj, keys) {
        const ret = {};
        keys.forEach((key) => {
          ret[key] = obj[key];
        });
        return ret;
      },
    };
  },
};
