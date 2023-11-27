const jwt = require("jsonwebtoken"); //webjsontoken
const appId = 'wxad79c75b3a44647f'
const secret = 'c5d04be6a6419857a25baf7ae84f553a'
//生成token
function getToken(openid) {
	// sign(加密数据，加密辅助，过期时间(单位/s))
	return jwt.sign({ openid }, secret, { expiresIn: 60 * 60 * 24 * 7 });
}
//解密token
function verifyToken(token) {
	return jwt.verify(token, secret, (err, decode) => {
		return decode
	})
}

module.exports = {
	appId,
	secret,
	getToken,
	verifyToken
}