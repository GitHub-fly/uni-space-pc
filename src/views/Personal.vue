<template>
	<v-container>
		<v-row>
			<v-expansion-panels popout>
				<v-expansion-panel v-for="(message, i) in messages" :key="i" hide-actions>
					<v-expansion-panel-header ripple>
						<v-row align="center" class="spacer" no-gutters>
							<v-col cols="4" sm="2" md="1">
								<v-avatar size="80px">
									<img v-if="user.avatar" :alt="user.nickname" :src="user.avatar" />
									<v-icon v-else :color="message.color" v-text="message.icon"></v-icon>
								</v-avatar>
							</v-col>

							<v-col class="hidden-xs-only" sm="5" md="4" justify="center">
								<strong v-html="user.nickname"></strong>
								<br />
								<br />
								<span v-if="user.constellation" class="grey--text">&nbsp;({{ user.constellation }})</span>
							</v-col>

							<v-col class="text-no-wrap" cols="5" sm="3"><strong v-html="message.title"></strong></v-col>

							<v-col class="grey--text text-truncate hidden-sm-and-down">&mdash; 文章数 {{ user.journalSum }}</v-col>
						</v-row>
					</v-expansion-panel-header>

					<v-expansion-panel-content>
						<v-divider></v-divider>
						<v-card-text v-text="user.introduction"></v-card-text>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-row>

		<v-row>
			<v-col cols="12">
				<v-card class="mx-auto" max-width="100%">
					<v-img class="#353535--text align-end" height="200px" :src="getImage(journals[0].thumbnail)">
						<v-card-title v-text="journals[0].title"></v-card-title>
					</v-img>

					<v-card-subtitle class="pb-0">{{ journals[0].createTime }}</v-card-subtitle>

					<v-card-text class="text--primary">
						<div>Whitehaven Beach</div>

						<div>Whitsunday Island, Whitsunday Islands</div>
					</v-card-text>

					<v-card-actions>
						<v-btn color="orange" text>{{ journals[0].likes }} 人喜欢</v-btn>

						<v-btn color="orange" text>{{ journals[0].comments }} 人浏览</v-btn>

						<v-spacer></v-spacer>

						<v-btn icon><v-icon>mdi-heart</v-icon></v-btn>

						<v-btn icon><v-icon>mdi-bookmark</v-icon></v-btn>

						<v-btn icon><v-icon>mdi-share-variant</v-icon></v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>

		<v-row>
			<v-col v-for="card in journals.slice(1)" :key="card.title" cols="4">
				<v-card :elevation="hover ? 12 : 2" class="mx-auto" max-width="100%">
					<v-img class="white--text align-end" height="200px" :src="getImage(card.thumbnail)"><v-card-title v-text="card.title"></v-card-title></v-img>

					<v-card-subtitle class="pb-0">{{ card.createTime }}</v-card-subtitle>

					<v-card-text class="text--primary">
						<div>Whitehaven Beach</div>

						<div>Whitsunday Island, Whitsunday Islands</div>
					</v-card-text>

					<v-card-actions>
						<v-btn color="orange" text>{{ card.likes }} 人喜欢</v-btn>

						<v-btn color="orange" text>{{ card.comments }} 人浏览</v-btn>

						<v-spacer></v-spacer>

						<v-btn icon><v-icon>mdi-heart</v-icon></v-btn>

						<v-btn icon><v-icon>mdi-bookmark</v-icon></v-btn>

						<v-btn icon><v-icon>mdi-share-variant</v-icon></v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data: () => ({
		user: {},
		messages: [
			{
				num: '文章数23',
				icon: 'NUI',
				color: '#e06c61'
			}
		],
		journals: [],
		cards: [
			// { title: '', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
			// { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 4 },
			// { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 4 },
			// { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 4 }
		]
		// lorem: '喜欢桉树叶。此处「桉树叶」是指代某个人。 ...'
	}),

	created() {
		// 获取网页地址url
		var query = window.location.href;
		// 锁定到最后一个"/"的位置
		var begin = query.lastIndexOf('/') + 1;
		// 取出地址中最后的id值
		var userId = query.substring(begin);
		// 获取该好友的基本信息
		this.axios({
			method: 'post',
			url: this.GLOBAL.baseUrl + '/user/id',
			data: JSON.stringify({
				id: userId
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => {
			this.user = res.data.data;
		});
		// 获取该好友的日志信息
		this.getUserJournals(userId);
	},

	methods: {
		getUserJournals(id) {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/friend/journal/key',
				data: JSON.stringify({
					fromId: id
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				this.journals = res.data.data;
			});
		},
		// 图片缓存的方法
		getImage(url) {
			return 'http://images.weserv.nl/?url=' + url;
		}
	},

	computed: {}
};
</script>

<style scoped>
.personal-page {
	width: 80%;
}

span {
	display: block;
}
</style>
