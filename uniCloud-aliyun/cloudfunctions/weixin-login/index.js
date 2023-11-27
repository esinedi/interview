'use strict';
// 微信小程序登录
const {
	appId,
	secret,
	getToken,
	verifyToken
} = require("wx-common");
const db = uniCloud.database();
const users = db.collection('users');
exports.main = async (event, context) => {
	const {
		code,
		avatarUrl,
		gender,
		nickName
	} = event
	// 获取 openid
	const api = `https://api.weixin.qq.com/sns/jscode2session?appId=${appId}&secret=${secret}&js_code=${event.code}&grant_type=authorization_code`
	const res = await uniCloud.httpclient.request(api, {
		method: 'GET',
		dataType: 'json'
	})
	// 操控数据库
	// 1，判断是否有用户
	const { data: { openid } } = res
	const countRes = await users.where({openid}).get()
	let model = 0
	// 2，没有则添加用户
	if(countRes.data.length < 1) {
		users.add({
			openid,
			avatarUrl,
			gender,
			nickName,
			model
		})
	}else {
		model = countRes.data[0].model
	}
	// 生成token
	const token = getToken(openid)
	const data = {
		openid,
		avatarUrl,
		gender,
		nickName,
		model
	}
	//返回数据给客户端
	return {
		code: 200,
		msg: '登录成功',
		data: {
			userInfo: data,
			token: token
		}
	}
};
