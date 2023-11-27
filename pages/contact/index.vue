<template>
	<view class="content">
		<!-- 导航栏 -->
		<custom-navbar title="联系我们"></custom-navbar>
		<view class="wx-block wx-account">
			请添加管理员微信（微信：wxid_hstpllynk0ii22或扫描下方二维码）进行沟通
		</view>
		<view class="wx-block">
			<image class="wx-QR" src="https://mp-1df7f1bd-c2d6-43f6-9db4-13eb038c1fc1.cdn.bspapp.com/wx/QR.jpg" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
.content {
	padding: 80rpx;
	font-size: 30rpx;
	line-height: 50rpx;
	.wx-block {
		margin-bottom: 30rpx;
		.wx-QR {
			width: 100%;
		}
	}
}
</style>
