<template>
	<div class="m-home">
		<div class="m-scroll" :class="{show:isActive}">
			<div id="toTop" @click="toTop(step)">&lt;</div>
		</div>
		<nav-header></nav-header>
		<router-view></router-view>
		<nav-footer></nav-footer>
	</div>
</template>

<script>
	import NavHeader from '../components/NavHeader.vue'
	import NavFooter from '../components/NavFooter.vue'
	export default {
		name: 'Home',
		components: {
			NavFooter,
			NavHeader
		},
		data() {
			return {
				isActive: false
			}
		},
		props: {
			step: { //控制速度
				type: Number,
				default: 30
			}
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll)
		},
		methods: {
			handleScroll() {
				if (document.documentElement.scrollTop > 100) {
					this.isActive = true
				} else {
					this.isActive = false
				}
			},
			toTop(step) {
				//参数step表示时间间隔的幅度大小，以此来控制速度
				//当回到页面顶部的时候需要将定时器清除
				document.documentElement.scrollTop -= step;
				if (document.documentElement.scrollTop > 0) {
					var time = setTimeout(() => this.toTop(step), 15);
				} else {
					clearTimeout(time);
				}
			},
		}
	}
</script>

<style lang="scss">
	.m-home {
		width: 100%;

		.m-scroll {
			position: fixed;
			right: 30px;
			bottom: 60px;
			width: 45px;
			height: 90px;
			cursor: pointer;
			display: none;
		}

		.m-scroll>div {
			width: 60px;
			height: 60px;
			transform: rotate(90deg);
			line-height: 60px;
			text-align: center;
			font-size: 35px;
			font-family: "黑体";
			background-color: rgba(0, 0, 0, .2);
			color: #fff;
		}

		.m-scroll>div:hover {
			background-color: rgba(0, 0, 0, .5);
		}

		.show {
			display: block;
		}

		.m-backtop {
			width: 60px;
			height: 60px;
		}
	}
</style>
