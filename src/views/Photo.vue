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
	
		<div class="hy-index-mid ba-col-9">
			
			<div class="photo-page">
				<div class="thumbnail">
					<div class="row">
						<div class="perspective" v-for="(item, index) in 10" :key="index">
							<div class="card">
								<div class="box rotateX">
									<div class="fill">
										
									</div>
								</div>
							</div>
							<div class="content ba-xx-c">
								<p>相册</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			
		},
		created(){
			
		}
	}
</script>

<style scoped>
.photo-page {
	/* padding: px; */
}

.thumbnail {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	width: 90%;
	margin: 0 auto;
	padding: 10px;
	/* background-color: #555555; */
	/* opacity: 0.5; */
	/* z-index: 1; */
}

.row {
	display: flex;
	justify-content: space-between;
	margin: 0 auto;
	flex-wrap: wrap;
}

.card {
	/* position: relative; */
	display: inline-block;
	width: 100%;
	height: 100%;
	background: #fff;
	padding: 15px;
	min-width: 200px;
	box-shadow: 0 3px 5px #ddd;
	color: #555;
	/* z-index: 2; */
}
.card .box {
	width: 95%;
	height: 95%;
	margin: 0 auto;
	background: #ddd;
	cursor: pointer;
	box-shadow: 0 0 5px #ccc inset;
}
.card .box .fill {
	width: 100%;
	height: 250px;
	position: relative;
	background: #03a9f4;
	opacity: 0.5;
	box-shadow: 0 0 5px #ccc;
	transition: 1s;
}
.rotateX:hover .fill {
	transform: rotateX(45deg);
}
.perspective {
	flex: 0 0 32%;
	height: 80%;
	margin-bottom: 20px;
	background-color: lavender;
}

.perspective .box {
	perspective: 700px;
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
		background-color: white;
	}

</style>
