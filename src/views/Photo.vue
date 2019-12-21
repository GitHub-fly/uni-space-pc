<template>
	<div class="hy-index-large">
		<div class="hy-index-mid ba-col-9 ba-xx-c">
			<v-card outlined width="100%">
				<v-row>
					<v-card class="d-inline-block" flat>
						<v-row>
							<v-col cols="auto"><v-img height="200" width="200" :src="photoAlbum.cover"></v-img></v-col>

							<div class="fun">
								<v-card-title class="headline">相册名: {{ photoAlbum.name }}</v-card-title>
								<v-card-subtitle class="subtitle-1">简介: {{ photoAlbum.introduction }}</v-card-subtitle>
								<div>
									<v-btn v-show="btnStatus" text class="title addBtn">
										<input type="file" class="file" ref="uploadPhotos" multiple accept="image/*" @change="upload($event)" />
										添加图片
									</v-btn>
									<v-btn v-show="btnStatus" text class="title" @click="showChoice()">{{ text }}</v-btn>
									<v-btn v-show="btnStatus" text class="title" @click="say()">更多</v-btn>
								</div>
							</div>
						</v-row>
					</v-card>
				</v-row>

				<v-row>
					<v-col cols="2" v-for="(photo, index) in photos" :key="index">
						<v-hover v-slot:default="{ hover }">
							<v-card max-width="200px" min-width="200px" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" tile="">
								<v-img height="150px" width="300px">
									<div v-show="status" class="iconBox" @click="choice(index)">
										<i class="iconfont" v-show="flags[index] === false">&#xe619;</i>
										<i class="iconfont" v-show="flags[index] === true">&#xe629;</i>
									</div>
									<div class="img"><img :src="photo.url" /></div>
								</v-img>
							</v-card>
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
			// 当前登录者id
			userId: JSON.parse(localStorage.getItem('user')).id,
			// 通过指定的相册id寻找对应的主人id
			hostId: null,
			// 判断按钮是否出现的参数
			btnStatus: false,
			
			albumId: null,
			show: false,
			photoAlbum: null,
			// 界面数据的数组
			photos: [],
			photoDtos: [],
			urls: [],

			status: false,
			// 记录所有照片id数据的数组
			photosIdList: [],
			// 控制选择按钮出现与否的数据
			flags: [],
			text: '批量删除',
			idList: [],
		};
	},
	methods: {
		// 切换图标的显示
		choice(index) {
			this.flags[index] = !this.flags[index];
			console.log('点击切换图标的方法后flags[]的内容为：' + JSON.stringify(this.flags))
		},
		// 点击按钮进行文字的切换（批量删除`完成管理）以及删除方法执行
		showChoice() {
			// 让选择与否的图标出现
			this.status = !this.status
			// 判断按钮文字内容进行相应的操作
			if (this.text == '批量删除') {
				// 文字内容改变
				this.text = '完成管理'
			} else {
				// 更改文字信息
				this.text = '批量删除'
				// 判断是否有被选择的图标
				if (this.isSelect()) {
					for (var i = 0; i < this.flags.length; i++) {
						if (this.flags[i] == true) {
							// 删除界面数据一条
							this.photos.splice(i, 1)
							// 删除状态数组数据一条
							this.flags.splice(i, 1)
							// 被删除的idList中添加一条数据
							this.idList.push(this.photosIdList[i])
							// 图片id数组数据删除一条
							this.photosIdList.splice(i, 1)
							// 当出现多选的情况下，因数据均减少一条，则此时的指针应该向前移动一下（即i要减一）
							i--
						}
					}
					console.log(JSON.stringify(this.idList))
					// 执行批量删除接口方法
					this.batchDelete(this.idList)
				} else {
					return;
				}
			}
		},
		// 判断是否有图标被选择的方法
		isSelect() {
			for (var i = 0; i < this.flags.length; i++) {
				if (this.flags[i] == true) {
					return true;
				}
			}
		},
		// 批量删除的方法（调用接口）
		batchDelete(idList) {
			this.axios({
				method: 'delete',
				url: this.GLOBAL.baseUrl + '/photo/del',
				data: {
					longList: this.idList
				},
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				alert(res.data.data)
				// 删除完成后，要将idList数组复原
				this.idList = []
			})
		},
		say() {
			alert('敬请等待!')
		},
		// 图片上传
		upload(e) {
			// 获取上传文件数据
			var files = this.$refs.uploadPhotos.files;
			var formData = new FormData();
			for (var i = 0; i < files.length; i++) {
				formData.append('file', files[i]);
			}
			// 调取阿里云接口返回url数组
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/img',
				data: formData
			}).then(res => {
				// 用urls[]记录阿里返回的url数组
				this.urls = res.data.data;
				for (var i = 0; i < this.urls.length; i++) {
					// 用photoDtos[]来当做传递给后端接口的数据对象
					this.photoDtos.push({
						albumId: this.albumId,
						url: res.data.data[i]
					});
				}
				this.apiUploadPhotos(this.photoDtos);
				// 要让这个photoDtos对象的内容归零以便下次重新使用
				this.photoDtos = [];
			});
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
				for (var i = 0; i < photoDtos.length; i++) {
					this.photos.push({
						url: this.urls[i]
					});
				}
				alert('图片上传成功')
			});
		},
		// 通过相册id判断是否与当前登录者id相同
		isShow() {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/photoalbum/album',
				data: {
					id: this.albumId
				},
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				this.hostId = res.data.data.userId;
				if (this.userId == this.hostId) {
					this.btnStatus = true;
				} else {
					this.btnStatus = false;
				}
			})
		},
	},
	created() {
		this.photoAlbum = JSON.parse(localStorage.getItem('photoAlbum'));
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
			for (var i = 0; i < this.photos.length; i++) {
				this.photosIdList[i] = this.photos[i].id;
				this.flags[i] = false;
			}
			
			console.log('初始化时flags[]的内容为：' + JSON.stringify(this.flags));
			console.log('初始化时photosIdList[]的内容为：' + JSON.stringify(this.photosIdList));
		});
		this.isShow();
	}
};
</script>

<style scoped>
.img,
img {
	width: 100%;
	height: 100%;
}
.iconBox {
	position: absolute;
	display: inline-block;
}
.iconfont {
	background-color: white;
	color: rgb(46, 141, 237);
	border-radius: 50%;
	cursor: pointer;
}

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
