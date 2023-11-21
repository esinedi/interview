<template>
	<view class="content">
		<view class="input-top" v-show="Number(option.type_id) == -1">
			<uni-search-bar v-model="option.search" @confirm="searchText">
			</uni-search-bar>
		</view>
		<view class="main">
			<Item v-for="item in list" :key="item._id" :item="item"></Item>
		</view>
		<view v-show="isLoadMore">
			<uni-load-more :status="statusLoad"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import Item from './components/Item.vue'
	export default {
		components: {
			Item
		},
		data() {
			return {
				list: [],
				option: {
					search: ''
				},
				index: 0,
				isLoadMore: false,
				statusLoad: "loading"
			}
		},
		onLoad(option) {
			this.option = option
			let name
			if (Number(this.option.type_id) == -1) {
				name = "搜索"
			} else {
				name = this.option.name
			}
			this.typeSearch()
			uni.setNavigationBarTitle({
				title: name
			});
		},
		// 下拉刷新后触发生命周期
		async onReachBottom() {
			if (!this.isLoadMore) {
				this.isLoadMore = true
				this.index++
				await this.typeSearch()
			}
		},
		methods: {
			typeSearch() {
				uniCloud.callFunction({
					name: 'question-list',
					data: {
						pageIndex: this.index,
						pageSize: 10,
						search: this.option.search || '',
						type_id: this.option.type_id
					}
				})
				.then(res => {
					if (res.result.length === 0) {
						this.isLoadMore = true
						this.statusLoad = 'noMore'
					} else {
						this.isLoadMore = false
						this.list = [
							...this.list,
							...res.result
						]
					}
				}).catch(() => {
					this.isLoadMore = false
				})
			},
			searchText() {
				this.list = []
				this.index = 0
				this.isLoadMore = false
				this.statusLoad = "loading"
				this.typeSearch()
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		display: flex;
		flex-direction: column;
	}
</style>