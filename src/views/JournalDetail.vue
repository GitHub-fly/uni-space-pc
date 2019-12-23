<template>
	<div class="hy-index-large">
		<div class="hy-index-mid">
			<v-card class="mb-4">
				<v-card-text>
					<p class="display-1 text--primary">{{ journal.title }}</p>
					<br />
					<p>作者：{{ journal.nickname }}</p>
					<br />
					<p>发表日期：{{ journal.createTime }}</p>
					<div class="text--primary"><div v-html="journal.content" style="color: #000000;"></div></div>
				</v-card-text>
			</v-card>

			<!-- 评论区 -->
			<!-- 发表评论 -->
			<template>
				<div>
					<v-card>
						<v-card-title>请在下方评论</v-card-title>
						<v-divider></v-divider>
						<v-card class="d-flex flex-row-reverse mb-4 pa-4 pt-0" flat>
							<v-card class="d-flex flex-column mb-6 justify-space-around" flat>
								<v-btn text left large @click="add()">发表</v-btn>
								<v-btn text left large color="error" @click="clear()">取消</v-btn>
							</v-card>
							<v-textarea name="input-7-1" hint="留下你的真实想法吧" placeholder="留下你的真实想法吧" v-model="content"></v-textarea>
						</v-card>
					</v-card>
				</div>
			</template>
			<!-- 所有评论 -->
			<v-card class="mb-4">
				<v-list three-line>
					<v-list-item-title class="headline ml-4">评论</v-list-item-title>
					<v-divider></v-divider>
					<template v-if="comments.length != 0" v-for="(item, index) in comments">
						<v-list-item :key="index">
							<v-list-item-avatar v-if="reviewer[index] != null" size="48"><v-img :src="reviewer[index].avatar"></v-img></v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title>
									<span v-if="reviewer[index] != null">{{ reviewer[index].nickname }}</span>
								</v-list-item-title>
								<v-list-item-title>
									<span>{{ item.content }}</span>
								</v-list-item-title>
								<v-list-item-subtitle v-html="item.createTime"></v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</template>
					<v-card-title v-else>暂无评论</v-card-title>
				</v-list>
			</v-card>
		</div>

		<!-- 界面右侧 -->
		<div class="hy-index-rigth">
			<!-- 日志缩略图 -->
			<v-card class="mx-auto journalThumbnail">
				<div class="img">
					<img :src="journal.thumbnail" />
				</div>
			</v-card>

			<!-- 日志详情页右侧作者信息栏 -->
			<v-card class="mx-auto" width="100%" style="margin-top: 2%;" outlined :elevation="2">
				<v-list-item three-line>
					<v-list-item-content>
						<v-list-item-title class="headline mb-1">{{ journal.nickname }}</v-list-item-title>
						<v-list-item-subtitle>{{ journal.introduction }}</v-list-item-subtitle>
					</v-list-item-content>

					<v-list-item-avatar tile size="80" color="grey"><img :src="journal.avatar" /></v-list-item-avatar>
				</v-list-item>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text @click="toHome(journal.userId)">进入主页</v-btn>
				</v-card-actions>
			</v-card>

			<!-- 推荐日志信息展示 -->
			<v-card class="mx-auto" width="100%" style="margin: 2%;" v-for="(jou, index) in manyjournal.slice(0, end)" :key="index">
				<v-img v-if="jou.thumbnail" class="white--text align-end" height="200px" :src="jou.thumbnail">
					<v-card-title>{{ jou.title }}</v-card-title>
				</v-img>
				<v-card-text class="text--primary"></v-card-text>
				<div v-if="jou.content" v-html="jou.content.substring(0, 50) + '.....'" style="text-indent: 2em; margin-left: -25px; padding-right: 30px;"></div>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="orange" text @click="journaldetail(jou.id)">查看详情</v-btn>
				</v-card-actions>
			</v-card>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			content: null,
			end: 3,
			journal: [],
			user: [],
			manyjournal: [],
			comments: [],
			// 该日志的所有评论者
			reviewer: []
		};
	},
	methods: {
		// 添加评论
		add() {
			if (this.content) {
				this.axios({
					method: 'post',
					url: this.GLOBAL.baseUrl + '/comment/add',
					data: JSON.stringify({
						journalId: this.journal.id,
						userId: JSON.parse(localStorage.getItem('user')).id,
						content: this.content
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(res => {
					// 评论内容
					this.comments.splice(0, 0, {
						createTime: new Date().toLocaleString(),
						content: this.content
					});
					// 评论者数组
					this.reviewer.push({
						avatar: JSON.parse(localStorage.getItem('user')).avatar,
						nickname: JSON.parse(localStorage.getItem('user')).nickname
					});
					console.log('评论成功');
					this.content = '';
				});
			} else {
				alert('请输入内容');
			}
		},
		// 清除评论框内容
		clear() {
			this.content = '';
		},
		// 获取评论
		getComments(journalId) {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/comment/',
				data: {
					journalId: journalId
				},
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				this.comments = res.data.data;
				// 将接口中取到的所有用户id拿出来去调取"获取用户信息的接口方法"
				for (var i = 0; i < this.comments.length; i++) {
					this.getUserInformation(this.comments[i].userId);
				}
			});
		},
		// 获取此篇日志的详情
		getDetail(id) {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/journal/user/journaldetail/' + id
			}).then(res => {
				this.journal = res.data.data;
			});
		},
		// 获取推荐日志数据
		getmorejournal() {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/journal/recoomendJournal/data',
				data: {
					id: JSON.parse(localStorage.getItem('user')).id
				}
			}).then(res => {
				this.manyjournal = res.data.data;
			});
		},
		// 获取该篇文章的主人信息
		getUser() {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/user/id',
				data: {
					id: JSON.parse(localStorage.getItem('user')).id
				}
			}).then(res => {
				this.user = res.data.data;
			});
		},
		// 跳转个人中心页面
		toHome(id) {
			this.$router.push('/personal/' + id);
		},
		// 获取指定id用户的信息方法
		getUserInformation(id) {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/user/id',
				data: {
					id: id
				},
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				this.reviewer.splice(0, 0, res.data.data);
			});
		},
		// 进入日志详情页面
		journaldetail(id) {
			this.$router.push('/index/journal/detail/' + id);
		},

		// 滚动条监听方法
		scrollDs() {
			//变量scrollTop是滚动条滚动时，距离顶部的距离
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			//变量windowHeight是可视区的高度
			var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
			//变量scrollHeight是滚动条的总高度
			var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
			//滚动条到底部的条件
			if (scrollTop + windowHeight + 3 >= scrollHeight) {
				this.loadMore();
			}
		},
		loadMore() {
			this.end += 5;
		},
		// 界面数据初始化方法
		initData() {
			// 获取网页地址url
			var query = window.location.href;
			// 锁定到最后一个“/”的位置
			var begin = query.lastIndexOf('/') + 1;
			// 取出地址中最后的id值
			var journalId = query.substring(begin);
			// 获取此日志的详情
			this.getDetail(journalId);
			// 获取更多推荐日志信息
			this.getmorejournal();
			// 获取日志主人信息
			this.getUser();
			// 获取该篇日志的评论数据
			this.getComments(journalId);
		}
	},
	created() {
		this.initData();
	},

	// 实时监听路由变化
	watch: {
		$route(to, from) {
			//监听路由是否变化
			if (this.$route.params.id) {
				//判断id是否有值
				this.initData();
				//变量scrollTop是滚动条滚动时，距离顶部的距离
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				scrollTop = 0;
			}
		}
	},

	mounted() {
		window.addEventListener('scroll', this.scrollDs);
	}
};
</script>

<style scoped>
	.journalThumbnail {
		width: 100%;
		height: 350px;
	}
	.img, img {
		border-radius: 3px;
		height: 100%;
		width: 100%;
	}
	
	
	
	
.hy-index-large {
	width: 100%;
	display: flex;
	justify-content: space-between;
}
.hy-index-mid {
	width: 68%;
}
.hy-index-left {
	padding-top: 1%;
}

.hy-index-rigth {
	width: 380px;
}
</style>
