<template>
	<view class="content">
		<view class="input-top">
			<uni-search-bar v-model="search" @confirm="searchText">
			</uni-search-bar>
		</view>
		<!-- :style="[{ gridTemplateRows: `repeat(${Math.ceil(typeList.length/3)}, 350rpx);` }]" ? -->
		<view class="main">
			<view
				class="item"
				v-for="item in typeList"
				:key="item._id"
				@click="handleClickList(item)">
				<image class="item-img" :src="item.icon" mode="heightFix"></image>
				<text class="item-text">{{ item.name }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: [],
				typeList: [],
				search: ''
			}
		},
		onLoad() {
			uniCloud.callFunction({
				name: 'question-type'
			})
			.then(res => {
				this.typeList = res.result.sort((a, b) => a.type_id - b.type_id)
			});
		},
		methods: {
			handleClickList (item) {
				uni.navigateTo({
					url: `/pages/list/index?name=${item.name}&type_id=${item.type_id}`
				})
			},
			searchText () {
				uni.navigateTo({
					url: `/pages/list/index?search=${this.search}&type_id=${-1}`
				})
			},
			cancel() {}
		}
	}
</script>

<style lang="less" scoped>
	.input-top {
		margin: 10rpx 0rpx;
	}
	.main {
		box-sizing: border-box;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(3, 250rpx);
		grid-template-rows: repeat(6, 250rpx);
		border: 0.5rpx solid rgba(0, 0, 0, 0.2);
		.item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border: 0.5rpx solid rgba(0, 0, 0, 0.2);
			.item-img {
				height: 130rpx;
			}
			.item-text {
				margin-top: 10rpx;
				font-size: 16rpx;
			}
		}
	}
</style>
