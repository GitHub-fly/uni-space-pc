<template>
	<div class="area">
		<div class="hy-index-left" style="width: 16.5%;">
			<v-card height="400" width="100%" class="mx-auto">
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title class="title red--text" style="cursor: default;">UNI-SPAECE</v-list-item-title>
						<v-list-item-subtitle class="orange--text" style="cursor: default;">Merry Christmas</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>

				<v-list dense nav>
					<v-list-item to="/index/journal">
						<!-- <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon> -->
						<v-list-item-icon>
							<svg class="iconf" aria-hidden="true"><use xlink:href="#icon-liwu"></use></svg>
						</v-list-item-icon>
						<v-list-item-content><v-list-item-title>主页</v-list-item-title></v-list-item-content>
					</v-list-item>

					<v-list-item @click="toAlbum()">
						<!-- <v-list-item-icon><v-icon>mdi-image</v-icon></v-list-item-icon> -->
						<v-list-item-icon>
							<svg class="iconf" aria-hidden="true"><use xlink:href="#icon-xueqiao"></use></svg>
						</v-list-item-icon>
						<v-list-item-content><v-list-item-title>相册</v-list-item-title></v-list-item-content>
					</v-list-item>

					<v-list-item to="/music">
						<!-- <v-list-item-icon><i class="iconfont">&#xe6bb;</i></v-list-item-icon> -->
						<v-list-item-icon>
							<svg class="iconf" aria-hidden="true"><use xlink:href="#icon-guaizhangtang"></use></svg>
						</v-list-item-icon>
						<v-list-item-content><v-list-item-title>音乐</v-list-item-title></v-list-item-content>
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
		return {};
	},

	created() {},

	methods: {
		toAlbum() {
			this.$router.push('/index/photoAlbum/' + JSON.parse(localStorage.getItem('user')).id);
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
