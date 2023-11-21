<template>
	<view class="content-detail">
		<view class="title">
			{{ detail.title }}
		</view>
		<view class="noShow" v-show="noShow" @click="handleShow">
			查看解答
		</view>
		<view v-show="!noShow">
			<Answer :htmlData="detail.explanation"></Answer>
		</view>
	</view>
</template>

<script>
	import Answer from './components/Answer.vue'
	export default {
		data () {
			return {
				detail: {},
				noShow: true
			}
		},
		components: {
			Answer
		},
		onLoad(option) {
			uniCloud.callFunction({
				name: 'question-detail',
				data: {
					id: option.id
				}
			})
			.then(res => {
				this.detail = res.result[0]
			});
		},
		methods: {
			handleShow() {
				if (Object.keys(this.detail).length !== 0) {
					this.noShow = false
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.content-detail {
		box-sizing: border-box;
		padding: 10rpx 40rpx;
		.title {
			padding: 20rpx 0rpx;
			font-size: 42rpx;
			font-weight: bold;
		}
		.noShow {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			margin: 40rpx 0rpx;
			width: 100%;
			height: 200rpx;
			border-radius: 5rpx;
			font-size: 25rpx;
			background: #f0f0f0;
		}
	}
</style>