<template>
	<view
		class="item"
		@click="handleClickList()">
		<image class="item-img" :src="item.icon" mode="heightFix"></image>
		<text class="item-text">{{ item.name }}</text>
	</view>
</template>

<script>
	export default {
		name: "IndexItem",
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
			handleClickList () {
				uni.navigateTo({
					url: `/pages/list/index?name=${this.item.name}&type_id=${this.item.type_id}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		border: 0.5rpx solid rgba(0, 0, 0, 0.2);
		.item-img {
			height: 130rpx;
		}
		.item-text {
			margin-top: 10rpx;
			font-size: 16rpx;
		}
	}
</style>