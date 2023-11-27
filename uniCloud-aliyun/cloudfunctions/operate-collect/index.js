'use strict';
// 用户收藏面试题
const { verifyToken } = require("wx-common");
const db = uniCloud.database();
const userCollect = db.collection('user-collect');
exports.main = async (event, context) => {
	const token = verifyToken(event.token)
	const data = {
		code: 200,
		msg: '操作成功',
		data: {
			collect: event.collect
		}
	}
	if(token) {
		if(!event.collect) {
			userCollect.add({
				openid: event.openid,
				feid: event.feid
			})
		}else {
			userCollect.where({
				openid: event.openid,
				feid: event.feid
			}).remove()
		}
		data.data.collect = !data.data.collect
	}else {
		data.code = 203
		data.msg = '操作失败'
	}
	
	//返回数据给客户端
	return data
};
