<template>
	<div class="hy-index-large" style="background-color: red;">
		<div class="hy-index-mid">
			<div style="width: 100%;" v-for="(journal, index) in myjournal" :key="index">
				<div class="hy-index-mid-row ">
					<!-- 个人日志列表 -->
					<div class="hy-index-mid-article">
						<v-card height="30%">
							<v-card-title>{{ journal.title }}</v-card-title>
							<v-card-text>
								<div v-html="journal.content.substring(0, 80)"></div>
								<!-- {{ journal.content | filterFun }} -->
							</v-card-text>

							<v-card-actions><v-btn text color="deep-purple accent-4" absolute bottom right @click="journaldetail(journal.id)">查看详细信息</v-btn></v-card-actions>
							<v-btn class="ma-2" text icon><v-icon color="black ">mdi-thumb-up</v-icon></v-btn>

							<v-btn class="ma-2" text icon><v-icon color="black ">mdi-message-text</v-icon></v-btn>
							<v-btn class="ma-2" text icon><v-icon color="black ">mdi-arrow-up-bold-box-outline</v-icon></v-btn>
						</v-card>
					</div>
				</div>
			</div>
		</div>

		<div class="hy-index-rigth ">
			<v-card class="" style="margin-bottom: 2%;" v-for="(journal, index) in manyjournal" :key="index">
				<v-img class="white--text align-end" height="120px" :src="journal.thumbnail"></v-img>
				<v-card-title class="body-1 journalTitle">{{ journal.title }}</v-card-title>
				<v-card-actions>
					<!-- <v-spacer></v-spacer> -->
					<v-btn color="orange" text @click="journaldetail(journal.id)">查看详情</v-btn>
				</v-card-actions>
			</v-card>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			right: null,
			userId: '',
			manyjournal: [],
			myjournal: []
		};
	},
	methods: {
		getjournal() {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/journal/user/data',
				data: {
					id: this.userId
				}
			}).then(res => {
				console.log(res.data.data);
				this.myjournal = res.data.data;
			});
		},
		journaldetail(a) {
			this.$router.push('/index/journal/detail/' + a);
		},
		getmorejournal() {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/journal/user/data',
				data: {
					id: this.userId
				}
			}).then(res => {
				this.manyjournal = res.data.data;
				console.log(res.data.data);
			});
		}
	},
	created() {
		// 获取网页地址url
		var query = window.location.href;
		// 锁定到最后一个“/”的位置
		var begin = query.lastIndexOf('/') + 1;
		// 取出地址中最后的id值
		this.userId = query.substring(begin);
		this.getjournal();
		this.getmorejournal();
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
.journalTitle {
	text-indent: 2em;
}
.hy-index-large {
	width: 80%;
	display: flex;
	justify-content: space-between;
}

.hy-index-left {
	background-color: white;
}

.hy-index-mid {
	width: 65%;
	display: flex;
	flex-wrap: wrap;
}

.hy-index-rigth {
	width: 32%;
}
</style>
