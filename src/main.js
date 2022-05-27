import '@/utils/native'; // 扩展原生方法
import Vconsole from '@/utils/vconsole.min.js'
import Vue from 'vue';
import '@/assets/styles/common.pcss';

import VueMixins from '@/utils/vueMixins'; // 全局混入
import '@c/index.js';
import router from './router';
import store from './store';
import App from './App';
import { Button } from 'vant';
import { RadioGroup, Radio } from 'vant';
// 移动端打印
// new Vconsole();
// 全局组件公共组件
Vue.use(VueMixins); // 消息提示

Vue.use(Button);
Vue.use(Radio);
Vue.use(RadioGroup);


Vue.config.productionTip = false;
  new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App),
  });
