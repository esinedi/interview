<template>
	<view class="content">
		<custom-navbar title="面试葱" :showBack="false"></custom-navbar>
		<view class="input-top">
			<uni-search-bar v-model="search" @confirm="searchText"></uni-search-bar>
		</view>
		<!-- :style="[{ gridTemplateRows: `repeat(${Math.ceil(typeList.length/3)}, 350rpx);` }]" ? -->
		<view class="main">
			<IndexItem v-for="item in typeList" :key="item._id" :item="item"></IndexItem>
		</view>
	</view>
</template>

<script>
	import IndexItem from './components/Item.vue'
	export default {
		data() {
			return {
				title: [],
				typeList: [],
				search: '',
			}
		},
		components: {
			IndexItem
		},
		onLoad() {
			this.$cloudApi.call({
				name: 'question-type'
			})
			.then(res => {
				this.typeList = res.result.sort((a, b) => a.type_id - b.type_id)
			})
		},
		methods: {
			searchText () {
				uni.navigateTo({
					url: `/pages/list/index?search=${this.search}&type_id=${-1}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.main {
		box-sizing: border-box;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(3, 250rpx);
		grid-template-rows: repeat(6, 250rpx);
		border: 0.5rpx solid rgba(0, 0, 0, 0.2);
	}
</style>
