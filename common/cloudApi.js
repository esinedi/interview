function call(option) {
	let token = uni.getStorageSync('token');
	return new Promise((resolve, reject) => {
		if (!option.data) option.data = {};
		if (token) option.data.token = token;
		uni.showLoading({
			mask:true
		});
		uniCloud.callFunction({
			name: option.name,
			data: option.data,
			success: (res) => {
				console.log(res);
				uni.hideLoading();
				if (res.result.code == 200) {
					if (res.result.data.token) {
						token = res.result.data.token;
						uni.setStorageSync('token', res.result.data.token);
					}
					if (option.success) option.success(res.result.data);
					resolve(res.result.data);
				} else if(res.result.code == 201) {
					if (option.fail) option.fail(res);
				} else if(res.result.code == 203) {
					// uni.clearStorageSync();
					uni.showModal({
						title: '温馨提示',
						content: token ? '请重新登录':'请登录,才能正常使用小程序所有功能',
						success(res) {
							uni.switchTab({
								url:'/pages/mine/index'
							})
						}
					})
				}
			},
			fail: (err) => {
				console.log(err);
				uni.hideLoading();
				if (option.fail) option.fail(err);
				reject();
			},
			complete: () => {
				// uni.hideLoading();
				if (option.complete) option.complete();
			}
		});
	});
}
module.exports = {
	call: call
}