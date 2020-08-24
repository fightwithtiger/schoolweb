<template>
	<el-card class="m-room-item">
		<div class="m-item-wrapper">
			<div class="m-room-item-left">
				<div class="m-room-num"><i class="el-icon-s-home"></i>房间号：{{hotItem.number}}</div>
				<div class="m-room-staff"><i class="el-icon-user-solid"></i>负责人：{{hotItem.staffNumber}}</div>
				<el-image class="m-room-image" :src="hotItem.image" fit="fill"></el-image>
			</div>
			<el-divider class="m-room-divider" direction="vertical"></el-divider>
			<div class="m-room-item-right">
				<div class="m-room-hot"><span class="icon iconfont">&#xe634;</span>热度：{{hotItem.hot}}</div>
				<div class="m-room-rest"><span class="icon iconfont">&#xe605;</span>剩余次数：{{hotItem.restTimes}}</div>
				<div class="m-room-app-btn">
					<el-button @click="goToApp(hotItem.number)" size="small" plain :disabled="hotItem.restTimes == 0? true: false" :type="hotItem.restTimes == 0? 'info': 'primary'">
						{{hotItem.restTimes == 0? '预约已达上限': '开始预约'}}
					</el-button>
				</div>
			</div>
		</div>
	</el-card>
</template>K

<script>
	export default {
		name: 'HotItem',
		props: ['hotItem'],
		methods: {
			goToApp(roomNumber){
				this.$emit('changeRoom', roomNumber);
			}
		}
	}
</script>

<style lang="scss">
	.m-room-item {
		width: 350px;
		height: 200px;
		margin-bottom: 20px;
		
		.m-item-wrapper{
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			color: #909399;
			
			.m-room-divider{
				height: 170px;
				opacity: 0.6;
			}
			
			.m-room-item-left{
				width: 180px;
				
				.m-room-num{
					font-size: 14px;
					height: 24px;
					line-height: 24px;
					
				}
				.m-room-staff{
					font-size: 14px;
					height: 24px;
					line-height: 24px;
				}
				.m-room-image{
					width: 160px;
					height: 100px;
					margin-top: 10px;
				}
			}
			.m-room-item-right{
				width: 120px;
				
				.m-room-hot{
					font-size: 14px;
					height: 24px;
					line-height: 24px;
					margin-top: 40px;
					margin-left: 20px;
				}
				.m-room-rest{
					margin-top: 10px;
					margin-left: 20px;
					font-size: 14px;
					height: 24px;
					line-height: 24px;
				}
				.m-room-app-btn{
					text-align: center;
					margin-top: 30px;
				}
			}
		}
	}
</style>
