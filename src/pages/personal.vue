<template>
	<div class="m-personal-container">
		<div class="m-content">
			<el-tabs class="m-personal" tab-position="left" style="height: 600px;">
				<el-tab-pane class="m-personal-item" label="个人资料">
					<div class="m-personal-info">
						<el-col :span="8" class="m-personal-avatar">
							<el-image :preview-src-list="[staffInfo.avatar]" style="border-radius: 50%; width: 120px; height: 120px; margin-bottom: 40px;" :src="staffInfo.avatar"></el-image>
							<div>
								<el-button type="info" @click="changeAvatar">修改头像</el-button>
							</div>
						</el-col>
						<el-col :span="16" class="m-personal-data">
							<div class="m-personal-data-item">姓名：{{staffInfo.username}}</div>
							<div class="m-personal-data-item">员工编号：{{staffInfo.number}}</div>
							<div class="m-personal-data-item">性别：{{staffInfo.gender}}</div>
							<div class="m-personal-data-item">所属部门：{{staffInfo.departName}}</div>
							<div class="m-personal-data-item">联系电话：{{staffInfo.phone}}</div>
							<div class="m-personal-data-item">电子邮箱：{{staffInfo.email}}</div>
							<div class="m-personal-data-item">入职时间：{{staffInfo.createTime}}</div>
							<div class="m-personal-data-item">个人简介：<span style="font-size: 16px;">{{staffInfo.desc}}</span></div>
							<div class="m-personal-op">
								<el-button class="m-personal-info" size="small" type="primary" @click="changeInfo">修改信息</el-button>
								<div class="m-personal-psd" @click="changePsd">修改密码?</div>
							</div>
						</el-col>
					</div>
				</el-tab-pane>
				<el-tab-pane class="m-personal-item" label="预约管理">
					<el-collapse style="margin-bottom: 20px;" accordion v-model="activeNames" @change="handleChange">
						<el-collapse-item v-for="(item, index) in appList" :key="index" :title="'预约单号：' + item.number" :name="index">
							<div class="m-app-data">
								<div>
									<div>预约会议室：{{item.roomNumber}}</div>
									<div>预约时间段：{{item.startTime}}~~{{item.endTime}}</div>
									<div>预约单创建时间：{{item.createTime}}</div>
									<div>其它说明：{{item.desc}}</div>
								</div>
								<div class="m-app-data-status">
									<div>
										<el-tag v-if="item.status == 0" type="success">通过审核</el-tag>
										<el-tag v-if="item.status == 1" type="warning">待审核</el-tag>
										<el-tag v-if="item.status == 2" type="info">已过期</el-tag>
									</div>
									<div style="margin-top: 30px;">
										<el-button @click="cancelApp" size="small" type="danger" :disabled="item.status == 2? true: false">取消订单</el-button>
									</div>
								</div>
							</div>
						</el-collapse-item>
					</el-collapse>
					<paging-btn @newList="getNewAppList" :count="count" :limit="limit" :page="page"></paging-btn>
				</el-tab-pane>
			</el-tabs>
			<el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
				<psd-update v-if="action == 'psd'" @closeDia="closeDia"></psd-update>
				<info-update v-if="action == 'info'" :staffInfo="staffInfo" @closeDia="closeDia"></info-update>
				<avatar-update v-if="action == 'avatar'" :staffInfo="staffInfo" @closeDia="closeDia"></avatar-update>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import PsdUpdate from '../components/PsdUpdate.vue'
	import InfoUpdate from '../components/InfoUpadte.vue'
	import AvatarUpdate from '../components/AvatarUpdate.vue'
	import PagingBtn from '../components/PagingBtn.vue'
	export default {
		name: 'Personal',
		components: {
			PagingBtn,
			PsdUpdate,
			InfoUpdate,
			AvatarUpdate
		},
		data() {
			return {
				page: 1,
				limit: 6,
				count: 0,
				appList: [],
				staffInfo: {},
				dialogVisible: false,
				activeNames: ['0'],
				action: '',
				title: '',
				appIndex: -1
			}
		},
		mounted() {
			this.getStaffInfo();
			this.getStaffAppList();
		},
		methods: {
			getStaffInfo() {
				this.axios.get('/staff/getinfo', {
					params: {
						number: this.$store.state.number
					}
				}).then(res => {
					// console.log(res);
					this.staffInfo = res.data;
				});
			},
			getStaffAppList() {
				this.axios.get('/app/getapplist', {
					params: {
						staffNumber: this.$store.state.number,
						page: this.page,
						limit: this.limit
					}
				}).then(res => {
					// console.log(res);
					this.count = res.data.count;
					this.appList = res.data.appList;
				});
			},
			getNewAppList(newPage) {
				this.axios.get('/app/getapplist', {
					params: {
						staffNumber: this.$store.state.number,
						page: newPage,
						limit: this.limit
					}
				}).then(res => {
					// console.log(res);
					this.page = newPage;
					this.count = res.data.count;
					this.appList = res.data.appList;
				});
			},
			cancelApp() {
				if(this.appIndex !== -1){
					const item = this.appList[this.appIndex];
					// console.log(item);
					this.axios.get('/app/cancelapp', {
						params: {
							appNumber: item.number
						}
					}).then(res => {
						this.appIndex = -1;
						this.page = 1;
						this.getStaffAppList();
						this.$message.success(res.msg);
					});
				}
			},
			changeAvatar() {
				this.action = 'avatar';
				this.title = '修改头像';
				this.dialogVisible = true;
			},
			changeInfo() {
				this.action = 'info';
				this.title = '修改个人信息';
				this.dialogVisible = true;
			},
			changePsd() {
				this.action = 'psd';
				this.title = '修改密码';
				this.dialogVisible = true;
			},
			closeDia(val) {
				if(this.action === 'info' || this.action === 'avatar'){
					this.getStaffInfo();
					this.$store.dispatch('saveAvatar', this.staffInfo.avatar);
				}
				this.dialogVisible = val;
			},
			handleClose(done) {
				done();
			},
			handleChange(val) {
				// console.log(val);
				this.appIndex = val;
			}
		}
	}
</script>

<style lang="scss">
	.el-tabs__item {
		font-size: 18px !important;
		height: 70px !important;
		line-height: 70px !important;
	}
	
	.el-collapse-item__header{
		font-size: 16px !important;
		font-weight: bold !important;
		color: #606266 !important;
	}
	
	.el-collapse-item__content{
		font-size: 14px !important;
		color: #606266 !important;
	}

	.m-personal-container {
		width: 100%;

		.m-content {
			width: 1600px;
			height: 700px;
			margin: 0 auto;

			.m-personal {
				margin-top: 80px;

				.m-personal-item {
					padding: 20px 120px;
					font-size: 16px;
					
					.m-personal-op{
						width: 400px;
						height: 30px;
						line-height: 30px;
						display: flex;
						justify-content: left;
					}
					
					.m-app-data{
						width: 100%;
						display: flex;
						justify-content: space-between;
						
						.m-app-data-status{
							margin-right: 60px;
						}
					}

					.m-personal-info {
						// width: 100%;

						.m-personal-avatar {
							text-align: center;
						}

						.m-personal-data {
							font-size: 20px;
							color: #606266;

							.m-personal-data-item {
								margin-bottom: 20px;
							}

							.m-personal-psd {
								font-size: 12px;
								color: #409EFF;
								cursor: pointer;
								margin-left: 30px;
							}
						}
					}
				}
			}
		}
	}
</style>
