<template>
	<view class="content">
		<!-- 导航栏 -->
		<custom-navbar title="关于我们"></custom-navbar>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="top">
			<view class="message-main">
				<scroll-view scroll-y="true" class="message-scroll">
					<view class="message-black message-title">
						免责声明
					</view>
					<view class="message-black">
						感谢您使用我们的前端面试题小程序！在使用本小程序之前，请仔细阅读以下免责声明。通过访问和使用本小程序，即表示您同意以下条款：
					</view>
					<view class="message-black message-section" v-for="item in sectionList" :key="item.title">
						<text class="message-section-title">
							{{ item.title }}
						</text>
						<text class="message-section-main">
							{{ item.main }}
						</text>
					</view>
					<view class="message-black">
						请在使用本小程序之前仔细阅读并理解上述免责声明。如果您对这些条款有任何疑问，请勿使用本小程序。通过使用本小程序，即表示您已经理解并同意接受这些条款。
					</view>
					<view class="message-black">
						谢谢您的理解和合作！
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<view class="main">
			<view class="text">
				<view class="main-text">
					欢迎来到前端之旅，准备好挑战自己的技术底线了吗？
				</view>
				<view class="main-text">
					我们精心准备了一系列前端面试题，旨在检验你对现代Web开发的了解和技能。
				</view>
				<view class="main-text">
					无论你是初学者还是经验丰富的开发者，我们都希望这个小程序能够成为你前进道路上的得力助手。
				</view>
				<view class="main-text">
					题库不定期更新
				</view>
			</view>
			<text @click="toggle" class="button-text">免责声明</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sectionList: [
					{
						title: '题目内容来源：',
						main: '本小程序提供的前端面试题目和相关解答仅用于学习和测试目的。这些题目的来源可能包括公开的技术文档、开源项目以及一般可在互联网上找到的信息。本小程序的目的是帮助用户测试和提升前端技能。如有侵权，请联系删除。'
					},
					{
						title: '准确性和更新性：',
						main: '我们努力确保提供的题目和解答信息准确、及时更新，但不能保证其绝对准确性和完整性。技术领域的变化可能导致部分信息过时或不再准确。'
					},
					{
						title: '学习效果：',
						main: '尽管本小程序旨在提供有益的学习资源，但我们不能保证用户通过使用本小程序就能够获得某种特定的学习效果或在实际面试中取得成功。'
					},
					{
						title: '个人责任： ',
						main: '使用本小程序的一切风险由用户自行承担。我们不对因使用本小程序而导致的任何直接或间接损失负责，包括但不限于因学习或面试结果而引起的任何损失。'
					},
					{
						title: '技术支持：',
						main: '本小程序可能提供有限的技术支持，但不对用户学习或使用过程中的问题提供担保或承诺。'
					},
					{
						title: '变更和终止： ',
						main: '我们保留在任何时候修改、中断或终止本小程序的权利，无需提前通知。对于由此可能引起的任何不便或损失，我们概不负责。'
					}
				]
			}
		},
		methods: {
			toggle() {
				this.$refs.message.open('top')
			}
		}
	}
</script>

<style lang="less" scoped>
.content {
	padding: 30rpx;
	.main {
		.main-text {
			margin-bottom: 30rpx;
			font-size: 30rpx;
			line-height: 46rpx;
			text-align: justify;
		}
		.button-text {
			color: red;
			text-decoration: underline; /* 文本下划线样式 */
		}
	}
}
.message-main {
	padding: 30rpx;
	padding-top: 150rpx;
	background: #fff;
	.message-scroll {
		height: 600rpx;
	}
	.message-title,
	.message-section-title{
		font-weight: bold;
	}
	.message-black {
		margin-bottom: 30rpx;
	}
}
</style>
