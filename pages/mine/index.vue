<template>
	<view class="content">
		<!-- 导航栏 -->
		<custom-navbar title="我的" :showBack="false"></custom-navbar>
		<view class="login" v-if="user.openid === undefined">
			<button type="primary" @click="login">请登录</button>
		</view>
		<view class="main" v-else>
			<view class="user">
				<image class="user-image" :src="user.avatarUrl" mode="widthFix"></image>
				<view class="user-name">
					{{ user.nickName }}
				</view>
			</view>
			<uni-list>
				<uni-list-item :showArrow="true" title="我的收藏" to="/pages/list/index?name=我的收藏&type_id=-2"></uni-list-item>
				<uni-list-item :showArrow="true" title="关于我们" to="/pages/about/index"></uni-list-item>
				<uni-list-item :showArrow="true" title="联系我们" to="/pages/contact/index"></uni-list-item>
				<uni-list-item :showArrow="true" title="退出登录" clickable="true" @click="exit"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				user: {
					avatarUrl: '',
					nickName: ''
				}
			}
		},
		onLoad() {
			this.user = uni.getStorageSync('userInfo')
		},
		methods: {
			exit() {
				uni.showModal({
					title: '温馨提示',
					content: '是否退出登录？',
					success(res) {
						if(res.confirm) {
							uni.removeStorageSync('token');
							uni.removeStorageSync('userInfo');
							uni.reLaunch({
								url:'/pages/mine/index'
							})
						}
					}
				})
			},
			login() {
				this.wxLogin()
			},
			wxLogin () {
				let _this = this;
				let code;
				uni.login({
					provider: 'weixin',
					success: res => {
						code = res.code;//获取登录需要的code
					}
				});
				uni.getUserInfo({
					provider: 'weixin',
					success: res => {
						// uni.showLoading();
						let data = res.userInfo;//授权拿到用户信息
						data.code = code;
						console.log(data);
						// 调用登录云函数
						this.$cloudApi.call({
							name: 'weixin-login',
							data,
							success: res => {
								_this.user = res.userInfo
								uni.setStorageSync('token', res.token);
								uni.setStorageSync('userInfo', res.userInfo);
							}
						});
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		width: 100vw;
		height: 100vh;
		background: #f0f0f0;
		.login {
			margin: 30% auto;
			width: 30%;
		}
		.main {
			margin-top: 20rpx;
			padding-top: 30rpx;
			background: #fff;
			.user{
				margin-bottom: 40rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				.user-image {
					width: 150rpx;
					height: 150rpx;
					border-radius: 100%;
				}
				.user-name {
					margin-top: 10rpx;
				}
			}
		}
	}
</style>