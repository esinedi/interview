'use strict';
// 获取用户模式
const { verifyToken } = require("wx-common");
const db = uniCloud.database();
const users = db.collection('users');
exports.main = async (event, context) => {
	const token = verifyToken(event.token)
	const data = {
		code: 200,
		msg: '操作成功',
		data: {}
	}
	if(token) {
		await users.where({openid: event.openid}).update({
			model: event.model
		})
	}else {
		data.code = 203
		data.msg = '操作失败'
	}
	
	//返回数据给客户端
	return data
};
