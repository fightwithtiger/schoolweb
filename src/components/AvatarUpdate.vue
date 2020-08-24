<template>
	<div>
		<el-form :model="staffInfo" :rules="rules" ref="staffInfo" label-width="100px">
			<el-form-item label="头像地址:" prop="avatar">
				<el-input v-model="staffInfo.avatar"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="m-dialog-footer">
			<!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
			<el-button style="margin-left: 460px !important;" type="primary" @click="changeInfoOk">确 定</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'AvatarUpdate',
		props: ['staffInfo'],
		data() {
			return {
				rules: {
					avatar: [{
						required: true,
						message: '请输入头像的网络地址',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			changeInfoOk() {
				this.axios.post('/staff/changeinfo', {
					number: this.$store.state.number,
					avatar: this.staffInfo.avatar || 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2519824424,1132423651&fm=26&gp=0.jpg'
				}).then((res) => {
					console.log(res);
					this.$emit('closeDia', false);
					// this.dialogVisible = false;
				});
			}
		}
	}
</script>

<style>
</style>
