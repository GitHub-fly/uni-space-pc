<template>
	<div class="hy-index-large">
		<div class="hy-index-mid">
			<!-- 相册页最顶部的按钮们 -->
			<v-row>
				<!-- persistent 点击对话框外部不能使其关闭 -->
				<v-dialog v-model="dialog" persistent max-width="600px">
					<template v-slot:activator="{ on }">
						<v-btn height="10%" v-show="createBtnStatus()" text v-on="on" class="createBtn" style="height: 100%;">
							<svg class="iconf-Christmas-large " aria-hidden="true" @click="toexit()"><use xlink:href="#icon-dangao"></use></svg>
							创建相册
						</v-btn>
						<v-btn v-show="!createBtnStatus()" text class="createBtn" style="height: 100%;">
							<svg class="iconf-Christmas-large" aria-hidden="true" @click="toexit()"><use xlink:href="#icon-dangao"></use></svg>
							好友相册
						</v-btn>
					</template>

					<!-- 创建相册的dialog界面 -->
					<v-card>
						<v-card-title><span class="headline">New album</span></v-card-title>
						<v-card-text>
							<v-container>
								<v-row class="coverBox">
									<p>Select cover:</p>
									<!-- 封面图上传地方 -->
									<div class="upload">
										<div class="user-header">
											<input
												type="file"
												style="cursor: pointer;"
												name="image"
												accept="image/*"
												@change="uploadCover($event)"
												class="header-upload-btn user-header-com"
											/>
											<img alt="" :src="imgStr" class="user-header-img user-header-com" />
											<p class="tip">
												<span class="warnInfo">{{ errorStr }}</span>
											</p>
										</div>
									</div>
								</v-row>
								<v-row>
									<v-col cols="12" sm="6" md="4"><v-text-field label="Album name*" required v-model="photoAlbumDto.name"></v-text-field></v-col>
									<v-col cols="12" sm="6" md="4">
										<v-text-field label="Album of type*" hint="Example: 生活" persistent-hint v-model="photoAlbumDto.type"></v-text-field>
									</v-col>
									<v-textarea outlined name="input-7-4" label="Introduction" v-model="photoAlbumDto.introduction"></v-textarea>
								</v-row>
							</v-container>
							<p>*Where there is a will, there is a way.</p>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
							<v-btn color="blue darken-1" text @click="createAlbum()">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-row>

			<!-- 相册区域 -->
			<v-row>
				<v-col cols="4" v-for="(album, index) in photoAlbums" :key="index">
					<v-hover v-slot:default="{ hover }">
						<v-card max-width="350" min-height="350" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
							<!-- 如果相册设置了密保问题 -->
							<v-img v-if="album.securityId != null && !createBtnStatus()" src="../assets/img/uni_lock.png" height="200px" class="align-center white--text">
								<v-card-title class="justify-center">回答问题可见</v-card-title>
							</v-img>

							<!-- 无密保则显示相册封面图 -->
							<v-img v-else :src="album.cover" height="200px"></v-img>

							<v-card-title>
								<!-- v-model 这里有问题 -->
								<!-- v-model 这里有问题 -->
								<!-- v-model 这里有问题 -->
								<!-- v-model 这里有问题 -->
								<!-- v-model 这里有问题 -->
								<!-- 相册密保的dialog -->
								<v-dialog v-if="album.securityId != null && !createBtnStatus()" v-model="dialogAlbums[index]" persistent max-width="290">
									<template v-slot:activator="{ on }">
										<v-btn small text v-on="on" @click="getSecurityId(album.securityId)">
											<svg class="iconf-Christmas" aria-hidden="true"><use xlink:href="#icon-lock"></use></svg>
										</v-btn>
									</template>
									<v-card>
										<v-card-title class="headline">{{ securitys.question }}</v-card-title>
										<v-card-text><v-text-field label="答案" clearable v-model="answer"></v-text-field></v-card-text>
										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn color="green darken-1" text @click="checkAnswer(album)">确定</v-btn>
											<v-btn color="green darken-1" text @click="exitBtn(index)">取消</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>

								<!-- 相册名称区域 -->
								<v-chips>
									<v-btn text class="title">
										{{ album.name }}
										<v-btn small v-if="album.securityId == null" @click="toPhoto(album)" v-show="editFlags[index] === false" text class="title">
											<svg class="iconf-Christmas" aria-hidden="true"><use xlink:href="#icon-jinru"></use></svg>
										</v-btn>
									</v-btn>
								</v-chips>

								<input type="text" v-model="album.name" style="border: 1px solid lavender;" v-show="editFlags[index] === true" />
							</v-card-title>

							<v-card-subtitle>{{ album.createTime }}</v-card-subtitle>
							<!-- 相册简介区域 -->
							<!-- 不可编辑区 -->
							<v-card-subtitle v-show="editFlags[index] === false">
								{{ album.introduction.length > 15 ? album.introduction.substring(0, 15) + '。。。' : album.introduction === '' ? '无' : album.introduction }}
							</v-card-subtitle>
							<!-- 可编辑区 -->
							<v-card-subtitle v-show="editFlags[index] === true">
								<textarea cols="42" rows="3" v-model="album.introduction" style="border: 1px solid lavender;"></textarea>
							</v-card-subtitle>
							<v-card-actions>
								<v-spacer></v-spacer>
								<!-- 向下的三角按钮（下拉框） -->
								<v-btn icon @click="handleClick(index)">
									<!-- <v-btn icon> -->
									<v-icon>{{ flags[index] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
								</v-btn>
							</v-card-actions>

							<v-expand-transition>
								<div v-show="flags[index]">
									<v-divider></v-divider>
									<v-btn text @click="handleEdit(index)" v-if="editFlags[index] === false">编辑</v-btn>
									<v-btn text @click="save(index, album)" v-else>保存</v-btn>
									<v-btn text @click="deleteAlbum(album.id, index)">删除</v-btn>
								</div>
							</v-expand-transition>
						</v-card>
					</v-hover>
				</v-col>
			</v-row>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			answer: null,
			albumInfoMsg: null,
			albumInfo: null,
			userId: null,
			albumPermissionStatus: null,
			btnStatus: true,
			dialog: false,
			dialogAlbum: false,
			dialogAlbums: [],
			flags: [],
			editFlags: [],
			securitys: [],
			photoAlbums: [],
			showIntroductions: [],

			// 封面图上传区域所需属性
			imgStr: require('../assets/img/photo.png'),
			errorStr: '',
			formData: new FormData(),
			photoAlbumDto: {
				id: '',
				cover: '',
				introduction: '',
				name: '',
				userId: JSON.parse(localStorage.getItem('user')).id,
				type: ''
			}
		};
	},
	methods: {
		// dialog 取消按钮的监听
		exitBtn(index) {
			this.answer = '';
			this.dialogAlbums[index] = false;
		},
		// 监听相册密保的答案是否正确
		checkAnswer(album) {
			if (this.answer == this.securitys.answer) {
				this.$router.push('/index/photo/' + album.id);
			} else {
				alert('答案不正确');
			}
		},
		// 获取相册密保信息
		getSecurityId(securityId) {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/security/find',
				data: {
					id: securityId
				},
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				this.securitys = res.data.data;
				console.log(this.securitys);
			});
		},
		// 删除指定id的相册
		deleteAlbum(id, index) {
			// splice(index, 1) --> 指从第index个开始（但不包括）删除一个数据
			this.photoAlbums.splice(index, 1);
			this.flags.splice(index, 1);
			this.axios({
				method: 'delete',
				url: this.GLOBAL.baseUrl + '/photoalbum/delete',
				data: {
					userId: JSON.parse(localStorage.getItem('user')).id,
					id: id
				},
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				alert('相册已成功删除');
			});
		},
		// 切换点击到的相册状态（下拉选项）
		handleClick(index) {
			if (this.flags[index]) {
				this.flags.splice(index, 1, false);
			} else {
				this.flags.splice(index, 1, true);
			}
		},
		// 切换编辑状态
		handleEdit(index) {
			if (this.editFlags[index]) {
				this.editFlags.splice(index, 1, false);
			} else {
				this.editFlags.splice(index, 1, true);
			}
			this.btnStatus = !this.btnStatus;
		},
		// 保存按钮的监听方法
		save(index, album) {
			var name = album.name;
			console.log(album.name);
			// 先切换状态
			this.handleEdit(index);
			// 调用接口更改数据信息
			album.name = this.axios({
				method: 'put',
				url: this.GLOBAL.baseUrl + '/photoalbum/update',
				data: JSON.stringify(album),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				console.log(album.name);
				if (res.data.msg == '成功') {
					album.name = name;
					alert('修改成功');
				} else {
					alert('修改失败');
				}
			});
		},
		// 封面图上传功能所需方法
		uploadCover(e) {
			var file = e.target.files[0];
			// 将获取到的文件读取到一个FormData对象中
			console.log(e.target.files);
			var reader = new FileReader();
			console.log(file);
			// 获取图片的大小，做大小限制有用
			let imgSize = file.size;
			console.log(imgSize);
			var _this = this; // this指向问题，所以在外面先定义
			// 比如上传头像限制10M大小，这里获取的大小单位是b
			if (imgSize <= 1024 * 1024) {
				this.formData.append('file', file);
				// 合格
				_this.errorStr = '';
				console.log('大小合适');
				// base64方法 2
				var reader = new FileReader();
				reader.readAsDataURL(file); // 读出 base64
				reader.onloadend = function() {
					// 图片的 base64 格式, 可以直接当成 img 的 src 属性值
					var dataURL = reader.result;
					_this.imgStr = dataURL;
					// 下面逻辑处理
				};
			} else {
				console.log('大小不合适');
				_this.errorStr = '图片大小超出范围';
			}
		},
		// 创建相册的方法
		createAlbum() {
			// 判断图片大小是否合理
			if (this.errorStr != '') {
				alert('图片大小不符合要求，请重复新选择');
				return;
			} else {
				// 是对话框消失
				this.dialog = false;
				// 获取文件信息，调用阿里图片上传接口返回url
				this.axios({
					method: 'post',
					url: this.GLOBAL.baseUrl + '/img',
					data: this.formData,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res => {
					this.photoAlbumDto.cover = res.data.data[0];
					// 调用接口，创建相册
					this.axios({
						method: 'post',
						url: this.GLOBAL.baseUrl + '/photoalbum/add',
						data: JSON.stringify(this.photoAlbumDto),
						headers: {
							'Content-Type': 'application/json'
						}
					}).then(res => {
						alert('创建成功！');
						this.photoAlbums.push(res.data.data);
						console.log(JSON.stringify(res.data.data));
						this.editFlags.push(false);
						this.flags.push(false);

						this.imgStr = require('../assets/img/photo.png');
						this.photoAlbumDto.name = '';
						this.photoAlbumDto.type = '';
						this.photoAlbumDto.introduction = '';
					});
				});
			}
		},

		// 好像要改
		// 好像要改
		// 好像要改
		// 好像要改
		// 好像要改
		// 好像要改
		// 好像要改
		// 好像要改
		// 好像要改
		// 好像要改
		// 跳转到相册详情页面
		toPhoto(album) {
			localStorage.setItem('photoAlbum', JSON.stringify(album));
			this.$router.push('/index/photo/' + album.id);
		},

		// 数据初始化的方法
		init() {
			// 获取网页地址url
			var query = window.location.href;
			// 锁定到最后一个"/"的位置
			var begin = query.lastIndexOf('/') + 1;
			// 取出地址中最后的id值
			this.userId = query.substring(begin);
			// 初始化相册数组
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/photoalbum/all',
				data: {
					id: this.userId
				},
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				this.photoAlbums = res.data.data;
				console.log(this.photoAlbums);
				for (var i = 0; i < this.photoAlbums.length; i++) {
					this.flags[i] = false;
					this.editFlags[i] = false;
					if (this.photoAlbums.securityId == null) {
						this.dialogAlbums[i] = false;
					} else {
						this.dialogAlbums[i] = true;
					}
				}
				console.log(this.dialogAlbums);
			});
		},

		// 判断创建按钮是否出现（是否为当前登录者空间）
		createBtnStatus() {
			if (this.userId == JSON.parse(localStorage.getItem('user')).id) {
				return true;
			} else {
				return false;
			}
		}
	},
	created() {
		this.init();
	},
	// 实时监听路由变化
	watch: {
		$route(to, from) {
			//监听路由是否变化
			if (this.$route.params.id) {
				//判断id是否有值
				this.init();
			}
		}
	}
};
</script>

<style scoped>
.iconf-Christmas {
	width: 20px;
	height: 20px;
}
.createBtn {
	/* margin-left: 1%; */
}
/* 封面图上传区域的设置 */
.user-header {
	position: relative;
	display: inline-block;
}
.user-header-com {
	width: 100px;
	height: 100px;
	display: inline-block;
	border-radius: 20px;
}
.header-upload-btn {
	position: absolute;
	left: 0;
	top: 0;
	opacity: 0;
	/* 通过定位把input放在img标签上面，通过不透明度隐藏 */
}
.tip {
	font-size: 14px;
}
/* warnInfo是用于错误提示 */
.warnInfo {
	font-size: 12px;
	margin-left: 10px;
	background-color: lightblue;
}
.coverBox {
	padding-left: 15px;
	display: flex;
	align-items: center;
}
.upload {
	margin-left: 10%;
}

.title {
	text-indent: -0.8em;
}
.row {
	display: flex;
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
	display: flex;
	flex-wrap: wrap;
}

.hy-index-rigth {
	background-color: white;
}
</style>
