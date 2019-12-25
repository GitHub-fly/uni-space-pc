import Vue from 'vue'
import VueRouter from 'vue-router'
import Nav from '@/views/Nav.vue'
import Sign from '@/views/Sign.vue'
import Mylog from '@/views/Mylog.vue'
import Publish from '@/views/Publish.vue'
import PhotoAlbum from '@/views/PhotoAlbum.vue'
import Photo from '@/views/Photo.vue'
import User from '@/views/User.vue'
import Retrieve from '@/views/Retrieve.vue'
import Friend from '@/views/Friend.vue'
import Friendask from '@/views/Friendask.vue'
import Index from '@/views/Index.vue'
import JournalDetail from '@/views/JournalDetail.vue'
import Journal from '@/views/Journal.vue'
import test from '@/views/test.vue'
import Personal from '@/views/Personal.vue'
import Music from '@/views/Music.vue'

Vue.use(VueRouter)

const routes = [{
		path: 'nav',
		component: Nav,
		children: [{
				path: '/nav',
				redirect: '/index'
			},
			{
				path: '/index',
				component: Index,
				children: [{
						path: '/index',
						redirect: '/index/journal'
					},
					{
						path: '/index/journal',
						component: Journal
					},
					{
						path: '/index/photoAlbum/:id',
						component: PhotoAlbum
					},
					{
						path: '/index/photo/:id',
						component: Photo
					},
					{
						path: 'user',
						name: 'user',
						component: User
					},
					{
						path: '/index/mylog/:id',
						component: Mylog
					},
					{
						path: '/index/journal/detail/:id',
						component: JournalDetail
					},
					{
						path: '/index/music',
						name: 'music',
						component: Music
					},
					{
						path: '/index/retrieve',
						name: 'retrieve',
						component: Retrieve
					},
					{
						path: '/index/publish',
						component: Publish
					},
				]
			},
			{
				path: '/personal/:id',
				component: Personal
			},
			{
				path: 'friend',
				component: Friend
			},
		]
	},
	{
		path: '/',
		name: 'sign',
		component: Sign
	},
	{
		path: '/test',
		name: 'test',
		component: test
	}
]

const router = new VueRouter({
	routes
})

export default router
