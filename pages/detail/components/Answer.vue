<template>
	<view class="content">
		<!-- 默认用法 直接传入md文本即可-->
		<zero-markdown-view :markdown="htmlData"></zero-markdown-view>
	</view>
</template>

<script>
	export default {
		name: 'Answer',
		data () {
			return {
				
			}
		},
		props: {
			htmlData: {
				type: String,
				default: ""
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		
	}
</style>