<template>
	<div class="m-container">
		<div class="m-content">
			<el-carousel style="margin-top: 60px;" :interval="4000" type="card" height="450px">
				<el-carousel-item v-for="item in imgList" :key="item">
					<el-image :src="item"></el-image>
				</el-carousel-item>
			</el-carousel>
			<div class="m-desc">
				<el-divider><i class="el-icon-s-opportunity"></i>新闻焦点</el-divider>
				<desc-item></desc-item>
			</div>
			<div class="m-room">
				<el-divider><i class="el-icon-s-management"></i>预约会议室</el-divider>
				<div class="m-room-op">
					<div class="m-room-find">
						<el-select @change="getRoomApp" v-model="roomNumber" filterable placeholder="请选择会议室">
							<el-option v-for="(item, index) in roomList" :key="index" :label="item.number" :value="item.number">
							</el-option>
						</el-select>
					</div>
					<div class="m-room-time">
						<div>
							<el-date-picker value-format="yyyy-MM-dd" v-model="day" type="date" placeholder="选择日期">
							</el-date-picker>
						</div>
						<div>
							<el-time-select placeholder="起始时间" v-model="startTime" :picker-options="{
							start: '08:30',
							step: '00:15',
							end: '18:30'
							}">
							</el-time-select>
						</div>
						<div>
							<el-time-select placeholder="结束时间" v-model="endTime" :picker-options="{
							start: '08:30',
							step: '00:15',
							end: '18:30',
							minTime: startTime
							}">
							</el-time-select>
						</div>
					</div>
					<div class="m-room-desc">
						<el-input type="textarea" v-model="desc"></el-input>
					</div>
					<el-button @click="makeApp" class="m-room-ok" type="primary" icon="el-icon-check" circle></el-button>
				</div>
				<div v-if="op == 'hot'" class="m-room-container">
					<hot-item @changeRoom="changeOptin" v-for="(item,index) in hotList" :key="index" :hotItem="item"></hot-item>
				</div>
				<div  v-if="op == 'app'" class="m-room-container">
					<app-item v-for="(item,index) in appList" :key="index" :appItem="item"></app-item>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import HotItem from '../components/HotItem.vue'
	import AppItem from '../components/AppItem.vue'
	import DescItem from '../components/DescItem.vue'
	export default {
		name: 'Index',
		components: {
			HotItem,
			AppItem,
			DescItem
		},
		data() {
			return {
				roomNumber: '',
				roomList: [],
				day: '',
				startTime: '',
				endTime: '',
				desc: '',
				hotList: [],
				appList: [],
				op: 'hot',
				imgList: [
					'https://picsum.photos/id/1003/800/450',
					'https://picsum.photos/id/1014/800/450',
					'https://picsum.photos/id/1047/800/450',
					'https://picsum.photos/id/1062/800/450',
				]
			}
		},
		mounted() {
			this.getHotList();
			this.getRoomList();
		},
		methods: {
			getHotList() {
				this.axios.get('/room/hotlist', {
					params: {
						num: 8
					}
				}).then(res => {
					// console.log(res);
					this.hotList = res.data.hotList;
				});
			},
			getRoomList() {
				this.axios.get('/room/getall').then(res => {
					// console.log(res);
					this.roomList = res.data.roomList;
				});
			},
			getRoomApp(roomNumber) {
				this.op = 'app';
				this.axios.get('/app/getlistbyroom', {
					params: {
						roomNumber: roomNumber
					}
				}).then(res => {
					// console.log(res);
					this.appList = res.data.appList;
				});
			},
			changeOptin(roomNumber) {
				this.roomNumber = roomNumber;
				this.getRoomApp(roomNumber);
			},
			makeApp() {
				// console.log(this.startTime);
				if(this.roomNumber !== '' && this.startTime !== '' && this.endTime !== '' && this.day !== ''){
					this.axios.post('/app/insert', {
						staffNumber: this.$store.state.number,
						roomNumber: this.roomNumber,
						desc: this.desc,
						startTime: this.day + ' ' + this.startTime,
						endTime: this.day + ' ' + this.endTime
					}).then(res => {
						console.log(res);
						if(res.msg === '预约成功！'){
							this.$store.dispatch('addNewMsgNum', this.$store.state.newMsgNum + 1);
							// this.$store.state.newMsgNum = this.$store.state.newMsgNum + 1;
							// 刷新页面为了让header里的消息提示加一
							this.$router.go(0);
							this.$message.success('提交成功，请进入个人中心查看预约进度');
						}else{
							this.$message.error(res.msg);
						}
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.m-container {
		width: 100%;
		height: 1800px;
		// background-image: url('../assets/images/bg2.png');

		.m-content {
			width: 1600px;
			margin: 0 auto;

			.m-room {
				width: 100%;
				margin-top: 80px;
				margin-bottom: 50px;
				height: 800px;
				

				.m-room-op {
					display: flex;
					justify-content: left;
					margin-top: 30px;
					margin-bottom: 30px;

					.m-room-find {
						margin-left: 30px;
						margin-bottom: 20px;
						width: 300px;
						display: flex;
					}

					.m-room-time {
						width: 700px;
						display: flex;
						justify-content: space-between;
					}
					
					.m-room-desc{
						margin-left: 30px;
						width: 240px;
						height: 40px;
					}

					.m-room-ok {
						margin-left: 30px;
						width: 40px;
						height: 40px;
					}
				}

				.m-room-container {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
				}
			}
		}
	}
</style>
