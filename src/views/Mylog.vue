<template>
	<div>
		<h1>我的日志</h1>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
	
		created() {
			console.log(this.user)
			alert(this.user.id)
		},
	
		methods: {
			
		},
	
		computed: {}
	};
</script>

<style>
</style>
