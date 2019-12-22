<template>
	<v-container>
		<!-- 当前用户的基本信息 -->
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

							<v-col class="grey--text hidden-sm-and-down">
								<!-- &mdash; 文章数 {{ user.journalSum }} -->
								<v-btn outlined class="mr-3">文章 {{ user.journalSum }}</v-btn>
								<v-btn outlined @click="toAlbum()">
									<v-icon>mdi-image</v-icon>
									相册 {{ user.photoAlbumSum }}
								</v-btn>
							</v-col>
						</v-row>
					</v-expansion-panel-header>

					<v-expansion-panel-content>
						<v-divider></v-divider>
						<v-card-text v-text="user.introduction"></v-card-text>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-row>

		<!-- 第一行的数据 -->
		<v-row v-if="journal != null">
			<v-col cols="12">
				<v-card class="mx-auto" max-width="100%">
					<v-img class="white--text align-end" height="200px" :src="journal.thumbnail"><v-card-title v-text="journal.title"></v-card-title></v-img>

					<v-card-subtitle class="pb-0">{{ journal.createTime }}</v-card-subtitle>

					<v-card-text class="text--primary" v-html="journal.content.substring(0, 80)"></v-card-text>

					<v-card-actions>
						<v-btn color="orange" text>{{ journal.likes }} 人喜欢</v-btn>

						<v-btn color="orange" text>{{ journal.comments }} 人评论</v-btn>

						<v-spacer></v-spacer>
						<v-btn icon @click="likes(journal.id)">
							<v-icon>mdi-heart</v-icon>
						</v-btn>
						<v-btn icon><v-icon>mdi-bookmark</v-icon></v-btn>
						<v-btn icon><v-icon>mdi-share-variant</v-icon></v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
		<!-- 剩下日志数据 -->
		<v-row v-if="journals">
			<v-col v-for="(card, index) in journals.slice(1)" :key="index" cols="4">
				<v-card class="mx-auto" max-width="100%">
					<v-img class="white--text align-end" height="200px" :src="card.thumbnail"><v-card-title v-text="card.title"></v-card-title></v-img>

					<v-card-subtitle class="pb-0">{{ card.createTime }}</v-card-subtitle>

					<v-card-text class="text--primary" v-html="card.content.substring(0, 50)"></v-card-text>

					<v-card-actions>
						<v-btn color="orange" text>{{ card.likes }} 人喜欢</v-btn>

						<v-btn color="orange" text>{{ card.comments }} 人评论</v-btn>

						<v-spacer></v-spacer>

						<v-btn icon @click="likes(card.id)"><v-icon>mdi-heart</v-icon></v-btn>

						<v-btn icon><v-icon>mdi-bookmark</v-icon></v-btn>

						<v-btn icon><v-icon>mdi-share-variant</v-icon></v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
		<v-col v-if="journals == null"><v-card-text>还没有日志哦~</v-card-text></v-col>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			userId: null,
			user: {},
			messages: [
				{
					num: '文章数0',
					icon: 'NUI',
					color: '#e06c61'
				}
			],
			journal: {
				thumbnail: 'https://img9.doubanio.com/view/subject/m/public/s33509866.jpg',
				id: 9
			},
			journals: []
		};
	},
	created() {
		this.initData();
	},
	// 实时监听路由变化
	watch: {
		$route(to, from) {
			this.journals = null;
			//监听路由是否变化
			if (this.$route.params.id) {
				//判断id是否有值
				this.initData();
			}
		}
	},
	methods: {
		// 跳转到指定id用户的相册界面
		toAlbum() {
			this.$router.push('/index/photoAlbum/' + this.userId)
		},
		// 掉接口获取该界面主人的基本信息和日志数据
		initData() {
			// 获取网页地址url
			var query = window.location.href;
			// 锁定到最后一个"/"的位置
			var begin = query.lastIndexOf('/') + 1;
			// 取出地址中最后的id值
			this.userId = query.substring(begin);
			// 获取该好友的基本信息
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/user/id',
				data: JSON.stringify({
					id: this.userId
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				this.user = res.data.data;
			});
			// 获取该好友的日志信息
			this.getUserJournals(this.userId);
		},
		// 点赞操作的方法（可能点赞，可以取消赞）
		likes(journalId) {},
		// 获取好友日志的方法
		getUserJournals(id) {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/friend/journal/key',
				data: JSON.stringify({
					toId: id
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				if (res.data.data != '') {
					this.journals = res.data.data;
					this.journal = this.journals[0];
				} else {
					this.journal = null;
					this.journals = null;
				}
			});
		},
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
