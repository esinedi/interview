<template>
	<view class="content">
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				detail: null
			}
		},
		onLoad() {
			uniCloud.callFunction({
			    name: 'question-detail',
			    data: { tag: 'Javascript' }
			  })
			  .then(res => {
			    this.detail = res.result
				console.log(this.detail)
			  });
		},
		methods: {

		}
	}
</script>

<style>
</style>
