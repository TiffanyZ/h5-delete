import Vue from 'vue'
import App from './App.vue'
import 'promise-polyfill/src/polyfill';
import 'lib-flexible'
import router from './router/index.js'
import { Button, Image as VanImage, Lazyload, Col, Row, Popup } from 'vant';

Vue.use(Button).use(VanImage).use(Lazyload).use(Col).use(Row).use(Popup);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
