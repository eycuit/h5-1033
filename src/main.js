// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
Vue.config.productionTip = false;
import Tools from "@/assets/js/tools"
Vue.prototype.$tools = Tools;
import area from "@/assets/js/area"
Vue.prototype.$area = area;

import Swiper from "swiper"
Vue.prototype.$swiper = Swiper;

import '@/assets/css/main.css';

//js-cookies
import Cookies from 'js-cookie'
Vue.prototype.$cookies = Cookies

// //iView
// import 'iview/dist/styles/iview.css';
// import { Menu } from 'iview'
// Vue.component('Menu', Menu);


// //vant
import Vant from 'vant';
import 'vant/lib/index.css';
import { Notify, Field, Button, Col, Row, List, Cell  } from 'vant';
Vue.use(Field);
Vue.use(Button);
Vue.use(List);
Vue.use(Col);
Vue.use(Row);
Vue.use(Cell);
// Vue.use(DatetimePicker);
// Vue.use(ActionSheet);
// Vue.use(List);
// Vue.use(Popup);
// Vue.use(Tab);
// Vue.use(Tabs);
// Vue.use(RadioGroup);
// Vue.use(Radio);
// Vue.use(AddressEdit);
// Vue.use(Switch);
// Vue.use(SwipeCell);
// Vue.use(Dialog);
// Vue.use(Uploader);
// Vue.use(Search);
// Vue.use(Overlay);
// Vue.use(Area);
// Vue.use(DropdownMenu);
// Vue.use(DropdownItem);
Vue.use(Vant);
Vue.prototype.$notify = Notify;
//echarts
// let echarts = require('echarts/lib/echarts');
// 引入折线图/柱状图等组件
// require('echarts/lib/chart/line')
// require('echarts/lib/chart/bar')
// require('echarts/lib/chart/radar')
// // 引入提示框和title组件，图例
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
// require('echarts/lib/component/legend')
// require('echarts/lib/component/legendScroll')//图例滚动
// Vue.prototype.$echarts = echarts;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
