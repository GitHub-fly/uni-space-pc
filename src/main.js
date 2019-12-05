import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import global_ from './util/Global.vue'
//让vue使用axios
Vue.use(VueAxios,axios)
Vue.prototype.GLOBAL = global_

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
