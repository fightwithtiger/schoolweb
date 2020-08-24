<template>
	<div>
		<el-form :model="staffInfo" :rules="rules" ref="staffInfo" label-width="100px">
			<el-form-item label="联系电话:" prop="phone">
				<el-input v-model="staffInfo.phone"></el-input>
			</el-form-item>
			<el-form-item label="电子邮箱:" prop="email">
				<el-input v-model="staffInfo.email"></el-input>
			</el-form-item>
			<el-form-item label="个人简介:" prop="desc">
				<el-input v-model="staffInfo.desc"></el-input>
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
		name: 'InfoUpdate',
		props: ['staffInfo'],
		data() {
			return {
				rules: {
					phone: [{
						required: true,
						message: '请输入联系电话',
						trigger: 'blur'
					}],
					email: [{
						required: true,
						message: '请输入电子邮箱',
						trigger: 'blur'
					}],
				}
			}
		},
		methods: {
			changeInfoOk() {
				this.axios.post('/staff/changeinfo', {
					number: this.$store.state.number,
					phone: this.staffInfo.phone,
					email: this.staffInfo.email,
					desc: this.staffInfo.desc
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
