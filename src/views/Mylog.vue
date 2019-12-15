<template>
	<div class="hy-index-large">
		<div class="hy-index-left ba-col-1 ">
			<v-card height="400" width="100%" class="mx-auto">
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title class="title">
							Application
						</v-list-item-title>
						<v-list-item-subtitle>
							subtext
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>

				<v-list dense nav>
					<v-list-item  to="/index">
						<v-list-item-icon>
							<v-icon>mdi-home</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>
							主页
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					
					<v-list-item link>
						<v-list-item-icon>
							<v-icon>mdi-image</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>照片</v-list-item-title>
						</v-list-item-content>	
					</v-list-item>
					
					<v-list-item link>
						<v-list-item-icon>
							<v-icon>mdi-widgets</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>应用</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					
				</v-list>
			</v-card>
		</div>

		<div class="hy-index-mid ba-col-6">

			<div style="width: 100%;" v-for="(journal,index) in myjournal" :key="index">
				<div class="hy-index-mid-row">
					<!-- 个人日志列表 -->
					<div class="hy-index-mid-article">
						<v-card class="mx-auto" height="30%">
							<v-card-title>{{journal.title}}</v-card-title>
							<v-card-text>
								<!-- <div v-html="journal.content"></div> -->
								{{journal.content | filterFun}}
							</v-card-text>

							<v-card-actions>
								<v-btn text color="deep-purple accent-4" absolute bottom right @click="journaldetail(journal)">
									查看详细信息
								</v-btn>
							</v-card-actions>
							<v-btn class="ma-2" text icon>
								<v-icon color="black ">mdi-thumb-up</v-icon>
							</v-btn>

							<v-btn class="ma-2" text icon>
								<v-icon color="black ">mdi-message-text</v-icon>
							</v-btn>
							<v-btn class="ma-2" text icon>
								<v-icon color="black ">mdi-arrow-up-bold-box-outline</v-icon>.
							</v-btn>

						</v-card>
					</div>
				</div>

			</div>

		</div>

		<div class="hy-index-rigth ba-col-2 ">
			123
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				right: null,
				userId:'',
				myjournal: []
			}
		},
		methods: {
			getjournal() {
				var _this = this;
				this.userId=this.$route.params.userId;
				this.axios({
					method: 'post',
					url: this.GLOBAL.baseUrl+'/journal/user/data',
					data: {
						id: this.userId
					}
				}).then(res => {
					console.log(res.data.data)
					_this.myjournal = res.data.data
				})
			},
			journaldetail(a) {

				this.$router.push({
					name:'journaldetail',
					params:{
						journalId:a
					},
					// query传参方法:
					// {
					// 	path:'journaldetail',
					// 	query:{
					// 		id:a
					// 	}
					// }
				})
			}

		},
		created() {
			
			this.getjournal();
		},
		filters: {
			filterFun: function(value) {

				if (value && value.length > 50) {
					value = value.substring(0, 50) + "..."
				}
				return value;
			}
		}
	}
</script>

<style>
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
		background-color: white;
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
