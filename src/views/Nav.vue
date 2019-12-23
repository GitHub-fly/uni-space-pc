<template>
	<div id="allcolor">
		<div>
			<v-bottom-navigation :value="activeBtn" id="navcolor" height="70px">
				<div class="hy-nav-top">
					<div class="hy-nav-top-left">
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn text v-on="on" @click="change()" height="100%" width="30%">
									<svg aria-hidden="true" class="iconf-Christmas-large"><use xlink:href="#icon-shipin"></use></svg>
								</v-btn>
							</template>
							<span>点我可以换皮肤哦~</span>
						</v-tooltip>

						<v-btn height="100%" width="35%" to="/nav"><v-img width="70%" height="100%" style="border-radius: 3px;" src="../assets/img/ic_launcher.png"></v-img></v-btn>
						<div height="100%" class="red--text title" style="cursor: default;">UNI-SPACE</div>
					</div>

					<div class="hy-nav-top-right">
						<v-spacer @click="play()" class="rideoDiv">
							<aplayer
								class="rideo"
								:autoplay="true"
								:float="true"
								:mini="true"
								:music="{
									title: this.name,
									artist: this.singer,
									src: this.src,
									lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
								}"
							></aplayer>
						</v-spacer>

						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn v-on="on" style="height: 100%;">
									<v-avatar color="teal" size="48" @click="toHome()"><img :src="user.avatar" /></v-avatar>
								</v-btn>
							</template>
							<span>{{ user.nickname }}</span>
						</v-tooltip>

						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<!-- <v-btn v-on="on" style="height: 100%;"><i @click="toexit()" class="iconfont icon">&#xe65b;</i></v-btn> -->
								<!-- <v-btn v-on="on" style="height: 100%;"><i class="iconfont icon">&#xe65b;</i></v-btn> -->
								<v-btn v-on="on" style="height: 100%;">
									<svg class="iconf-Christmas-exit" aria-hidden="true" @click="toexit()"><use xlink:href="#icon-dangao"></use></svg>
								</v-btn>
							</template>
							<span>退出</span>
						</v-tooltip>

						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<!-- <v-btn v-on="on" style="height: 100%;"><i @click="toPublish()" class="iconfont icon">&#xe7c9;</i></v-btn> -->
								<v-btn v-on="on" style="height: 100%;">
									<svg class="iconf-Christmas" aria-hidden="true" @click="toPublish()"><use xlink:href="#icon-xinfeng"></use></svg>
								</v-btn>
							</template>
							<span>发表日志</span>
						</v-tooltip>

						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<!-- <v-btn v-on="on" @click.stop="drawer = !drawer" style="height: 100%;"><i class="iconfont iconFriends">&#xe62f;</i></v-btn> -->
								<v-btn v-on="on" @click.stop="drawer = !drawer" style="height: 100%;">
									<svg class="iconf-Christmas" aria-hidden="true"><use xlink:href="#icon-xueren"></use></svg>
								</v-btn>
							</template>
							<span>好友列表</span>
						</v-tooltip>

						<v-menu offset-y>
							<template v-slot:activator="{ on }">
								<!-- <v-btn v-on="on" style="height: 100%;"><i class="iconfont icon">&#xe722;</i></v-btn> -->
								<!-- <v-tooltip bottom> -->
								<!-- <v-badge>
									<template v-slot:badge>
										{{ this.messageList.length }}
									</template> -->
									<v-btn v-on="on" @click="getMessage()" style="height: 100%;">
										<svg class="iconf-Christmas" aria-hidden="true"><use xlink:href="#icon-milu"></use></svg>
									</v-btn>
								<!-- </v-badge> -->
								<!-- <span>消息</span>
							</v-tooltip> -->
							</template>

							<v-list>
								<v-list-item v-for="(message, index) in messageList" :key="index">
									<v-list-item-avatar><v-img :src="message.avatar"></v-img></v-list-item-avatar>
									<v-list-item-content>
										<v-list-item-title>{{ message.title.substring(0, 3) }}...</v-list-item-title>
									</v-list-item-content>

									<v-list-item-icon><v-icon color="pink">mdi-heart</v-icon></v-list-item-icon>
								</v-list-item>
							</v-list>
						</v-menu>

						<v-menu offset-y>
							<template v-slot:activator="{ on }">
								<!-- <v-btn v-on="on" style="height: 100%;"><i class="iconfont icon">&#xe722;</i></v-btn> -->
								<v-btn v-on="on" style="height: 100%;">
									<svg class="iconf-Christmas" aria-hidden="true"><use xlink:href="#icon-xuehua"></use></svg>
								</v-btn>
							</template>

							<v-list>
								<v-list-item @click="toHome()"><v-list-item-title>个人主页</v-list-item-title></v-list-item>

								<v-list-item @click="changemessage()"><v-list-item-title>信息修改</v-list-item-title></v-list-item>

								<v-list-item @click="changeencrypted()"><v-list-item-title>密码修改</v-list-item-title></v-list-item>

								<v-list-item><v-list-item-title>设置</v-list-item-title></v-list-item>

								<v-list-item @click="toexit()"><v-list-item-title>退出</v-list-item-title></v-list-item>
							</v-list>
						</v-menu>
					</div>
				</div>
			</v-bottom-navigation>

			<!-- 好友栏 -->
			<v-navigation-drawer v-model="drawer" temporary absolute right width="25%">
				<v-card max-width="450" class="mx-auto">
					<!-- 好友栏的工具栏 -->
					<v-toolbar flat>
						<!-- 默认皮肤的图标 -->
						<!-- <v-btn icon @click="showFriendsBox()" small><v-icon medium>mdi-account</v-icon></v-btn>
							<v-btn icon @click="showInfoFriendBox()" small><i class="iconfont">&#xe601;</i></v-btn>
							<v-btn icon @click="showAddFriendBox()" small><v-icon>mdi-plus-circle</v-icon></v-btn> -->

						<!-- 圣诞主题图标 -->
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn icon v-on="on" @click="showFriendsBox()">
									<svg class="iconf-Christmas" aria-hidden="true"><use xlink:href="#icon-jiangbingren"></use></svg>
								</v-btn>
							</template>
							<span>好友</span>
						</v-tooltip>

						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn icon v-on="on" @click="showInfoFriendBox()">
									<svg class="iconf-Christmas" aria-hidden="true"><use xlink:href="#icon-lingdang1"></use></svg>
								</v-btn>
							</template>
							<span>好友请求</span>
						</v-tooltip>

						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn icon v-on="on" @click="showAddFriendBox()">
									<svg class="iconf-Christmas" aria-hidden="true"><use xlink:href="#icon-shengdanhuahuan"></use></svg>
								</v-btn>
							</template>
							<span>添加好友</span>
						</v-tooltip>

						<!-- 空白填充 -->
						<v-spacer></v-spacer>
						<!-- 添加好友/搜索好友的输入框 -->
						<div class="xxq-input-wrap" v-if="inputStatus">
							<input type="text" placeholder="请输入..." v-model="keyWords" @input="searchFriends()" />
							<v-btn icon small><v-icon left>mdi-magnify</v-icon></v-btn>
						</div>
					</v-toolbar>

					<!-- 分割线 -->
					<v-divider></v-divider>

					<template>
						<div class="xxq-titleDiv">
							<v-subheader v-text="tabText"></v-subheader>
							<v-spacer></v-spacer>
							<v-btn icon v-if="tabText === '我的好友'">
								<svg class="iconf-medium" aria-hidden="true" @click="showPermissionIcon()"><use xlink:href="#icon-quanxianmiyao"></use></svg>
							</v-btn>
							<v-btn icon v-if="tabText === '我的好友'"><v-icon @click="showDeleteIcon()">mdi-delete</v-icon></v-btn>
						</div>
					</template>

					<!-- 列表区域 -->
					<div class="myFriendsBox">
						<v-list three-line>
							<template v-for="(item, index) in myFriends">
								<v-list-item :key="index">
									<v-list-item-avatar @click="toPersion(item.id, index)" style="cursor: pointer;"><v-img :src="item.avatar"></v-img></v-list-item-avatar>
									<v-list-item-content>
										<v-list-item-title>
											<div class="xxq-titleDiv">
												<span>{{ item.nickname }}</span>
												<v-btn icon small v-if="tabText === '添加好友'"><v-icon @click="addFriend(item.id)">+</v-icon></v-btn>
												<v-btn icon small v-if="delteteBtnStatus"><v-icon small @click="deleteFriend(item.id)">mdi-minus</v-icon></v-btn>
												<v-chip @click="changeRight(index)" v-if="permissionBtnStatusShow" class="white px-0" fluid>
													<v-switch v-model="rightShow[index]"></v-switch>
												</v-chip>
												<div class="applicationBox" v-if="tabText === '好友请求'">
													<v-btn icon small><i class="iconfont" @click="aggreee(item.id)">&#xe7cd;</i></v-btn>
													<v-btn icon small><i class="iconfont" @click="reject(item.id)">&#xe65a;</i></v-btn>
												</div>
											</div>
										</v-list-item-title>
										<v-list-item-subtitle v-html="item.introduction"></v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
							</template>
						</v-list>
					</div>
				</v-card>
			</v-navigation-drawer>
		</div>

		<router-view class="routerView" />
	</div>
