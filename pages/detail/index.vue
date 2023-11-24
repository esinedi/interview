<template>
	<view class="content-detail">
		<!-- 导航栏 -->
		<custom-navbar title="面试题"></custom-navbar>
		<!-- 模式切换 -->
		<fixed-fab ref="fixedFab" @emitModel="emitModel"></fixed-fab>
		<!-- 标题 -->
		<view class="title">
			<view class="name">
				{{ detail.title }}
			</view>
			<uni-fav :checked="checked" @click="onClick"/>
		</view>
		<!-- 解答 -->
		<view class="noShow" v-if="noShow" @click="handleShow">
			查看解答
		</view>
		<view v-else>
			<Answer :htmlData="detail.explanation"></Answer>
		</view>
	</view>
</template>

<script>
	import Answer from './components/Answer.vue'
	import FixedFab from '@/components/FixedFab/index.vue'
	export default {
		data () {
			return {
				// id 数据
				option: {},
				// 数据
				detail: {},
				// 展示
				noShow: true,
				// 收藏
				checked: false
			}
		},
		components: {
			Answer,
			FixedFab
		},
		onLoad(option) {
			const that = this
			const openid = uni.getStorageSync('userInfo').openid || ''
			this.$cloudApi.call({
				name: 'question-detail',
				data: {
					id: option.id,
					openid: openid
				}
			})
			.then(res => {
				that.detail = res.result
				that.checked = res.result.collect
				that.option = {
					id: option.id,
					openid: openid
				}
				if(!res.login) {
					that.noShow = true
				}else {
					that.noShow = uni.getStorageSync('userInfo').model == 0
				}
			});
		},
		onHide() {
			this.$refs.fixedFab.close()
		},
		methods: {
			// 展示
			handleShow() {
				if (Object.keys(this.detail).length !== 0) {
					this.noShow = false
				}
			},
			emitModel(e) {
				if(e === 1) {
					this.noShow = false
				}else {
					this.noShow = true
				}
			},
			onClick() {
				let timer = null
				const that = this
				if(!timer) {
					timer = setTimeout(() => {
						that.setCollect()
					}, 200)
				}
			},
			setCollect() {
				const that = this
				this.$cloudApi.call({
					name: 'operate-collect',
					data: {
						feid: that.option.id,
						openid: that.option.openid,
						collect: that.checked
					}
				})
				.then(res => {
					that.checked = res.collect
					if(res.collect) {
						uni.showToast({
							icon: 'success',
							title: '收藏成功'
						})
					}else {
						uni.showToast({
							icon: 'success',
							title: '取消收藏成功'
						})
					}
				})
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.content-detail {
		box-sizing: border-box;
		padding: 10rpx 40rpx;
		.title {
			padding: 20rpx 0rpx;
			font-size: 42rpx;
			font-weight: bold;
			.name {
				margin-bottom: 20rpx;
			}
		}
		.noShow {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			margin: 40rpx 0rpx;
			width: 100%;
			height: 200rpx;
			border-radius: 5rpx;
			font-size: 25rpx;
			background: #f0f0f0;
		}
	}
</style>