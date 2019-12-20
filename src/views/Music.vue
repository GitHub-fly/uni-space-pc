<template>
	<div class="hy-index-large">
		<div class="hy-index-mid ba-col-6">
			<v-card width="100%">
				<v-list>
					<v-list-item v-for="(music, index) in musics" :key="index">
						<v-list-item-content><v-list-item-title v-text="music.name"></v-list-item-title></v-list-item-content>

						<v-list-item-content>
							<v-list-item-title>--{{ music.singer }}</v-list-item-title>
						</v-list-item-content>

						<v-list-item-icon>
							<v-btn @click="changeColor(index)" class="ma-2" text icon><v-icon :style="{ color: stars[index] ? 'red' : '' }">mdi-star</v-icon></v-btn>
						</v-list-item-icon>
					</v-list-item>
				</v-list>
			</v-card>
		</div>

		<div class="hy-index-rigth ba-col-2"></div>
	</div>
</template>
<script>
import Aplayer from 'vue-aplayer';

export default {
	data() {
		return {
			items: [
				{ icon: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
				{ title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
				{ title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
				{ title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
			],
			musics: [],
			stars: [],
			user: JSON.parse(localStorage.getItem('user'))
		};
	},
	methods: {
		changeColor(index) {
			//已经收藏过的
			if (this.stars[index]) {
				//改变数组状态为false
				this.stars.splice(index, 1, false);
				this.canel(index);
			} else {
				//改变数组状态为true
				console.log(index);
				this.stars.splice(index, 1, true);
				this.colect(index);
			}
		},
		colect(index) {
			this.axios({
				method: 'put',
				url: this.GLOBAL.baseUrl + '/music/add',
				data: JSON.stringify({
					content: this.musics[index].content,
					name: this.musics[index].name,
					singer: this.musics[index].singer,
					userId: this.user.id
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				console.log('收藏成功');
				this.play(index);
			});
		},
		play() {
			this.$router.push('/');
		},

		canel(index) {
			console.log(index);
			console.log(this.user.id);
			var id = index + 17;
			this.axios({
				method: 'delete',
				url: this.GLOBAL.baseUrl + '/music/delete',
				data: JSON.stringify({
					id: id,
					userId: this.user.id
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				console.log('取消成功');
			});
		}
	},
	created() {
		this.axios({
			method: 'get',
			url: this.GLOBAL.baseUrl + '/music/all',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => {
			this.musics = res.data.data.data;
			console.log(this.musics);
			for (var i = 0; i < this.musics.length; i++) {
				if (this.musics[i].userId == this.user.id) {
					this.stars[i] = true;
				} else {
					this.stars[i] = false;
				}
			}
			console.log(this.stars);
			// this.singer = this.musics[0].singer;
			// this.name = this.musics[0].name;
			// this.src = this.musics[0].content;
		});
	}
};
</script>

<style>
	
</style>
