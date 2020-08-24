<template>
	<el-row class="m-header">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
		active-text-color="#ffd04b">
			<el-col :span="16">
				<el-menu-item index="1" @click="navToPage(1)" class="m-nav-title">
					<el-image style="width: 30px; height: 30px;" :src="require('../assets/images/logo.png')" fit="fill"></el-image>
					仌仌仌仌企业员工服务平台
				</el-menu-item>
			</el-col>
			<el-col :span="6">
				<el-menu-item index="2" class="m-nav-wel">
					欢迎工号:{{number+" "}}姓名:{{" "+username+" "}}
				</el-menu-item>
			</el-col>
			<el-col :span="2" class="m-nav-avatar">
				<el-submenu index="3">
					<template slot="title">
						<el-avatar style="margin-left: 20px;" size="medium" :src="avatar" shape="circle"></el-avatar>
					</template>
					<el-badge v-if="newMsgNum != 0" :value="newMsgNum" class="item">
						<el-menu-item @click="navToPage(3)" index="3-1"><i class="el-icon-user"></i>个人中心</el-menu-item>
					</el-badge>
					<el-menu-item @click="navToPage(3)" v-if="newMsgNum <= 0" index="3-1"><i class="el-icon-user"></i>个人中心</el-menu-item>
					<el-menu-item @click="navToPage(4)" index="3-2"><i class="el-icon-switch-button"></i>退出登录</el-menu-item>
				</el-submenu>
			</el-col>
			<!-- <el-col :span="2">
				<el-menu-item index="4" @click="navToPage(3)" class="m-logout-btn">退出</el-menu-item>
			</el-col> -->
		</el-menu>
	</el-row>
</template>

<script>
	export default {
		name: 'NavHeader',
		data() {
			return {
				number: this.$store.state.number || -1,
				username: this.$store.state.username || '',
				avatar: this.$store.state.avatar || '',
				activeIndex: '1',
				newMsgNum: this.$store.state.newMsgNum || 0
			};
		},
		methods: {
			navToPage(key) {
				switch (key) {
					case 1:
						this.$router.push('/index');
						break;
					case 3:
						this.$store.dispatch('addNewMsgNum', 0);
						this.$router.push('/personal');
						this.$router.go(0);
						break;
					case 4:
						this.axios.get('/staff/logout').then((res) => {
							this.$cookie.set('number', '', {
								expires: '-1'
							});
							this.$store.dispatch('saveStaffNum', -1);
							this.$store.dispatch('saveUsername', '');
							this.$store.dispatch('saveAvatar', '');
							// this.$store.dispatch('addNewMsgNum', 0);
							this.$router.push('/login');
							this.$message.success(res.msg);
						});
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	.el-menu-item.is-disabled {
		opacity: 0.75 !important;
	}

	.m-header {
		width: 100%;
		text-align: center;

		.m-nav-title {
			// margin-left: 40px !important;
			float: left;
			margin-left: 130px;
			font-size: 22px;
			font-weight: bold;
		}

		.m-navbar {
			display: flex;
			justify-content: center;
		}

		.m-nav-item {
			font-size: 18px;
			font-weight: bold;
		}

		.m-nav-wel {
			font-size: 14px;
			font-weight: bold;
		}

		.m-nav-avatar {
			text-align: center;
		}

		.m-logout-btn {
			font-size: 14px;
			color: white;
		}
	}
</style>
