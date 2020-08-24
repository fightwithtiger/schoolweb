<template>
	<div class="m-bg">
		<div class="m-login-container">
			<el-form ref="form" label-width="80px" class="m-staff-info">
				<el-form-item>
					<div class="m-staff-info-title">员工登录</div>
				</el-form-item>
				<el-form-item label="">
					<el-input placeholder="请输入账号" background-color="#454545" prefix-icon="el-icon-user" v-model="number"></el-input>
				</el-form-item>
				<el-form-item label="">
					<el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="password" show-password></el-input>
				</el-form-item>
				<br>
				<el-form-item>
					<el-button class="m-login-btn" type="primary" @click="login">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				number: "",
				password: ""
			}
		},
		methods: {
			login() {
				let {
					number,
					password
				} = this;
				this.axios.post('/staff/login', {
					number,
					password
				}).then((res) => {
					console.log(res);
					this.$cookie.set('number', res.data.number, {expires:'Session'});
					this.$store.dispatch('saveStaffNum', res.data.number);
					this.$store.dispatch('saveUsername', res.data.username);
					this.$store.dispatch('saveAvatar', res.data.avatar);
					this.$router.push({
						name: 'index',
						params: {
							from: 'login'
						}
					});
				})
			},
		}
	}
</script>

<style lang="scss">
	.m-bg {
		width: 100%;
		height: 100vh;
		// background-image: url('../assets/images/bg.png');
		background-color: #2d3a4b;

		.m-login-container {
			width: 1000px;
			margin: 0 auto;
			padding-top: 200px;
			
			.el-input__inner {
				color: #DCDFE6;
				border-color: #434f5e;
				background-color: #2d3a4b;
			}

			.m-staff-info {
				width: 400px;
				height: 300px;
				margin-left: 260px;
				color: white;

				.el-form-item__label {
					color: white !important;
				}

				.m-staff-info-title {
					font-size: 24px !important;
					text-align: center;
				}

				.m-login-btn {
					width: 320px !important;
				}
			}
		}
	}
</style>
