<template>
	<div class="hy-index-large">
		<div class="hy-index-mid">
			<div style="width: 100%;" v-for="(journal, index) in alljournal.slice(0, end)" :key="index">
				<v-card>
					<div class="hy-index-mid-row">
						<!-- 首页用户信息 -->
						<v-card class="mx-auto" max-width="96%" flat>
							<v-list-item three-line>
								<v-list-item-avatar tile size="80"><img :src="journal.avatar" alt="" /></v-list-item-avatar>

								<v-list-item-content>
									<!-- <div class="overline mb-4">用户名</div> -->
									<v-list-item-title class="headline mb-1">{{ journal.nickname }}</v-list-item-title>
									<v-list-item-subtitle></v-list-item-subtitle>
								</v-list-item-content>

								<v-card-actions>
									<v-btn text @click="getmylog(journal.userId)">查看日志</v-btn>
									<v-btn text @click="getmyphoto(journal.userId)">查看相册</v-btn>
								</v-card-actions>
							</v-list-item>
						</v-card>

						<div class="hy-index-mid-slideshow">
							<!-- 首页轮播图 -->
							<v-carousel cycle height="240" hide-delimiter-background show-arrows-on-hover>
								<v-carousel-item v-for="(slide, i) in slides" :key="i">
									<v-sheet :color="colors[i]" height="100%">
										<v-row class="fill-height" align="center" justify="center">
											<div class="display-3" style="width: 100%;height: 100%;">
												<img style="width:100%; height: 100%; display: flex; align-content: center;" :src="journal.thumbnail" alt="" />
											</div>
										</v-row>
									</v-sheet>
								</v-carousel-item>
							</v-carousel>
						</div>
						<!-- 首页文章列表 -->
						<div class="hy-index-mid-article">
							<v-card class="mx-auto" height="30%" flat>
								<v-card-title>{{ journal.title }}</v-card-title>
								<v-card-text v-if="journal.content !== null">
									<div v-html="journal.content.substring(0, 80)"></div>
									<!-- {{journal.content | filterFun}} -->
								</v-card-text>

								<v-card-actions>
									<v-btn text color="deep-purple accent-4" absolute bottom right @click="journaldetail(journal.id)">查看详细信息</v-btn>
								</v-card-actions>
								<v-btn @click="changeColor(index)" class="ma-2" text icon><v-icon :style="{ color: color[index] ? 'red' : '' }">mdi-heart</v-icon></v-btn>
								<p class="font-weight-regular">({{ likes[index] }})</p>
								<v-btn class="ma-2" text icon><v-icon color="black ">mdi-message-text</v-icon></v-btn>
								<p class="font-weight-regular">({{ journal.comments }})</p>
								<v-btn class="ma-2" text icon><v-icon color="black ">mdi-arrow-up-bold-box-outline</v-icon></v-btn>
								<p class="font-weight-regular">({{ journal.comments }})</p>
							</v-card>
						</div>
					</div>
				</v-card>
			</div>
		</div>

		<div class="hy-index-rigth">
			<v-card max-width="430">
				<v-toolbar flat>
					<v-toolbar-title>
						<!-- <v-icon left>mdi-account-multiple</v-icon> -->
						<svg class="iconf-Christmas" aria-hidden="true"><use xlink:href="#icon-xueren"></use></svg>
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
			end: 8,
			//点赞创建时间
			likeStatus: [],
			//点赞的数量
			likes: [],
			//是否已经点赞 true or false
			color: [],
			date: new Date(),

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
				fromId: JSON.parse(localStorage.getItem('user')).id
			}
		};
	},
	methods: {
		//获取当前时间
		formatDateTime() {
			let date = new Date();
			let y = date.getFullYear();
			let MM = date.getMonth() + 1;
			MM = MM < 10 ? '0' + MM : MM;
			let d = date.getDate();
			d = d < 10 ? '0' + d : d;
			let h = date.getHours();
			h = h < 10 ? '0' + h : h;
			let m = date.getMinutes();
			m = m < 10 ? '0' + m : m;
			let s = date.getSeconds();
			s = s < 10 ? '0' + s : s;
			return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
		},
		//点赞换色
		changeColor(index) {
			//已经点赞
			if (this.color[index]) {
				//改变数组状态为false
				this.color.splice(index, 1, false);
				//点赞数减一
				this.likes.splice(index, 1, this.likes[index] - 1);
			} else {
				//改变数组状态为true
				this.color.splice(index, 1, true);
				//点赞数减一
				this.likes.splice(index, 1, this.likes[index] + 1);
			}
		},
		// 点赞的方法
		thumbUp(journalId) {
			// alert(journalId)
			// this.likeStatus[index] = this.formatDateTime();
			// this.changeColor(index);
			// console.log(this.likeStatus[index]);
			this.axios({
				method: 'put',
				url: this.GLOBAL.baseUrl + '/journal/user/journal/addlike',
				data: JSON.stringify({
					journalId: journalId,
					userId: this.user.id
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				console.log('点赞');
			});
		},
		// 取消点赞的方法
		thumDown(journalId) {
			// alert(journalId)
			// this.likeStatus[index] = null;
			// this.changeColor(index);
			// console.log(this.likeStatus[index]);
			this.axios({
				method: 'delete',
				url: this.GLOBAL.baseUrl + '/journal/user/journal/cancellike',
				data: JSON.stringify({
					journalId: journalId,
					userId: this.user.id
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				console.log('取消');
			});
		},
		changeStatus() {
			//获取日志列表之前完成更新点赞操作
			for (var i = 0; i < this.color.length; i++) {
				if (this.color[i]) {
					this.thumbUp(this.alljournal[i].id);
				} else {
					this.thumDown(this.alljournal[i].id);
				}
			}
		},
		getjournal() {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/journal/index/data',
				data: {
					id: this.user.id
				}
			}).then(res => {
				// console.log(res.data.data);
				this.alljournal = res.data.data;
				// console.log(this.alljournal);
				for (var i = 0; i < this.alljournal.length; i++) {
					this.likeStatus[i] = this.alljournal[i].likeStatus;
					if (this.alljournal[i].likeStatus != null) {
						this.color[i] = true;
					} else {
						this.color[i] = false;
					}
					this.likes[i] = this.alljournal[i].likes;
				}
				// console.log(this.color);
			});
		},
		journaldetail(id) {
			this.$router.push('/index/journal/detail/' + id);
		},
		getmylog(userid) {
			this.$router.push({
				path: '/index/mylog/' + userid,
				/**
				 * 路由传参注意事项：
				 * 使用的是params方法:用name、params搭配
				 * 若使用的是query方法:用path、query搭配(注：query传递时，路径上会出现“？”)
				 */
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
			this.end += 5;
		}
	},
	created() {
		this.user = JSON.parse(localStorage.getItem('user'));
		// console.log(this.user);
		this.getjournal();
		this.getfriend();
	},
	//离开页面时提交数据
	beforeDestroy() {
		console.log('离开页面');
		this.changeStatus();
		this.getjournal();
	},

	mounted() {
		window.addEventListener('scroll', this.scrollDs);
		setInterval(this.changeStatus(), 360000000);
		//每过10秒重新获取数据（应该时间更长）
		// if (!this.timer) {
		// 	this.timer = setInterval(() => {
		// 		this.getjournal();
		// 		this.timer = null;
		// 	}, 20000000);
		// }
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

<style scoped>
.hy-index-rigth {
	display: flex;
	height: 680px;
	width: 25%;
	justify-content: flex-end;
}
.color {
	color: red;
}
.xxq-titleDiv {
	display: flex;
	justify-content: space-between;
}
.hy-index-large {
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: space-between;
}

.hy-index-left {
	background-color: white;
	padding-top: 1%;
}

.hy-index-mid {
	display: flex;
	width: 73%;
	flex-wrap: wrap;
}

.hy-index-mid-row {
	padding: 1.5%;
	margin-bottom: 1%;
}

.hy-index-mid-article {
	margin: 2%;
}
</style>
