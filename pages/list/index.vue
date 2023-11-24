<template>
	<view class="content">
		<!-- 导航栏 -->
		<custom-navbar :title="option.name"></custom-navbar>
		<!-- 搜索框 -->
		<view class="input-top" v-show="Number(option.type_id) == -1">
			<uni-search-bar v-model="option.search" @confirm="searchText">
			</uni-search-bar>
		</view>
		<!-- 列表 -->
		<view class="main">
			<ListItem v-for="item in list" :key="item._id" :item="item"></ListItem>
		</view>
		<!-- 上拉刷新 -->
		<view v-show="isLoadMore">
			<uni-load-more :status="statusLoad"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import ListItem from './components/Item.vue'
	export default {
		components: {
			ListItem
		},
		data() {
			return {
				// 列表
				list: [],
				// 搜索信息
				option: {
					name: '',
					search: ''
				},
				// 搜索页面
				index: 0,
				// 上拉搜索信息
				isLoadMore: false,
				statusLoad: "loading"
			}
		},
		onLoad(option) {
			this.option = option
			// 收藏搜索
			if(Number(this.option.type_id) == -2) {
				return
			}
			// 分类和文字搜索
			if(Number(this.option.type_id) == -1) {
				this.option.name = "搜索"
			}
			this.typeSearch()
		},
		onShow() {
			if(Number(this.option.type_id) == -2) {
				this.initData()
				this.collectSearch()
			}
		},
		// 下拉刷新后触发生命周期
		async onReachBottom() {
			if (!this.isLoadMore) {
				this.isLoadMore = true
				this.index++
				if(Number(this.option.type_id) == -2) {
					await this.collectSearch()
					return
				}
				await this.typeSearch()
			}
		},
		methods: {
			typeSearch() {
				this.$cloudApi.call({
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
			collectSearch() {
				const openid = uni.getStorageSync('userInfo').openid || ''
				this.$cloudApi.call({
					name: 'collect-question-list',
					data: {
						pageIndex: this.index,
						pageSize: 10,
						openid: openid
					}
				})
				.then(res => {
					if (res.result.length === 0) {
						this.isLoadMore = true
						this.statusLoad = 'noMore'
					} else {
						this.isLoadMore = false
						res.result.forEach(item => {
							this.list = [
								...this.list,
								...item.collectList
							]
						})
					}
				}).catch(() => {
					this.isLoadMore = false
				})
			},
			searchText() {
				this.initData()
				this.typeSearch()
			},
			initData() {
				this.list = []
				this.index = 0
				this.isLoadMore = false
				this.statusLoad = "loading"
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