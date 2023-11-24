<template>
	<view>
		<view :style="{ height: statusBarHeight + navBarHeight + 'px'}"></view>
		<view class="custom-fixed">
			<view :style="{ height: statusBarHeight + 'px'}"></view>
			<!-- 全局自定义导航栏 -->
			<view class="custom-navbar" :style="{ height: navBarHeight + 'px'}">
				<view class="back-btn" v-if="showBack" @click="navigateBack">
					<image class="back-btn-img" src="@/static/img/navbar/back.png" mode="heightFix"></image>
				</view>
				<view class="title">{{ title }}</view>
			</view>
		</view>
    <!-- 页面内容 -->
    <!-- ... -->
	</view>
</template>

<script>
export default {
	data () {
		return {
			statusBarHeight: 0,
			navBarHeight: 44
		}
	},
	props: {
		title: String, // 标题文字
		showBack: {
			type: Boolean,
			default: true // 是否显示返回按钮，默认为 true
		}
	},
	created() {
		// 获取手机信息
		const info = uni.getSystemInfoSync()
		// 获取状态占位高度
		this.statusBarHeight = info.statusBarHeight
		
		// h5 app mp-ali 限制不使用
		// #ifndef H5 || APP-PLUS || MP-ALIPAY
		// 获取胶囊的位置
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
		// 获取导航栏高度
		this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
		// #endif
	},
	methods: {
		navigateBack() {
			uni.navigateBack({
				fail(err) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
			});
		},
	}
};
</script>

<style lang="less" scoped>
.custom-fixed {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 999;
	background-color: #000;
}
.custom-navbar {
	width: 100%;
	height: 88rpx;
	display: flex;
	align-items: center;
	padding: 0 30rpx;
	.back-btn {
		margin-right: 30rpx;
		height: 45%;
		.back-btn-img {
			height: 100%;
		}
	}
	.title {
		color: #fff;
		font-size: 30rpx;
		font-weight: 400;
	}
}
</style>