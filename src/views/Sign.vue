<template>
	<div class="big-container">
		<div class="container">
			<!-- 注册页面 -->
			<div class="form-container sign-up-container" v-if="selected === 0">
				<h1>注册</h1>
				<div class="blank">
					<label class="alert">{{ mobileTip }}</label>
				</div>
				<div class="hy-sign-content">
					<!-- 注册页面的手机号输入框 -->
					<v-text-field label="手机号" clearable v-model="userDto.mobile" @input="checkPhone()"></v-text-field>

					<div style="display: flex;">
						<v-text-field label="验证码" clearable v-model="usercode" @input="checkregbtn"></v-text-field>

						<a @click="getcode" style="cursor: pointer;" :disabled="codeDisabled">{{ codemsg }}</a>

						<!-- <input type="text" placeholder="验证码" style="width: 65%;" v-model="usercode" @input="checkregbtn"> -->
					</div>
				</div>
				<button @click="toregister" :disabled="registerbtn" :class="{ graybtn: registerbtn }">注册</button>
			</div>
			<!-- 图片验证码登录 -->
			<div class="form-container sign-in-container" v-if="selected === 1">
				<h1>登录</h1>
				<div class="blank">
					<label class="alert">{{ mobileTip }}</label>
				</div>
				<a @click="addlogin" class="hy-nopassword-text">免密登录</a>
				<div class="hy-sign-content">
					<!-- 验证码登录的账号输入框 -->
					<v-text-field label="账号" clearable v-model="userDto.mobile" @input="checkPhone()"></v-text-field>
					<!-- 验证码登录页面的密码输入框 -->
					<v-text-field
						:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
						:rules="[rules.required, rules.min]"
						:type="show1 ? 'text' : 'password'"
						name="input-10-1"
						label="密码"
						hint="密码至少六位"
						counter
						@click:append="show1 = !show1"
						v-model="userDto.password"
						@input="checkpassword()"
					></v-text-field>
					<!-- 验证码登录页面的图形验证码及输入框 -->
					<div class="code-box">
						<v-text-field label="验证码" clearable v-model="usercode" @input="checkpiccode()"></v-text-field>
						<div class="verify" @click.prevent="refresh">
							<img ref="codeImg" />
						</div>
					</div>
				</div>

				<button @click="signIn()" :disabled="loginbtn" :class="{ graybtn: loginbtn }">登录</button>
				<a @click="forgetpassword" class="hy-sign-forget">忘记密码</a>
				<div class="hy-icon-pos">
					<i class="iconfont " style="color: #4cafe9;">&#xe6ca;</i>
					<i class="iconfont " style="color: #e71f19">&#xe666;</i>
					<i class="iconfont " style="color:#24db5a">&#xe620;</i>
				</div>
			</div>
			<!-- 免密登录页 -->
			<div class="form-container sign-in-container" v-if="selected === 2">
				<h1>免密登录</h1>
				<div class="blank">
					<label class="alert" v-if="!mobilecode">{{ mobileTip }}</label>
				</div>
				<!-- 免密登录页的主体部分 -->
				<div class="hy-sign-content">
					<!-- 免密登录页面的手机号输入框 -->
					<v-text-field label="手机号" clearable v-model="userDto.mobile" @input="checkPhone()"></v-text-field>
					<!-- 免密登录页面的验证码输入框及输入按钮 -->
					<div style="display: flex;">
						>
						<v-text-field label="验证码" clearable v-model="usercode" @input="checkregbtn"></v-text-field>
						<!-- <input type="text" placeholder="验证码" style="width: 70%;" v-model="usercode" @input="checkregbtn"> -->
						<a @click="getcode" style="cursor:pointer;">{{ codemsg }}</a>
					</div>
				</div>
				<button @click="avoidlogin()" :disabled="registerbtn" :class="{ graybtn: registerbtn }">登录</button>
			</div>
			<!-- 忘记密码页 -->
			<div class="form-container sign-up-container" v-if="selected === 3">
				<h1>找回密码</h1>
				<div class="blank">
					<label class="alert">{{ mobileTip }}</label>
				</div>
				<!-- 找回密码页的主体部分 -->
				<div class="hy-sign-content">
					<!-- 找回密码的手机号输入框 -->
					<v-text-field label="手机号" clearable v-model="userDto.mobile" @input="checkPhone()"></v-text-field>
					<!-- 找回密码页的验证码及验证码按钮 -->
					<div style="display: flex;">
						<v-text-field label="验证码" clearable v-model="usercode" @input="checkretcode()"></v-text-field>
						<a @click="getcode" style="cursor: pointer;">{{ codemsg }}</a>
					</div>
					<!-- 找回密码页的密码输入框 -->
					<v-text-field
						:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
						:rules="[rules.required, rules.min]"
						:type="show1 ? 'text' : 'password'"
						name="input-10-1"
						label="新密码"
						hint="密码至少六位"
						counter
						@click:append="show1 = !show1"
						v-model="userDto.password"
						@input="checkpassword()"
					></v-text-field>
				</div>
				<button @click="tofix" :disabled="retrievebtn" :class="{ graybtn: retrievebtn }">申请修改</button>
			</div>
			<div class="overlay-container">
				<div class="overlay">
					<!-- 注册页面 -->
					<div class="overlay-panel overlay-left" v-if="selected === 0">
						<h1>欢迎回来</h1>
						<p>渴望与你进行心与心的沟通</p>
						<button class="ghost" @click="changelogin">登录</button>
					</div>
					<!-- 图片验证码登录页面 -->
					<div class="overlay-panel overlay-right" v-if="selected === 1">
						<h1>欢迎光临</h1>
						<p>期待你真正加入我们的那天</p>
						<button class="ghost" @click="changelogin">注册</button>
					</div>
					<!-- 免密登录页 -->
					<div class="overlay-panel overlay-right" v-if="selected === 2">
						<h1>欢迎回来</h1>
						<p>旨在提供高质量服务</p>
						<button class="ghost" @click="changelogin">返回</button>
					</div>
					<!-- 忘记密码页 -->
					<div class="overlay-panel overlay-left" v-if="selected === 3">
						<h1>没关系</h1>
						<p>我们会一直陪着你</p>
						<button class="ghost" @click="changelogin">返回</button>
					</div>
				</div>
			</div>
		</div>
		<v-dialog v-model="maskjudge" max-width="180">
			<v-card color="#c4a8ac">
				<v-card-title class="pa-md-4" style="display: flex;justify-content: center;">{{ tipmsg }}</v-card-title>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			userDto: {
				mobile: '',
				password: ''
			},
			code: '',
			usercode: null,
			selected: 1,
			codeimage: '',
			mobileTip: '',
			passwordTip: '',
			codemsg: '获取验证码',
			timer: null,
			countdown: 10,
			codeDisabled: false,
			maskjudge: false,
			tipmsg: '',
			masktime: null,
			maskcountdown: 3,
			status: false,
			mobilecode: false,
			loginbtn: true,
			registerbtn: true,
			retrievebtn: true,
			show1: false,
			password: 'Password',
			rules: {
				min: v => v.length >= 6 || '密码至少六位'
			}
		};
	},
	created() {},
	mounted() {
		this.refresh();
	},
	methods: {
		signIn() {
			// 确保手机号输入格式正确
			if (this.mobilecode === true) {
				// 确保密码输入长度大于5
				if (this.userDto.password.length > 5) {
					let _this = this;
					// 判断用户输入的验证码和后台的验证码是否一致
					if (this.code == this.usercode) {
						this.axios({
							method: 'post',
							url: this.GLOBAL.baseUrl + '/user/signin',
							data: {
								equalsString: this.userDto.mobile,
								password: this.userDto.password
							}
						}).then(res => {
							if (res.data.msg == '成功') {
								this.tipmsg = '登录成功';
								this.getmask();
								this.$router.push({
									path: 'nav'
								});
								localStorage.setItem('user', JSON.stringify(res.data.data));
							} else {
								this.tipmsg = res.data.msg;
								this.getmask();
							}
						});
					} else {
						this.tipmsg = '验证码错误';
						this.getmask();
					}
				} else {
					this.tipmsg = '密码最少六位数';
					this.getmask();
				}
			} else {
				this.tipmsg = '手机号格式错误';
				this.getmask();
			}
		},
		checkPhone() {
			var phone = this.userDto.mobile;
			if (!/^1[3456789]\d{9}$/.test(phone)) {
				this.mobilecode = false;
				this.mobileTip = '手机号格式错误';
			} else {
				this.mobilecode = true;
				this.mobileTip = '';
			}
		},
		avoidlogin() {
			if (this.mobilecode == true) {
				if (this.usercode == this.code) {
					this.axios({
						method: 'post',
						url: this.GLOBAL.baseUrl + '/user/signin',
						data: {
							equalsString: this.userDto.mobile,
							keyWords: this.usercode
						}
					}).then(res => {
						if (res.data.msg === '成功') {
							this.tipmsg = '登录成功';
							this.$router.push({
								path: 'nav'
							});
							this.getmask();
						} else {
							this.tipmsg = res.data.msg;
						}
					});
				} else {
					this.tipmsg = '验证码错误';
					this.getmask();
				}
			} else {
				this.tipmsg = '手机号格式错误';
				this.getmask();
			}
		},
		toregister() {
			if (this.mobilecode == true) {
				this.axios({
					method: 'post',
					url: this.GLOBAL.baseUrl + '/user/signup',
					data: {
						equalsString: this.userDto.mobile,
						keyWords: this.usercode
					}
				}).then(res => {
					console.log(res.data);
					if (res.data.msg === '成功') {
						this.tipmsg = '注册成功';
					} else {
						this.tipmsg = res.data.msg;
						this.getmask();
					}
				});
			} else {
				this.tipmsg = '手机号格式错误';
				this.getmask();
			}
			this.mobilecode = false;
			this.userDto.password = '';
			this.userDto.mobile = '';
			this.usercode = '';
		},
		refresh() {
			let _this = this;
			this.axios.get(this.GLOBAL.baseUrl + '/code').then(res => {
				_this.code = res.data.data.code;
				var img = this.$refs.codeImg;
				img.src = res.data.data.img;
			});
		},
		getcode() {
			if (
				(this.selected === 2 && this.mobilecode == true) ||
				this.codeDisabled == true ||
				(this.selected == 3 && this.mobilecode == true) ||
				(this.selected == 0 && this.mobilecode == true)
			) {
				if (!this.timer) {
					this.timer = setInterval(() => {
						if (this.countdown > 0 && this.countdown <= 10) {
							this.codeDisabled = true;
							this.countdown--;
							if (this.countdown != 0) {
								this.codemsg = '重新发送(' + this.countdown + ')';
							} else {
								clearInterval(this.timer);
								this.codemsg = '获取验证码';
								this.countdown = 10;
								this.timer = null;
								this.codeDisabled = false;
							}
						}
					}, 1000);
					this.tipmsg = '验证码发送成功';
					this.getmask();
					let _this = this;
					this.axios.post(this.GLOBAL.baseUrl + '/sms?mobile=' + this.userDto.mobile).then(function(response) {
						console.log(response.data.data);
						_this.code = response.data.data;
					});
				}
			} else {
				this.tipmsg = '手机号格式错误';
				this.getmask();
			}
		},
		changelogin() {
			this.userDto.password = '';
			this.userDto.mobile + '';
			this.mobilecode = false;
			this.loginbtn = true;
			this.registerbtn = true;
			this.retrievebtn = true;
			if (this.selected == 2) {
				this.selected = 1;
			}
			if (this.selected == 1) {
				this.selected = 0;
			} else {
				this.selected = 1;
			}
			this.code = '';
			this.usercode = null;
			this.userDto.password = '';
			this.userDto.mobile = '';
			this.refresh();
			this.mobileTip = '';
		},
		addlogin() {
			if (this.selected == 1) {
				this.selected = 2;
			}
			this.code = '';
			this.usercode = null;
			this.userDto.password = '';
			this.userDto.mobile = '';
		},
		forgetpassword() {
			if (this.selected == 1) {
				this.selected = 3;
			}
			this.code = '';
			this.usercode = null;
			this.userDto.password = '';
			this.userDto.mobile = '';
		},
		getmask() {
			// 定时器
			if (!this.masktime) {
				this.masktime = setInterval(() => {
					if (this.maskcountdown > 0 && this.maskcountdown <= 3) {
						this.maskjudge = true;
						this.maskcountdown--;
						if (this.maskcountdown == 0) {
							clearInterval(this.masktime);
							this.masktime = null;
							this.maskjudge = false;
							this.maskcountdown = 3;
							this.tipmsg = '';
						}
					}
				}, 500);
			}
		},
		tofix() {
			if (this.mobilecode === true) {
				if (this.userDto.password.length > 5) {
					if (this.code == this.usercode) {
						this.axios({
							method: 'put',
							url: this.GLOBAL.baseUrl + '/user/userPassword',
							data: {
								name: this.userDto.mobile,
								password: this.userDto.password,
								verifyCode: this.usercode
							}
						}).then(res => {
							if (res.data.msg == '成功') {
								this.tipmsg = '修改成功';
								this.getmask();
							} else {
								this.tipmsg = res.data.msg;
								this.getmask();
							}
						});
					} else {
						this.tipmsg = '验证码输入错误';
						this.getmask();
					}
				} else {
					this.tipmsg = '密码最少六位数';
					this.getmask();
				}
			} else {
				this.tipmsg = '手机号格式错误';
				this.getmask();
			}
		},
		checkpassword() {
			if (this.userDto.password.length > 5) {
				this.codeDisabled = true;
				this.retrievebtn = false;
				this.mobileTip = '';
			}
		},
		checkpiccode() {
			if (this.usercode.length === 4 && this.userDto.mobile && this.userDto.password) {
				this.loginbtn = false;
			} else {
				this.loginbtn = true;
			}
		},
		checkregbtn() {
			if (this.usercode.length === 6 && this.userDto.mobile) {
				this.registerbtn = false;
			} else {
				this.registerbtn = true;
			}
		},
		checkretcode() {
			if (this.usercode.length == 6 && this.userDto.mobile && this.userDto.password) {
				this.retrievebtn = false;
			} else {
				this.retrievebtn = true;
			}
		}
	},

	computed: {}
};
</script>

