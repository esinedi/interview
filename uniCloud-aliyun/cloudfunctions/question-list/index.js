'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	let res
	if (event.type_id == -1) {
		res = await db.collection('fe-question')
		.where({
			title: new RegExp(event.search)
		})
		.skip(event.pageIndex * event.pageSize) // 跳过前20条
		.limit(event.pageSize) // 获取10条.get()
		.get()
	} else {
		res = await db.collection('fe-question')
		.where({
			type_id: Number(event.type_id)
		})
		.skip(event.pageIndex * event.pageSize) // 跳过前20条
		.limit(event.pageSize) // 获取10条.get()
		.get()
	}
	
	//返回数据给客户端
	return res.data
};
