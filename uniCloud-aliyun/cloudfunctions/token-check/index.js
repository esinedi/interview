'use strict';
const {
	getToken,
	verifyToken
} = require("wx-common");
exports.main = async (event, context) => {
	let token = verifyToken(event.token)
	if (token) {
		// 刷新 token
		token = getToken(event.openid)
	}
	
	//返回数据给客户端
	return {
		token
	}
};