<style scoped>
.graybtn {
	background-color: gray;
	border: gray;
}

.iconfont {
	font-family: 'iconfont' !important;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
	cursor: pointer;
	font-size: 24px;
}

.hy-icon-arrows {
	position: absolute;
	top: 3%;
	right: 5%;
	font-size: 80px;
}

.hy-nopassword-text {
	cursor: pointer;
	position: absolute;
	top: 5%;
	right: 10%;
	color: #0000ee;
}

.hy-sign-forget {
	cursor: pointer;
	position: absolute;
	right: 10%;
	bottom: 10%;
	color: #0000ee;
}

.hy-icon-pos-dia {
	position: absolute;
	right: 5%;
	top: 35%;
}

.hy-icon-pos {
	width: 45%;
	position: absolute;
	bottom: 5%;
	display: flex;
	justify-content: space-around;
}

.mask {
	width: 100%;
	height: 100%;
	display: flex;
	background-color: #757575;
	opacity: 0.7;
	justify-content: center;
	align-items: center;
	text-align: center;
	position: relative;
}

.mask-box {
	width: 10%;
	height: 10%;
	border-radius: 5%;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	z-index: 2;
	top: 10%;
}

.code-box {
	display: flex;
	justify-content: space-between;
	width: 100%;
	position: relative;
}