</template>

<script>
import Aplayer from 'vue-aplayer';
export default {
	components: {
		Aplayer
	},
	data() {
		return {
			morecolor: [
				'#e91e63',
				'#f8bbd0',
				'#ce93d8',
				'#8e24aa',
				'#2196f3',
				'#3f51b5',
				'#5e35b1',
				'#5c6bc0',
				'#303f9f',
				'#8c9eff',
				'#00bcd4',
				'#f44336',
				'#ffebee',
				'#ff8f00',
				'#f57f17',
				'#ffea00'
			],
			colorindex: 0,
			musics: [],
			musicList: [],
			singer: '',
			name: '',
			src: '',
			activeBtn: 1,
			drawer: null,
			draweradd: null,
			tabText: '我的好友',
			keyWords: null,
			inputStatus: true,
			delteteBtnStatus: false,
			permissionBtnStatus: false,
			permissionBtnStatusShow: false,
			user: null,
			messages: [
				{
					title: 'Home',
					icon: 'mdi-dashboard'
				},
				{
					title: 'About',
					icon: 'mdi-question_answer'
				}
			],
			myFriends: [],
			messageList: [],
			rightShow: [],
			items: {
				header: 'MyFriends'
			},
			friendDto: {
				fromId: JSON.parse(localStorage.getItem('user')).id,
				keyWords: '',
				toId: null
			}
		};
	},
	methods: {
		// 改变访问权限值（1/0）
		changeRight(index) {
			if (this.rightShow[index]) {
				this.axios({
					method: 'PUT',
					url: this.GLOBAL.baseUrl + '/friend/collection',
					data: {
						collectionFlag: 1,
						fromId: this.friendDto.fromId,
						toId: this.myFriends[index].id
					},
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(res => {
					console.log('已取消屏蔽' + this.myFriends[index].nickname);
				});
			} else {
				this.axios({
					method: 'PUT',
					url: this.GLOBAL.baseUrl + '/friend/collection',
					data: {
						collectionFlag: 0,
						fromId: this.friendDto.fromId,
						toId: this.myFriends[index].id
					},
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(res => {
					console.log('已屏蔽' + this.myFriends[index].nickname);
				});
			}
		},
		changeencrypted() {
			this.$router.push({
				name: 'retrieve',
				params: {
					userId: JSON.parse(localStorage.getItem('user')).id
				}
			});
		},
		changemessage() {
			this.$router.push({
				path: '/index/user',
				name: 'user',
				params: {
					userId: JSON.parse(localStorage.getItem('user')).id
				}
			});
		},
		toHome() {
			this.$router.push('/personal/' + JSON.parse(localStorage.getItem('user')).id);
		},
		toPublish() {
			this.$router.push('/index/publish');
		},
		/**
		 * 退出的方法
		 */
		toexit() {
			this.$router.push({
				name: 'sign',
				params: {}
			});
			localStorage.clear();
		},
		// 好友模块（抽屉）
		showFriendsBox() {
			this.inputStatus = true;
			this.keyWords = '';
			this.friendDto.keyWords = this.keyWords;
			this.friends(this.friendDto);
			this.tabText = '我的好友';
		},
		showInfoFriendBox() {
			this.myFriends = [];
			this.inputStatus = false;
			this.tabText = '好友请求';
			this.delteteBtnStatus = false;
			// 调用好友请求接口
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/friend/application',
				data: JSON.stringify(this.friendDto),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				this.myFriends = res.data.data;
			});
		},
		// 添加好友按钮动作监听
		showAddFriendBox() {
			this.keyWords = '';
			this.inputStatus = true;
			this.tabText = '添加好友';
			this.myFriends = [];
		},
		// 搜索框的输入监听事件
		searchFriends() {
			this.friendDto.keyWords = this.keyWords;
			if (this.tabText == '添加好友') {
				this.axios({
					method: 'post',
					url: this.GLOBAL.baseUrl + '/friend/keywords',
					data: JSON.stringify(this.friendDto),
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(res => {
					this.myFriends = res.data.data;
				});
			} else {
				this.friends(this.friendDto);
			}
		},
		// 初始化myFriends数据的方法
		friends(friendDto) {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/friend/keyword',
				data: JSON.stringify(friendDto),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				this.myFriends = res.data.data;
				for (var i = 0; i < this.myFriends.length; i++) {
					if (this.myFriends[i].collectionFlag == 1) {
						this.rightShow[i] = true;
					} else {
						this.rightShow[i] = false;
					}
				}
				console.log(this.rightShow);
				console.log(this.myFriends);
			});
		},
		// 添加好友按钮的动作监听
		addFriend(id) {
			this.friendDto.toId = id;
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/friend/friend',
				data: JSON.stringify(this.friendDto),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				alert('好友请求已' + res.data.msg + '发送');
			});
		},
		// 跳转到好友中心页面的方法
		toPersion(id, index) {
			if (this.myFriends[index].collection == 1) {
				this.$router.push('/personal/' + id);
			} else {
				alert('你没有访问TA空间的权限哦~');
			}
		},
		// 同意添加好友的方法
		aggreee(id) {
			this.friendDto.toId = id;
			this.axios({
				method: 'put',
				url: this.GLOBAL.baseUrl + '/friend/confirm',
				data: JSON.stringify(this.friendDto),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				this.showInfoFriendBox();
			});
		},
		// 拒绝添加好友的方法
		reject(id) {
			this.friendDto.toId = id;
			this.axios({
				method: 'delete',
				url: this.GLOBAL.baseUrl + '/friend/reject',
				data: JSON.stringify(this.friendDto),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				this.showInfoFriendBox();
			});
		},
		// 删除好友的方法
		deleteFriend(id) {
			this.friendDto.toId = id;
			this.axios({
				method: 'delete',
				url: this.GLOBAL.baseUrl + '/friend/friend',
				data: JSON.stringify(this.friendDto),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				this.showFriendsBox();
				alert('好友已被删除');
			});
		},
		showPermissionIcon() {
			this.delteteBtnStatus = false;
			this.permissionBtnStatusShow = !this.permissionBtnStatusShow;
		},
		showDeleteIcon() {
			this.permissionBtnStatusShow = false;
			this.delteteBtnStatus = !this.delteteBtnStatus;
		},
		// 音乐播放方法
		play() {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/music/detail',
				data: JSON.stringify({
					userId: this.user.id
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				this.musics = res.data.data.data;
				console.log(this.musics);
				var index = this.musics.length - 1;
				this.singer = this.musics[index].singer;
				this.name = this.musics[index].name;
				this.src = this.musics[index].content;
			});
		},
		change() {
			if (this.colorindex == this.morecolor.length) {
				this.colorindex = 0;
			}
			this.colorindex += 1;
			this.mycolor();
		},
		mycolor() {
			var allcolor = document.getElementById('allcolor');
			var navcolor = document.getElementById('navcolor');
			allcolor.style.backgroundColor = this.morecolor[this.colorindex + 1];
			navcolor.style.backgroundColor = this.morecolor[this.colorindex];
			// alert(this.user.skinId)
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/user/skin',
				data: {
					id: this.user.id,
					skinId: this.colorindex
				}
			}).then(res => {});
		},
		//获取点赞消息记录
		getMessage() {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/message/likes',
				data: {
					id: this.user.id
				}
			}).then(res => {
				this.messageList = res.data.data;
				console.log(this.messageList);
				// alert(res.data.msg)
				// console.log(res.data.msg)
			});
		}
	},
	mounted() {
		this.colorindex = this.user.skinId;
		this.mycolor();
	},
	created() {
		this.friends(this.friendDto);
		this.user = JSON.parse(localStorage.getItem('user'));
		this.play();
	}
};
</script>

<style scoped>
.iconFriends {
	font-size: 26px;
}
.icon {
	font-size: 30px;
}
.rideo {
	position: absolute;
	width: 100%;
	height: 88%;
	border-radius: 5px;
}
.rideoDiv {
	position: relative;
	margin-right: 100px;
}

.routerView {
	margin-top: 2%;
}
.hy-nav-top {
	display: flex;
	width: 100%;
	padding-left: 3%;
	justify-content: space-between;
}

.hy-nav-top-right {
	display: flex;
	height: 100%;
}
.hy-nav-top-left {
	display: flex;
	justify-content: space-between;
	width: 20%;
	align-items: center;
}
.xxq-input-wrap {
	display: flex;
	height: 50%;
	width: 60%;
	border: 1px solid gray;
	border-radius: 3%;
}

.xxq-titleDiv {
	display: flex;
	justify-content: space-between;
}

.myFriendsBox {
	height: 608px;
	overflow: auto;
}

.iconf-Christmas-exit {
	width: 40px;
	height: 40px;
}
</style>
