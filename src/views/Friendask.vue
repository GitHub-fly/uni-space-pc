<template>
	<div class="hy-friendask-large">
		<div class="ba-col-2"></div>
		<div class="hy-friendask-container">
			<div class="ba-col-9">
				<v-card class="overflow-hidden"  dark>
					<v-toolbar flat >
						<v-icon>mdi-account</v-icon>
						<v-toolbar-title class="font-weight-light">好友查找</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-text-field color="white" label="手机号" v-model="userkey">
						</v-text-field>
					</v-card-text>
					
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn @click="save()">
							查找
						</v-btn>
					</v-card-actions>
					
					<div class="hy-friendask-content">
						<v-card class="mx-auto hy-friendask-card" max-width="30%" outlined v-for="(user,index) in selectuser" :key="index">		   
							<v-list-item three-line>
								<v-avatar size="45">
								  <img
								    :src="user.avatar"
								  >
								</v-avatar>
								<v-list-item-content>
									 <v-list-item-title class="textline mb-1">{{user.nickname}}</v-list-item-title>	
									<v-list-item-subtitle>{{user.introduction}}</v-list-item-subtitle>
								</v-list-item-content>
								
							</v-list-item>
							
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn text @click="alert=true">加为好友</v-btn>
							</v-card-actions>
		
						</v-card>
					</div>
					<v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>
						用户找不到
					</v-snackbar>
		
				</v-card>
			</div>
			<div class="ba-col-3">
				<v-card class="mx-auto" max-width="344" dark>
					<v-card-text>
						<div>好友名称</div>
						<p class=" text--primary">
							be•nev•o•lent
						</p>
					</v-card-text>
					<v-card-actions>
						<v-btn text  absolute bottom right>
							了解更多
						</v-btn>
					</v-card-actions>
				</v-card>
			</div>
			<!-- 点击添加好友弹出提示框 -->
			<div class="text-center">
				<v-overlay :value="alert">
					<v-card>
					        <v-card-title
					          class="headline grey lighten-2"
					          primary-title
					        >
					          添加好友
					        </v-card-title>
					
					        <v-card-text>
					          是否确认向对方发送添加好友请求？
					        </v-card-text>	
					        <v-card-actions>
					          <v-spacer></v-spacer>
					          <v-btn
					            color="primary"
					            text
					            @click="alert = false"
					          >
					            确认
					          </v-btn>
							  <v-btn
							    color="primary"
							    text
							    @click="alert = false"
							  >
							    取消
							  </v-btn>
					        </v-card-actions>
					      </v-card>
				</v-overlay>
			</div>
		</div>
		<div class="ba-col-2"></div>
	</div>
	

</template>

<script>
	export default {
		data() {
			return {
				hasSaved: false,
				model: null,
				userkey: '',
				selectuser: [],
				alert: true
			}
		},
		methods: {
			save() {
				var _this = this;
				this.axios({
					method: 'post',
					url: this.Global.baseurl+'/friend/keyword',
					data: {
						fromId: 1,
						keyWords: this.userkey,
						toId: 0
					}
				}).then(res => {
					console.log(res.data.data)
					_this.selectuser = res.data.data;
				})
			}
		}
	}
</script>
<style scoped>
	.hy-friendask-large{
		display: flex;
	}
	.hy-friendask-container {
		display: flex;
		width: 100%;
	}

	.hy-friendask-content {
		display: flex;
		/* flex-direction: column; */
		flex-wrap: wrap;
	}

	.hy-friendask-card {
		flex: 0 0 30%;
		margin: 1%;
	}
</style>