.alert {
	color: red;
}

.blank {
	padding: 3%;
	height: 6%;
}

.big-container {
	font-family: 'Montserrat', sans-serif;
	background: #f6f5f7;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-image: url(../assets/img/123.jpg);
	background-size: cover;
}

h1 {
	font-weight: bold;
	margin: 0;
	color: beige;
}

p {
	font-size: 14px;
	font-weight: bold;
	line-height: 20px;
	letter-spacing: 0.5px;
}

span {
	font-size: 12px;
	color: beige;
}

a {
	color: #fff;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
}

.verify {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 30%;
	height: 60%;
	cursor: pointer;
	border-radius: 5%;
	position: absolute;
	right: 0;
	bottom: 30%;
}
img {
	width: 100%;
	height: 90%;
}

.container {
	border-radius: 10px;
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
	position: absolute;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
	opacity: 0.8;
	/* z-index: 1; */
}

.form-container {
	background: rgba(45, 52, 54, 0.7);
	display: flex;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	justify-content: center;
	align-items: center;
	text-align: center;
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
	z-index: 1;
}

.social-container {
	margin: 20px 0;
}

.social-container a {
	border: 1px solid #ddd;
	border-radius: 50%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin: 0 5px;
	height: 40px;
	width: 40px;
}

.form-container input {
	background: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}

