<template>
	<div class="hy-index-large">
		<div class="hy-index-left ba-col-1 ">
			<v-card height="400" width="100%" class="mx-auto">
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title class="title">Application</v-list-item-title>
						<v-list-item-subtitle>subtext</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>

				<v-list dense nav>
					<v-list-item to="/index">
						<v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
						<v-list-item-content><v-list-item-title>主页</v-list-item-title></v-list-item-content>
					</v-list-item>

					<v-list-item to="photo">
						<v-list-item-icon><v-icon>mdi-image</v-icon></v-list-item-icon>
						<v-list-item-content><v-list-item-title>照片</v-list-item-title></v-list-item-content>
					</v-list-item>

					<v-list-item link>
						<v-list-item-icon><v-icon>mdi-widgets</v-icon></v-list-item-icon>
						<v-list-item-content><v-list-item-title>应用</v-list-item-title></v-list-item-content>
					</v-list-item>
				</v-list>
			</v-card>
		</div>

		<div class="hy-index-mid ba-col-6">
			<div style="width: 100%;" v-for="(journal, index) in alljournal.slice(0, end)" :key="index">
				<div class="hy-index-mid-row">
					<!-- 首页用户信息 -->
					<v-card class="mx-auto" max-width="96%" outlined>
						<v-list-item three-line>
							<v-list-item-avatar tile size="80"><img :src="journal.avatar" alt="" /></v-list-item-avatar>

							<v-list-item-content>
								<!-- <div class="overline mb-4">用户名</div> -->
								<v-list-item-title class="headline mb-1">{{ journal.nickname }}</v-list-item-title>
								<v-list-item-subtitle></v-list-item-subtitle>
							</v-list-item-content>

							<v-card-actions>
								<v-btn text @click="getmylog(journal.userId)">查看日志</v-btn>
								<v-btn text @click="getmyphoto(journal.userId)"></v-btn>
							</v-card-actions>
						</v-list-item>
					</v-card>

					<div class="hy-index-mid-slideshow">
						<!-- 首页轮播图 -->
						<v-carousel cycle height="200" hide-delimiter-background show-arrows-on-hover>
							<v-carousel-item v-for="(slide, i) in slides" :key="i">
								<v-sheet :color="colors[i]" height="100%">
									<v-row class="fill-height" align="center" justify="center">
										<div class="display-3">{{ slide }} Slide</div>
									</v-row>
								</v-sheet>
							</v-carousel-item>
						</v-carousel>
					</div>
					<!-- 首页文章列表 -->
					<div class="hy-index-mid-article">
						<v-card class="mx-auto" height="30%">
							<v-card-title>{{ journal.title }}</v-card-title>
							<v-card-text v-if="journal.content !== null">
								<div v-html="journal.content.substring(0, 80)"></div>
								<!-- {{journal.content | filterFun}} -->
							</v-card-text>

							<v-card-actions><v-btn text color="deep-purple accent-4" absolute bottom right @click="journaldetail(journal)">查看详细信息</v-btn></v-card-actions>
							<v-btn class="ma-2" text icon><v-icon color="black ">mdi-thumb-up</v-icon></v-btn>
							<p class="font-weight-regular">({{ journal.likes }})</p>
							<v-btn class="ma-2" text icon><v-icon color="black ">mdi-message-text</v-icon></v-btn>
							<p class="font-weight-regular">({{ journal.comments }})</p>
							<v-btn class="ma-2" text icon>
								<v-icon color="black ">mdi-arrow-up-bold-box-outline</v-icon>
								.
							</v-btn>
							<p class="font-weight-regular">({{ journal.comments }})</p>
						</v-card>
					</div>
				</div>
			</div>
		</div>

		<div class="hy-index-rigth ba-col-2 ">
			<v-card max-width="450" class="mx-auto">
				<v-toolbar flat>
					<v-toolbar-title>
						<v-icon left>mdi-account-multiple</v-icon>
						推荐好友
					</v-toolbar-title>
					<v-spacer></v-spacer>
					<!-- 将来进行推荐好友换一批操作 -->
					<!-- <v-btn icon @clic><v-icon>mdi-magnify</v-icon></v-btn> -->
				</v-toolbar>

				<v-list three-line>
					<template>
						<v-subheader v-text="item.header"></v-subheader>
					</template>
					<template v-for="(item, index) in recommendFriends.slice(0, 6)">
						<!-- <v-divider :key="item.id"></v-divider> -->
						<v-list-item :key="index">
							<v-list-item-avatar><v-img :src="item.avatar"></v-img></v-list-item-avatar>

							<v-list-item-content>
								<v-list-item-title>
									<div class="xxq-titleDiv">
										<span>{{ item.nickname }}</span>
										<v-btn icon small><v-icon @click="addFriend(item.id)">+</v-icon></v-btn>
									</div>
								</v-list-item-title>
								<v-list-item-subtitle v-html="item.introduction"></v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</template>
				</v-list>
			</v-card>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			activeBtn: 1,
			drawer: null,
			right: null,
			currentPage: 5,
			count: 9,
			scroll: '',
			end: 5,

			colors: ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4'],
			slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],

			alljournal: [],
			item: {
				header: 'today'
			},
			recommendFriends: [],
			// 对象
			user: null,
			friendDto: {
				fromId: 1
			}
		};
	},
	methods: {
		getjournal() {
			var _this = this;
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/journal/index/data',
				data: {
					id: 1
				}
			}).then(res => {
				_this.alljournal = res.data.data;
			});
		},
		journaldetail(a) {
			this.$router.push({
				name: 'journaldetail',
				params: {
					journalId: a
				}
			});
		},
		getmylog(userid) {
			this.$router.push({
				name: 'mylog',
				params: {
					userId: userid
				}
			});
		},
		getmyphoto(userid) {
			this.$router.push({
				name: 'photo',
				params: {
					userId: userid
				}
			});
		},
		// 获取推荐好友的方法
		getfriend() {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/friend/recommend',
				data: JSON.stringify(this.friendDto),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				this.recommendFriends = res.data.data;
				
			});
		},
		// 添加好友按钮的动作监听
		addFriend(id) {
			this.friendDto.toId = id;
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/friend/friend',
				data: JSON.stringify(this.friendDto),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				alert('好友请求已' + res.data.msg + '发送');
				// 重新加载推荐好友
				this.getfriend();
			});
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
			// alert(scrollTop+"  "+scrollHeight+"="+windowHeight)
			// if (scrollTop + scrollHeight >= windowHeight ) {
			// 	this.loadMore();
			// }
			if (scrollTop + windowHeight + 3 >= scrollHeight) {
				this.loadMore();
			}
		},
		loadMore() {
			// alert('进入')
			this.end += 5;
		}
	},
	created() {
		this.getjournal();
		this.getfriend();
	},

	mounted() {
		window.addEventListener('scroll', this.scrollDs);
	},

	filters: {
		filterFun: function(value) {
			if (value && value.length > 50) {
				value = value.substring(0, 50) + '...';
			}
			return value;
		}
	}
};
</script>

<style>
.xxq-titleDiv {
	display: flex;
	justify-content: space-between;
}
.hy-index-large {
	width: 100%;
	height: 800px;
	display: flex;
}

.hy-index-left {
	background-color: white;
	padding-top: 1%;
}

.hy-index-mid {
	/* background-color: red; */
	display: flex;
	flex-wrap: wrap;
}

.hy-index-rigth {
	margin-top: 1%;
}

.hy-index-mid-row {
	margin-bottom: 1%;
	margin-top: 2%;
}

.hy-index-mid-slideshow {
	margin: 2%;
}

.hy-index-mid-article {
	margin: 2%;
}
</style>
