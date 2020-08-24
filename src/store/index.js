import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
Vue.use(Vuex);

const state = {
	number: '-1', //登录用,
	username: '',
	avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2519824424,1132423651&fm=26&gp=0.jpg',
	newMsgNum: 0
}
export default new Vuex.Store({
	state,
	mutations,
	actions
});
