import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home.vue'
import Index from '../pages/index.vue'
import Login from '../pages/login.vue'
import Personal from '../pages/personal.vue'

Vue.use(Router)

// 解决路由重复点击
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

export default new Router({
	routes: [{
			path: '/login',
			name: 'login',
			component: Login,
		},
		{
			path: '/',
			name: 'home',
			component: Home,
			redirect: '/index',
			meta: {
				requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
			children: [{
					path: '/index',
					name: 'index',
					component: Index,
					meta: {
						title: '首页',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				},
				{
					path: '/personal',
					name: 'personal',
					component: Personal,
					meta: {
						title: '个人中心',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				}
			]
		},
	]
})
