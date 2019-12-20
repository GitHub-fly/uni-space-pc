<template>
	<div class="hy-index-large">
		<div class="hy-index-mid">
			<v-card>
				<v-card-text>
					<p class="display-1 text--primary">{{ jorural.title }}</p>
					<br />
					<p>作者：{{ jorural.nickname }}</p>
					<br />
					<p>发表日期：{{ jorural.createTime }}</p>
					<div class="text--primary"><div v-html="jorural.content" style="color: #000000;"></div></div>
				</v-card-text>
			</v-card>
		</div>

		<div class="hy-index-rigth">
			<!-- 日志缩略图 -->
			<v-card class="d-inline-block">
				<v-container>
					<v-row justify="space-between">
						<v-col cols="auto"><img :src="jorural.thumbnail" /></v-col>
					</v-row>
				</v-container>
			</v-card>

			<!-- 日志详情页右侧作者信息栏 -->
			<v-card class="mx-auto" max-width="100%" style="margin-top: 2%;" outlined :elevation="2">
				<v-list-item three-line>
					<v-list-item-content>
						<v-list-item-title class="headline mb-1">{{ jorural.nickname }}</v-list-item-title>
						<v-list-item-subtitle>{{ jorural.introduction }}</v-list-item-subtitle>
					</v-list-item-content>

					<v-list-item-avatar tile size="80" color="grey"><img :src="jorural.avatar" alt="" /></v-list-item-avatar>
				</v-list-item>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text @click="tohome(user.id)">进入主页</v-btn>
				</v-card-actions>
			</v-card>

			<!-- 推荐日志信息展示 -->
			<v-card class="mx-auto" max-width="100%" style="margin: 2%;" v-for="(jou, index) in manyjournal.slice(0, end)" :key="index">
				<v-img v-if="jou.thumbnail" class="white--text align-end" height="200px" :src="jou.thumbnail">
					<v-card-title>{{ jou.title }}</v-card-title>
				</v-img>
				<v-card-text class="text--primary"></v-card-text>
				<div v-if="jou.content" v-html="jou.content.substring(0, 50) + '.....'"></div>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="orange" text @click="journaldetail(jou)">查看详情</v-btn>
				</v-card-actions>
			</v-card>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			jorural: [],
			user: [],
			manyjournal: [],
			end: 3,
		};
	},
	methods: {
		// 获取此篇日志的详情
		getDetail(id) {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/journal/user/journaldetail/' + id,
			}).then(res => {
				this.jorural = res.data.data;
			})
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
		getuser() {
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
		tohome(id) {
			this.$router.push('/personal/' + id);
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
		},
	},
	created() {
		// 获取网页地址url
		var query = window.location.href;
		// 锁定到最后一个“/”的位置
		var begin = query.lastIndexOf('/') + 1;
		// 取出地址中最后的id值
		var journalId = query.substring(begin);
		// 获取此日志的详情
		this.getDetail(journalId);
		console.log(this.jorural);
		
		this.getmorejournal();
		this.getuser();
	},
	mounted() {
		window.addEventListener('scroll', this.scrollDs);
	}
};
</script>

<style scoped>
.hy-index-large {
	width: 100%;
	display: flex;
	justify-content: space-between;
}
.hy-index-mid {
	width: 73%;
}
.hy-index-left {
	padding-top: 1%;
}

.hy-index-rigth {
	width: 25%;
}
</style>