button {
	border-radius: 20px;
	border: 1px solid #ff4b2b;
	background: #ff4b2b;
	color: #fff;
	font-size: 12px;
	font-weight: bold;
	padding: 8px 35px;
	letter-spacing: 1px;
	margin: 5%;
}

input[type='text'] {
	width: 90%;
	text-align: center;
	background: transparent;
	border: none;
	border-bottom: 1px solid #fff;
	font-family: 'PLay', sans-serif;
	font-size: 16px;
	font-weight: 200px;
	/* transition: border 0.5s; */
	outline: none;
	color: #fff;
	font-weight: bold;
}

input[type='password'] {
	width: 90%;
	text-align: center;
	background: transparent;
	border: none;
	border-bottom: 1px solid #fff;
	font-family: 'PLay', sans-serif;
	font-size: 16px;
	font-weight: bold;
	transition: border 0.5s;
	outline: none;
	color: #fff;
}

button:active {
	transform: scale(0.95);
}

button.ghost {
	background: transparent;
	border-color: #ff4b2b;
	background-color: #ff4b2b;
}

.sign-in-container {
	left: 0;
	width: 50%;
}

.sign-up-container {
	left: 50%;
	width: 50%;
}

.overlay-container {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.overlay {
	background: transparent;
	background: linear-gradient(to right, #ff4b2b, #ff416c) no repeat 0 0 / cover;
	color: #fff;
	position: absolute;
	height: 100%;
	width: 100%;
	transition: transform 0.6s ease-in-out;
}

.overlay-panel {
	position: absolute;
	top: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0 40px;
	height: 100%;
	width: 50%;
	text-align: center;
	transition: transform 0.6s ease-in-out;
}

.overlay-right {
	position: relative;
	left: 50%;
}

@font-face {
	font-family: 'iconfont';
	src: url('//at.alicdn.com/t/font_1551082_2eu4o9k3sdz.eot');
	src: url('//at.alicdn.com/t/font_1551082_2eu4o9k3sdz.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1551082_2eu4o9k3sdz.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1551082_2eu4o9k3sdz.woff') format('woff'), url('//at.alicdn.com/t/font_1551082_2eu4o9k3sdz.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1551082_2eu4o9k3sdz.svg#iconfont') format('svg');
}
</style>
