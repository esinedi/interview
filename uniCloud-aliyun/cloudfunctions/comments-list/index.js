'use strict';
// 获取文章评论信息
const db = uniCloud.database();
exports.main = async (event, context) => {
	// 使用聚合操作，一次性获取一级评论和对应的所有二级评论
	const comments = await db.collection('fe-comments').aggregate()
	.match({
	  openid: event.openid
	})
	.sort({
	  createTime: 1 // 按时间升序排列
	})
	.end();
	// 构建评论树
	const commentTree = buildCommentTree(comments.data);
	//返回数据给客户端
	return commentTree
};

// 自定义评论树方法
function buildCommentTree(comments) {
  const commentMap = new Map();
  const commentTree = [];

  comments.forEach(comment => {
    comment.replies = [];
    commentMap.set(comment._id, comment);
    if (!comment.parentId) {
      // 没有parentId说明是一级评论
      commentTree.push(comment);
    } else {
      // 有parentId说明是回复，加入对应一级评论的replies数组中
      const parentComment = commentMap.get(comment.parentId);
      if (parentComment) {
        parentComment.replies.push(comment);
      }
    }
  });

  return commentTree;
}
