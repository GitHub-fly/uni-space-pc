<template>
	<div>
		<div class="banner black-theme ba-yy-b">
			<div class="banner-tool"></div>
			<div class="banner-bar ba-xy-c ba-xx-a">
				<div class="avatar warm-theme">
					<div class="ba-xx-c ba-xy-c">
						<p class="fontcolor-dark" >去登陆~</p>
					</div>
				</div>
				<div class="nav ba-xx-a ba-xy-c">
					<router-link to="/dynamic">动态</router-link>
					<router-link to="/photo">相册</router-link>
					<router-link to="/mylog">我的日志</router-link>
				</div>
				
			</div>
		</div>
		<router-view class="container"/>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		created() {},
		methods: {
			
		},
		computed: {}
	};
</script>

<style scoped>
	.banner {
		width: 100%;
		height: 450px;
	}
	
	.banner-tool {
		width: 100%;
		height: 15%;
		border: 1px solid white;
	}
	
	.banner-bar {
		width: 100%;
		height: 50%;
		border: 1px solid white;
	}
	
	.avatar {
		width: 200px;
		height: 200px;
	}
	
	.nav {
		width: 50%;
		height: 40%;
		border: 1px solid white;
	}
	
	.container {
		background-color: rgb(55, 62, 67);
	}
	
	.fontcolor-dark {
		color: gold;
	}
	
	
</style>
