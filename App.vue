<script>
	export default {
		onLaunch: function() {
			const token = uni.getStorageSync('token');
			const openid = uni.getStorageSync('userInfo').openid;
			// 调用 token 检测云函数
			uniCloud.callFunction({
				name: 'token-check',
				data: {
					token: token,
					openid: openid
				},
				success: res => {
					console.log(res);
					if (!res.result.token) {
						uni.removeStorageSync('token');
						uni.removeStorageSync('userInfo');
					} else {
						uni.setStorageSync('token', res.result.token)
					}
				}
			});
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
</style>
