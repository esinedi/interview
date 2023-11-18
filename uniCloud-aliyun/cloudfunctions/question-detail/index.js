'use strict';
exports.main = async (event, context) => {
	console.log(event)
	
	const db = uniCloud.database();
	const res = await db.collection('fe-question').where({
		tag: event.tag
	}).get()
	
	//返回数据给客户端
	return res.data
};
