'use strict';
exports.main = async (event, context) => {
	
	const db = uniCloud.database();
	const res = await db.collection('type-question').get()
	
	//返回数据给客户端
	return res.data
};