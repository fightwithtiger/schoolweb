import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import store from './store'
import {
	Message,
	Menu,
	Submenu,
	MenuItem,
	MenuItemGroup,
	Input,
	Button,
	Form,
	FormItem,
	Footer,
	Divider,
	Row,
	Col,
	Card,
	Table,
	TableColumn,
	Dialog,
	Avatar,
	Radio,
	RadioGroup,
	Select,
	Option,
	Pagination,
	Image,
	Carousel,
	CarouselItem,
	Backtop,
	DatePicker,
	TimePicker,
	TimeSelect,
	Tag,
	Badge,
	Tabs,
	TabPane,
	Collapse,
	CollapseItem
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import App from './App'

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
// Vue.use(VueCookie)
Vue.prototype.$cookie = VueCookie;

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Footer);
Vue.use(Divider);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Avatar);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(Image);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Backtop);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(TimeSelect);
Vue.use(Tag);
Vue.use(Badge);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.prototype.$message = Message;


// Vue.use(VueLazyLoad,{
//   loading:'/imgs/loading-svg/loading-bars.svg'
// })
// 通过原型的方式扩展一个全局的对象

Vue.config.productionTip = false

// 接口错误拦截
axios.interceptors.response.use(function(response) {
	let res = response.data;
	let path = location.hash;
	if (res.code == 200) {
		return res;
	} else if (res.code == 401) {
		if (path != '#/index') {
			window.location.href = '/#/login';
		}
		return Promise.reject(res);
	} else if (res.code == 400){
		Message.warning(res.msg);
		return Promise.reject(res);
	}else {
		Message.warning(res.msg);
		return Promise.reject(res);
	}
}, (error) => {
	let res = error.response;
	Message.error(res.data.message);
	return Promise.reject(error);
});

router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
		console.log(VueCookie.get('number'))
		if (VueCookie.get('number') !== null && VueCookie.get('number') !== -1) {
			if (to.meta.title) { //判断是否有标题
				document.title = to.meta.title
			}
			next();
		} else {
			if (to.meta.title) { //判断是否有标题
				document.title = to.meta.title
			}
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				} // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}
	} else {
		next();
	}
})

new Vue({
	router,
	render: h => h(App),
	store
}).$mount('#app')
