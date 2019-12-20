<template>
	<div>
		<v-card v-for="card in cards" :key="card.title" class="mx-auto d-flex" width="80%" outlined>
			<v-row class="spacer">
				<v-col cols="3" align="center">
					<v-avatar size="80px"><img alt="用户头像" :src="card.src" /></v-avatar>
				</v-col>
				<v-col cols="6" justify="center" height="100%">
					<span v-text="card.title"></span>
					<span v-text="card.address"></span>
				</v-col>
				<v-col cols="3">
					<v-card-actions>
						<v-btn text>接受</v-btn>
						<v-btn text>拒绝</v-btn>
						<v-btn text>忽略</v-btn>
					</v-card-actions>
				</v-col>
			</v-row>
		</v-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			cards: [
				{ title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', address: '江苏南京' },
				{ title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', address: '北京市' },
				{ title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', address: '重庆市' }
			]
		};
	},

	created() {},

	methods: {},

	computed: {}
};
</script>

<style scoped>
	span {
		display: block;
	}
</style>

