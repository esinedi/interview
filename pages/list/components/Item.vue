<template>
	<view class="item" @click="handleDetail(item._id)">
		<view class="item-title">
			<view class="item-level">
				<view class="item-span">
					难度：
				</view>
				<view class="item-show">
					<image v-for="i in Math.floor(item.level % 5)" :key="'shi' + i" src="../../../static/img/list/1.png" mode="widthFix"></image>
					<image v-show="(item.level - Math.trunc(item.level)) > 0" src="../../../static/img/list/0.5.png" mode="widthFix"></image>
					<image v-for="i in (5 - Math.ceil(item.level % 5))" :key="'kong' + i" src="../../../static/img/list/0.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="item-name">
				问答题
			</view>
		</view>
		<view class="item-main">
			{{ item.title }}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Item',
		data() {
			return {
				
			}
		},
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		methods: {
			handleDetail(id) {
				uni.navigateTo({
					url: '/pages/detail/index?id=' + id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.item {
		.item-title {
			padding: 10rpx 20rpx;
			background: rgb(26, 115, 232);
			color: #fff;
			font-size: 16rpx;
			overflow:hidden;
			.item-level {
				float: left;
				display: flex;
				.item-show {
					image {
						width: 20rpx;
					}
				}
			}
			.item-name {
				float: right;
			}
		}
		.item-main {
			padding: 30rpx 50rpx;
		}
	}
</style>