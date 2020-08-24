<template>
	<div class="m-footer">
		<div class="m-footer-container">
			<div class="m-footer-info">
				<div class="m-footer-row">
					<span class="m-footer-item">Telphone：15896874589</span>
					<el-divider direction="vertical"></el-divider>
					<span class="m-footer-item">Email：228475894@qq.com</span>
					<el-divider direction="vertical"></el-divider>
					<span class="m-footer-item">Author：今晚打老虎</span>
				</div>
				<div class="m-footer-row">
					<span class="m-footer-item">Address：陕西省咸阳市西北农林科技大学nwsf</span>
					<div class="m-footer-item m-footer-qrcode"></div>
				</div>
				<div class="m-footer-row">
					<span class="m-footer-item">Hotline：555-9978-2587</span>
				</div>
				<div class="m-footer-row" style="margin-top:10px; font-size:13px; font-style: italic;">
					<span class="m-footer-item">Copyright © 2020.team name by 今晚打老虎.</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'NavFooter',
		data() {
			return {
				qrcode: '../assets/images/qrcode.png'
			}
		}
	}
</script>

<style lang="scss">
	.m-footer {
		width: 100%;
		height: 250px;
		margin-bottom: 0;
		color: #C0C4CC;
		background-color: #303133;

		.m-footer-container {
			width: 700px;
			// height: 100%;
			margin: 0 auto;
			padding-top: 40px;
			font-size: 14px;
			text-align: center;

			.m-footer-info{
				width: 100%;
				
				.m-footer-row {
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 12px;
					
					.m-footer-item{
						// margin-left: 10px;
					}
					
					.m-footer-qrcode{
						width: 80px;
						height: 80px;
						margin-left: 40px;
						background-image: url('../assets/images/qrcode.png');
					}
				}
			}
		}
	}
</style>
