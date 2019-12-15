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


		<div class="hy-index-mid ba-col-6" >
			 <v-card
			    class="mx-auto"
			    width="90%"
			  >
			    <v-card-text>
			      <p class="display-1 text--primary">
			       {{jorural.title}}
			      </p>
				  <br>
			      <p>作者：{{jorural.nickname}}</p>
				  <br>
			      <p>发表日期：{{jorural.createTime}}</p>
			      <div class="text--primary">
					  <div v-html="jorural.content" style="color: #000000;" ></div>
			      </div>
			    </v-card-text>
				
			    <!-- <v-card-actions>
			      <v-btn
			        text
			        color="deep-purple accent-4"
			      >
			        Learn More
			      </v-btn>
			    </v-card-actions> -->
				
			  </v-card>
			
			</div>
		
		
		
		<div class="hy-index-rigth ba-col-2 ">
			123
		</div>
		
	</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				jorural:[]
			
			}
		},methods: {
		},
		created(){
			this.jorural=this.$route.params.journalId;
			console.log(this.jorural)
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
		padding: 1%;
	}


	
</style>

