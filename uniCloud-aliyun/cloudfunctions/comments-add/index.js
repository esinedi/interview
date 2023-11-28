'use strict';
// 添加面试题的评论
const { verifyToken } = require("wx-common");
const db = uniCloud.database();
const comments = db.collection('fe-comments');
exports.main = async (event, context) => {
	const {
		feid,
		openid,
		targetOpenid,
		parentId,
		content,
		createTime
		// likeCount,
		// replyCount,
		// isDeleted
	} = event
	
	const token = verifyToken(event.token)
	
	const data = {
		code: 200,
		msg: '添加成功',
		data: {
			result: {}
		}
	}
	
	if(token) {
		await comments.add({
			feid,
			openid,
			targetOpenid,
			parentId,
			content,
			createTime
		})
	}else {
		data.code = 203
		data.msg = '添加失败'
	}
	
	//返回数据给客户端
	return data
};
