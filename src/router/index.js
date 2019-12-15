import Vue from 'vue'
import VueRouter from 'vue-router'
import Nav from '@/views/Nav.vue'
import Sign from '@/views/Sign.vue'
import Mylog from '@/views/Mylog.vue'
import Publish from '@/views/Publish.vue'
import Photo from '@/views/Photo.vue'
import User from '@/views/User.vue'
import Retrieve from '@/views/Retrieve.vue'
import Friend from '@/views/Friend.vue'
import Friendask from '@/views/Friendask.vue'
import Index from '@/views/Index.vue'
import JournalDetail  from  '@/views/JournalDetail.vue'
import test from '@/views/test.vue'
import Personal from '@/views/Personal.vue'
Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: Nav,
		children: [
			{
				path: '/',
				redirect: 'index'
			},
			{
				path:'index',
				component:Index
			},
			{
				path:'journaldetail',
				name:'journaldetail',
				component:JournalDetail
			},
			{
				path:'retrieve',
				name:'retrieve',
				component:Retrieve
			},
			{
				path: 'mylog',
				name:'mylog',
				component: Mylog
			},
			{
				path:'personal/:id',
				name:'personal',
				component:Personal
			},
			{
				path: 'publish',
				component: Publish
			},
			{
				path: 'photo',
				name:'photo',
				component: Photo
			},
			{
				path:'user',
				name:'user',
				component:User
			},
			{
				path:'friend',
				component:Friend
			},
			{
				path:'friendask',
				component:Friendask
			}
			
		]
	},
	{
		path: '/sign',
		name:'sign',
		component: Sign
	},
	{
		path:'/test',
		component:test
	}

]

const router = new VueRouter({
	routes
})

export default router
