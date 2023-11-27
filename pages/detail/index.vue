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
				detail: {
					title: ''
				},
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
		onShareAppMessage(options) {
			var that = this;
			// 设置菜单中的转发按钮触发转发事件时的转发内容
			var shareObj = {
				title: '面试葱',    // 默认是小程序的名称(可以写slogan等)
				path: '/pages/detail/index?id=' + that.option.id,    // 默认是当前页面，必须是以‘/'开头的完整路径
				imageUrl: '',   //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
				success: function(res){
					console.log(res);
				  // 转发成功之后的回调
				  if(res.errMsg == 'shareAppMessage:ok'){
					  uni.showToast({
					  	icon: 'success',
					  	title: '分享成功'
					  })
				  }
				},
				fail: function(){
				  // 转发失败之后的回调
				  if(res.errMsg == 'shareAppMessage:fail cancel'){
					// 用户取消转发
				  }else if(res.errMsg == 'shareAppMessage:fail'){
					// 转发失败，其中 detail message 为详细失败信息
					uni.showToast({
						icon: 'fail',
						title: '分享失败'
					})
				  }
				}
			};
			// 来自页面内的按钮的转发
			// if( options.from == 'button' ){
			// 	var eData = options.target.dataset;
			// 	console.log( eData.id);   // shareBtn
			// 	// 此处可以修改 shareObj 中的内容
			// 	shareObj.path = '/pages/detail/index?id='+eData.id;
			// }
			// 返回shareObj
			return shareObj;
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