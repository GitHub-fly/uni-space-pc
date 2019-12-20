<template>
	<div>
		<div>
			<v-bottom-navigation :value="activeBtn" grow color="teal">
				<div class="hy-nav-top">
					<div class="hy-nav-top-left">
						<v-btn height="100%" width="50%" to="/"><v-img width="60%" height="100%" src="../assets/img/ic_launcher.png"></v-img></v-btn>
						<div height="100%" class="title" style="cursor: default;">UNI-SPACE</div>
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

						<v-btn style="height: 100%;">
							<v-avatar color="teal" size="48"><img :src="user.avatar" /></v-avatar>
						</v-btn>
						<v-btn style="height: 100%;"><i @click="layout()" class="iconfont">&#xe65b;</i></v-btn>
						<v-btn style="height: 100%;"><v-icon>mdi-heart</v-icon></v-btn>
						<v-menu offset-y>
							<template v-slot:activator="{ on }">
								<v-btn v-on="on" style="height: 100%;"><i class="iconfont">&#xe722;</i></v-btn>
							</template>

							<v-list>
								<v-list-item @click="tohome()"><v-list-item-title>个人主页</v-list-item-title></v-list-item>

								<v-list-item @click="changemessage()"><v-list-item-title>信息修改</v-list-item-title></v-list-item>

								<v-list-item @click="changeencrypted()"><v-list-item-title>密码修改</v-list-item-title></v-list-item>

								<v-list-item><v-list-item-title>设置</v-list-item-title></v-list-item>

								<v-list-item @click="toexit()"><v-list-item-title>退出</v-list-item-title></v-list-item>
							</v-list>
						</v-menu>
						<v-btn @click.stop="drawer = !drawer" style="height: 100%;"><v-icon medium>mdi-account-multiple</v-icon></v-btn>
					</div>
				</div>
			</v-bottom-navigation>

			<v-navigation-drawer v-model="drawer" temporary absolute right width="25%">
				<v-card max-width="450" class="mx-auto">
					<v-toolbar flat>
						<v-btn icon @click="showFriendsBox()" small><v-icon medium>mdi-account</v-icon></v-btn>
						<v-btn icon @click="showInfoFriendBox()" small><i class="iconfont">&#xe601;</i></v-btn>
						<v-btn icon @click="showAddFriendBox()" small><v-icon>mdi-plus-circle</v-icon></v-btn>
						<!-- 空白填充 -->
						<v-spacer></v-spacer>
						<!-- 输入框 -->
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
							<v-btn icon v-if="tabText === '我的好友'"><v-icon left @click="showDeleteIcon()">mdi-delete</v-icon></v-btn>
						</div>
					</template>

					<div class="myFriendsBox">
						<v-list three-line>
							<template v-for="(item, index) in myFriends">
								<v-list-item :key="index">
									<v-list-item-avatar @click="toPersion(item.id)" style="cursor: pointer;"><v-img :src="item.avatar"></v-img></v-list-item-avatar>
									<v-list-item-content>
										<v-list-item-title>
											<div class="xxq-titleDiv">
												<span>{{ item.nickname }}</span>
												<v-btn icon small v-if="tabText === '添加好友'"><v-icon @click="addFriend(item.id)">+</v-icon></v-btn>
												<v-btn icon small v-if="delteteBtnStatus"><v-icon small @click="deleteFriend(item.id)">mdi-minus</v-icon></v-btn>
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
		tohome() {
			this.$router.push('/personal/' + JSON.parse(localStorage.getItem('user')).id);
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
		toPersion(id) {
			this.$router.push('/personal/' + id);
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
		showDeleteIcon() {
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
		}
	},

	created() {
		this.friends(this.friendDto);
		this.user = JSON.parse(localStorage.getItem('user'));
		this.play();
	}
};
</script>

<style scoped>
.rideo {
	position: absolute;
	top: -14px;
	width: 100%;
	height: 116%;
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
	padding-left: 10%;
	justify-content: space-between;
}

.hy-nav-top-right {
	display: flex;
	height: 100%;
}
.hy-nav-top-left {
	display: flex;
	justify-content: space-between;
	width: 15%;
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

.xxq-myFriendsBox {
	height: 608px;
	overflow: auto;
}
</style>
