<template>
	<div >
		<div  class="hy-friend-container" v-for="(friend,index) in friendDto" :key="index">
			<v-card class="mx-auto hy-friend-row" max-width="60%" outlined>
				<v-avatar class="hy-friend-img">
					<img :src="friend.avatar" alt="John">
				</v-avatar>
				<v-list-item there-line>
					
					<v-list-item-content>
						<v-list-item-title class="headline mb-1">{{friend.nickname}}</v-list-item-title>
						<v-list-item-subtitle>{{friend.introduction}}</v-list-item-subtitle>
					</v-list-item-content>
				
					<v-card-actions>
						<v-btn text @click="selectfriend()">进入主页</v-btn>
						<v-btn text>查看日志</v-btn>
					</v-card-actions>
				</v-list-item>
			</v-card>
		</div>
	</div>
		
</template>



<script>
	export default {
		data() {
			return {
				friendDto:[]
			};
		},
		created() {
			this.selectfriend()
		},
		methods: {
			selectfriend(){
				var _this = this;
				this.axios({
					method:'post',
					url:this.GLOBAL.baseUrl+'/friend/keyword',
					data:{
						   fromId: 1,
						   keyWords: "",
						   toId: 0
					}
				}).then(res=>{
					console.log(res.data.data)
					_this.friendDto=res.data.data;
				})
					
				
			}
		}
	}
</script>

<style scoped>
	.hy-friend-row {
		width: 100%;
		height: 120px;
		margin-bottom: 1px;
	}

	.hy-friend-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
</style>
