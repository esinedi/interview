'use strict';
const { verifyToken } = require("wx-common");
const db = uniCloud.database();
exports.main = async (event, context) => {
	// 获取 token
	const token = verifyToken(event.token)
	// 获取详情数据
	const res = await db.collection('fe-question').where({
		_id: event.id
	}).get()
	// 获取收藏信息
	const collectMsg = await db.collection('user-collect').where({
		openid: event.openid,
		feid: event.id
	}).get()
	// 判断是否有收藏
	const collect = collectMsg.data.length !== 0 && token
	const data = {
		...res.data[0],
		collect: collect
	}
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '获取成功',
		data: {
			result: data,
			login: token ? true : false
		}
	}
};
