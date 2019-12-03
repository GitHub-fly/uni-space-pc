import Vue from 'vue'
import VueRouter from 'vue-router'
import Nav from '@/views/Nav.vue'
import Sign from '@/views/Sign.vue'
import Dynamic from '@/views/Dynamic.vue'
import Mylog from '@/views/Mylog.vue'
import Publish from '@/views/Publish.vue'
import Photo from '@/views/Photo.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Nav,
	children: [
		{
			path: '/',
			redirect: '/dynamic'
		},
		{
			path: '/dynamic',
			component: Dynamic
		},
		{
			path: '/sign',
			component:Sign
		},
		{
			path: '/mylog',
			component: Mylog
		},
		{
			path: '/publish',
			component: Publish
		},
		{
			path: '/photo',
			component: Photo
		}
	]
  }
  
]

const router = new VueRouter({
  routes
})

export default router
