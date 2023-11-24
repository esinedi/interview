<template>
	<uni-fab
		ref="fab"
		:pattern="pattern"
		:content="content"
		:popMenu="active"
		horizontal="right"
		vertical="bottom"
		@trigger="trigger"
	></uni-fab>
</template>

<script>
export default {
	name: 'FixedFab',
	data () {
		return {
			active: true,
			model: 0,
			pattern: {
				color: '#7A7E83',
				backgroundColor: '#fff',
				selectedColor: '#007AFF',
				buttonColor: '#007AFF',
				iconColor: '#fff'
			},
			content: [{
				iconPath: "https://mp-1df7f1bd-c2d6-43f6-9db4-13eb038c1fc1.cdn.bspapp.com/topic-icon/topic0.png",
				selectedIconPath: "https://mp-1df7f1bd-c2d6-43f6-9db4-13eb038c1fc1.cdn.bspapp.com/topic-icon/topic0.png",
				text: '普通',
				value: 0,
				active: true
			}, {
				iconPath: "https://mp-1df7f1bd-c2d6-43f6-9db4-13eb038c1fc1.cdn.bspapp.com/topic-icon/topic1.png",
				selectedIconPath: "https://mp-1df7f1bd-c2d6-43f6-9db4-13eb038c1fc1.cdn.bspapp.com/topic-icon/topic1.png",
				text: '背题',
				value: 1,
				active: false
			}]
		}
	},
	created() {
		this.model = uni.getStorageSync('userInfo').model || 0
		const index = this.content.findIndex(item => item.value === this.model)
		this.setModel(index);
	},
	methods: {
		trigger(e) {
			const that = this
			const openid = uni.getStorageSync('userInfo').openid || ''
			this.$cloudApi.call({
				name: 'set-user-model',
				data: {
					model: e.item.value,
					openid: openid
				},
				success: res => {
					const userInfo = uni.getStorageSync('userInfo')
					userInfo.model = that.content[e.index].value
					uni.setStorageSync('userInfo', userInfo)
					that.setModel(e.index);
					that.emitModel(userInfo.model);
					that.close()
				}
			})
		},
		setModel(i) {
			this.content.forEach(item => {
				item.active = false
			})
			this.content[i].active = true
		},
		emitModel(model) {
			this.$emit('emitModel', model)
		},
		close() {
			this.$refs.fab.close()
		}
	}
}
</script>

<style>
</style>