<template>
	<div class="area">
		<div class="hy-index-left" style="width: 16.5%;">
			<v-card height="400" width="100%" class="mx-auto">
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title class="title">Application</v-list-item-title>
						<v-list-item-subtitle>subtext</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>

				<v-list dense nav>
					<v-list-item to="/index/journal">
						<v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
						<v-list-item-content><v-list-item-title>主页</v-list-item-title></v-list-item-content>
					</v-list-item>

					<v-list-item @click="toAlbum()">
						<v-list-item-icon><v-icon>mdi-image</v-icon></v-list-item-icon>
						<v-list-item-content><v-list-item-title>相册</v-list-item-title></v-list-item-content>
					</v-list-item>

					<v-list-item to="/index/music">
						<v-list-item-icon><i class="iconfont">&#xe6bb;</i></v-list-item-icon>
						<v-list-item-content><v-list-item-title>音乐</v-list-item-title></v-list-item-content>
					</v-list-item>
					
					<v-list-item link>
						<v-list-item-icon><v-icon>mdi-widgets</v-icon></v-list-item-icon>
						<v-list-item-content><v-list-item-title>应用</v-list-item-title></v-list-item-content>
					</v-list-item>
				</v-list>
			</v-card>
		</div>

		<router-view class="view" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
	
		created() {
			
		},
	
		methods: {
			toAlbum() {
				this.$router.push('/index/photoAlbum/' + JSON.parse(localStorage.getItem('user')).id)
			}
		},
	
		computed: {}
	};
</script>

<style scoped>
.area {
	display: flex;
}
.view {
	margin-left: 2%;
}
</style>
