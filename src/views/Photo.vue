<template>
	<div class="photo-page">
		<h1>我的相册</h1>
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
						<p>相册一</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script></script>

<style scoped>
.photo-page {
	padding: 20px;
}

.thumbnail {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	width: 80%;
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

.content {
	
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
</style>
