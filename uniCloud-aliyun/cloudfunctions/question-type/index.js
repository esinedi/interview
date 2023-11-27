'use strict';
// 获取面试题类型
const db = uniCloud.database();
exports.main = async (event, context) => {
	const res = await db.collection('type-question').get()
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '获取成功',
		data: {
			result: res.data
		}
	}
};
