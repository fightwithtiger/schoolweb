<template>
	<div>
		<el-form :model="psdForm" :rules="rules" ref="psdForm" label-width="100px">
			<el-form-item label="新密码:" prop="npassword1">
				<el-input v-model="psdForm.npassword1"></el-input>
			</el-form-item>
			<el-form-item label="确认新密码:" prop="npassword2">
				<el-input v-model="psdForm.npassword2"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="m-dialog-footer">
			<!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
			<el-button style="margin-left: 460px !important;" type="primary" @click="changePsdOk">确 定</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'PsdUpdate',
		data() {
			return {
				psdForm: {
					npassword1: '',
					npassword2: ''
				},
				rules: {
					npassword1: [{
						required: true,
						message: '请输入新密码',
						trigger: 'blur'
					}],
					npassword2: [{
						required: true,
						message: '请再输入一次新密码',
						trigger: 'blur'
					}],
				}
			}
		},
		methods: {
			changePsdOk() {
				if (this.psdForm.npassword1 === this.psdForm.npassword2) {
					this.axios.post('/staff/changepsd', {
						number: this.$store.state.number,
						password: this.psdForm.npassword1
					}).then((res) => {
						console.log(res);
						this.psdForm.npassword1 = '';
						this.psdForm.npassword2 = '';
						this.$emit('closeDia', false);
						// this.dialogVisible = false;
					})
				} else {
					this.$message.error('两次输入的密码不一致');
				}
			}
		}
	}
</script>

<style lang="scss">
	.m-dialog-footer{
		
	}
</style>
