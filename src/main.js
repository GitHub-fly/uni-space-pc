import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import global_ from './util/Global.vue'
//引入vuetify
import vuetify from '@/plugins/vuetify' // path to vuetify export
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
// 引入音乐组件
import vueAplayer from 'vue-aplayer'

//让vue使用axios
Vue.use(VueAxios, axios, vueAplayer)
Vue.prototype.GLOBAL = global_

Vue.config.productionTip = false

Vue.use(Vuetify)

new Vue({
	router,
	vuetify,
	render: h => h(App)
}).$mount('#app')
