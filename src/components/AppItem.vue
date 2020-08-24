<template>
	<el-card class="m-app-item">
		<div class="m-item-wrapper">
			<div class="m-app-room">
				<i class="el-icon-s-home"></i>房间号：{{appItem.roomNumber}}
				<span style="float: right;"><el-tag :type="appItem.status == 0? 'success': 'warning'">{{appItem.status == 0? '生效': '待审核'}}</el-tag></span>
			</div>
			<el-divider></el-divider>
			<div class="m-app-num"><i class="el-icon-s-order"></i>预约单号：{{appItem.number}}</div>
			<el-divider></el-divider>
			<div class="m-app-time"><i class="el-icon-message-solid"></i>预约时间：{{appItem.startTime}}~~{{appItem.endTime}}</div>
			<el-divider></el-divider>
		</div>
	</el-card>
</template>

<script>
	export default {
		name: 'AppItem',
		props: ['appItem'],
	}
</script>

<style lang="scss">
	.m-app-item {
		width: 350px;
		height: 200px;
		margin-bottom: 20px;

		.m-item-wrapper {
			width: 100%;
			height: 100%;
			color: #909399;

			.m-app-num {
				font-size: 14px;
				height: 15px;
				line-height: 15px;
			}

			.m-app-room {
				font-size: 14px;
				height: 15px;
				line-height: 15px;
			}
			
			.m-app-time {
				font-size: 14px;
				height: 15px;
				line-height: 15px;
			}
		}
	}
</style>
