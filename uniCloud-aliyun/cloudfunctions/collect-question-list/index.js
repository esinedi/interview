'use strict';
const { verifyToken } = require("wx-common");
const db = uniCloud.database();
const collectMsg = db.collection('user-collect');
exports.main = async (event, context) => {
	// 获取 token
	const token = verifyToken(event.token)
	const data = {
		code: 200,
		msg: '操作成功',
		data: {
			result: []
		}
	}
	let res
	if(token) {
		res = await collectMsg.aggregate()
			.match({
			  openid: event.openid
			})
			.lookup({
				from: 'fe-question',
				localField: 'feid',
				foreignField: '_id',
				as: 'collectList',
			})
			.skip(event.pageIndex * event.pageSize) // 跳过前20条
			.limit(event.pageSize) // 获取10条.get()
			.end()
		data.data.result = res.data
	}else {
		data.code = 203
		data.msg = '操作失败'
	}
	
	//返回数据给客户端
	return data
};
