<template>
	<div class="hy-index-large">
		<div class="hy-index-mid ba-col-9 ba-xx-c">
			<v-card outlined>
				<v-row>
					<v-card class="d-inline-block" flat>
						<v-row>
							<v-col cols="auto"><v-img height="200" width="200" src="https://cdn.vuetifyjs.com/images/cards/store.jpg"></v-img></v-col>

							<div class="fun">
								<v-card-title class="headline">相册名:</v-card-title>
								<v-card-subtitle class="subtitle-1">这是我的相册我爱罗小黑哈哈哈哈</v-card-subtitle>
								<div>
									<v-btn text class="title addBtn">
										<input type="file" class="file" ref="uploadPhotos" multiple accept="image/*" @change="upload($event)" />
										添加图片
									</v-btn>
									<v-btn text class="title">删除图片</v-btn>
									<v-btn text class="title" @click="say()">更多</v-btn>
								</div>
							</div>
						</v-row>
					</v-card>
				</v-row>

				<v-row>
					<v-col cols="2" v-for="(photo, index) in photos" :key="index">
						<v-hover v-slot:default="{ hover }">
							<v-card max-width="200px" min-width="200px" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" tile=""><v-img :src="photo.url" height="150px"></v-img></v-card>
						</v-hover>
					</v-col>
				</v-row>
			</v-card>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			albumId: null,
			show: false,
			photos: [],
			photoDtos: [],
			urls: [],
		};
	},
	methods: {
		say() {
			alert('敬请等待!');
		},
		// 图片上传
		upload(e) {
			// 获取上传文件数据
			var files = this.$refs.uploadPhotos.files;
			var formData = new FormData();
			console.log(files);
			for (var i = 0; i < files.length; i++) {
				formData.append('file', files[i]);
			}
			console.log(formData);
			// 调取阿里云接口返回url数组
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/img',
				data: formData,
			}).then(res => {
				this.urls = res.data.data;
				for (var i = 0; i < this.urls.length; i++) {
					this.photoDtos.push({
						albumId: this.albumId,
						url: res.data.data[i]
					})
				}
				this.apiUploadPhotos(this.photoDtos)
			})
		},
		// 图片上传接口的调用方法
		apiUploadPhotos(photoDtos) {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/photo/batch',
				data: JSON.stringify(photoDtos),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				for(var i = 0; i < photoDtos.length; i++) {
					this.photos.push({
						url: this.urls[i]
					})
				}
				console.log(JSON.stringify(this.photos))
			})
		},
		
	},
	created() {
		// 获取网页地址url
		var query = window.location.href;
		// 锁定到最后一个“/”的位置
		var begin = query.lastIndexOf('/') + 1;
		// 去除地址中最后的id值
		this.albumId = query.substring(begin);
		// 获取该相册中的所有图片（调用接口）
		this.axios({
			method: 'post',
			url: this.GLOBAL.baseUrl + '/photo/all',
			data: {
				albumId: this.albumId
			},
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => {
			this.photos = res.data.data;
		});
	}
};
</script>

<style scoped>
.file {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.addBtn {
	position: relative;
	width: 120px;
}
.fun {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.row {
	display: flex;
	margin: 0 auto;
	flex-wrap: wrap;
}

.hy-index-large {
	width: 100%;
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
