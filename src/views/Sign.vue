<template>
	<div class="big-container">
		<div class="container">
			<div class="form-container sign-up-container" v-if="selected===0">
				<h1>register</h1>
				<span>电子邮箱注册</span>
				<div class="blank">
					<label class="alert">{{mobileTip}}</label>
				</div>
				<input type="text" placeholder="手机号" v-model="userDto.mobile" @input="checkPhone()">
				<input type="password" placeholder="密码" v-model="userDto.password">
				<div class="row">
					<input type="text" placeholder="验证码" style="width: 65%;" v-model="usercode">
					<a @click="getcode" style="cursor: pointer;">获取验证码</a>
				</div>
				<button @click="toregister" :disabled="status">注册</button>
			</div>
			<div class="form-container sign-in-container" v-if="selected===1">
				<h1>login</h1>
				<a @click="mobilelogin" style="cursor: pointer;">或用手机号登录</a>
				<input type="text" placeholder="账号" v-model="userDto.mobile">
				<input type="password" placeholder="密码" v-model="userDto.password">
				<div class="code-box">
					<input type="text" placeholder="验证码" v-model="usercode" style="width: 70%;">
					<img class="verify" @click.prevent="refresh" ref="codeImg" />
				</div>
				<button @click="signIn">登录</button>
			</div>

			<div class="form-container sign-in-container" v-if="selected===2">
				<h1>login</h1>
				<div class="blank">
					<label class="alert">{{mobileTip}}</label>
				</div>
				<input type="text" placeholder="手机号" v-model="userDto.mobile" @input="checkPhone()">
				<div class="row">
					<input type="text" placeholder="验证码" style="width: 70%;" v-model="usercode">
					<span @click="getcode" style="cursor: pointer;">获取验证码</span>
				</div>
				<button @click="avoidlogin">登录</button>
			</div>

			<div class="overlay-container">
				<div class="overlay">
					<div class="overlay-panel overlay-left" v-if="selected===0">
						<h1>欢迎回来</h1>
						<p>与我们保持联系请登录您的个人信息</p>
						<button class="ghost" @click="changelogin">登录</button>
					</div>

					<div class="overlay-panel overlay-right" v-if="selected===1">
						<h1>欢迎光临</h1>
						<p>输入您的个人资料，并与我们一起开始旅程</p>
						<button class="ghost" @click="changelogin">注册</button>
					</div>

					<div class="overlay-panel overlay-right" v-if="selected===2">
						<h1>免密登录</h1>
						<p>与我们保持联系请登录您的个人信息</p>
						<button class="ghost" @click="changelogin">返回</button>
					</div>
				</div>
			</div>

		</div>
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
				judgemobile: false,
				codeimage: '',
				status: false,
				mobileTip: ''
			};
		},
		created() {},
		mounted() {
			this.refresh();
		},
		methods: {
			signIn() {
				if (this.code == this.usercode) {
					this.axios({
						method: 'post',
						url: this.GLOBAL.baseUrl + '/user/sign_in',
						data: {
							name: this.userDto.mobile,
							password: this.userDto.password,
						},
					}).then(res => {
						console.log(res.data.data);
						if (res.data.msg == "成功") {
							this.$router.push({
								path:  '/nav',
								query: {
									id: res.data.data.id
								}
							})
							alert("登录成功");
						} else {
							alert("密码错误")
						}
					});
				} else {
					alert("验证码错误");
				}
			},
			checkPhone() {
				var phone = this.userDto.mobile;
				if (!(/^1[3456789]\d{9}$/.test(phone))) {
					this.mobileTip = "手机格式不正确";
					this.status = true;
					return false;
				} else {
					this.mobileTip = '';
					this.status = false;
				}
			},
			avoidlogin() {
				alert("进入函数")
				if (this.usercode == this.code) {
					this.axios({
						method: 'post',
						url: this.GLOBAL.baseUrl + '/user/sign_in',
						data: {
							name: this.userDto.mobile,
							verifyCode: this.usercode
						},
					}).then(res => {
						console.log(res.data)
						if (res.data.msg === "成功") {
							alert("登录成功");
						} else {
							alert("密码错误")
						}
					})
				} else {
					alert("验证码错误");
				}
			},
			toregister() {
				if (this.code === this.usercode) {
					this.axios({
						method: 'post',
						url: 'http://localhost:8080/api/user/sign_up',
						data: {
							"name": this.userDto.mobile,
							"password": this.userDto.password,
							"verifyCode": this.usercode
						}
					}).then(res => {
						if (res.data.msg === "成功") {
							alert("注册成功")
						}
					})
				} else {
					alert("验证码输入错误");
				}
			},
			refresh() {
				let _this = this;
				this.axios.get('http://localhost:8080/api/code').then(res => {
					_this.code = res.data.data.code;
					var img = this.$refs.codeImg;
					// let url = window.URL.createObjectURL(res.data);
					img.src = res.data.data.img;
				})
			},
			getcode() {
				alert("发送验证码")
				let _this = this;
				this.axios.post('http://localhost:8080/api/sms?mobile=' + this.userDto.mobile)
					.then(function(response) {
						_this.code = response.data.data;
					})
			},
			changelogin() {
				if (this.selected == 1) {
					this.selected = 0;
				} else {
					this.selected = 1;
				}
				if (this.selected == 2) {
					this.selected = 1;
				}
				this.code = '';
				this.usercode = null;
				this.userDto.password = '';
				this.userDto.mobile = '';
				this.refresh();
				this.mobileTip = '';
			},
			mobilelogin() {
				if (this.selected == 1) {
					this.selected = 2;
				}
				this.code = '';
				this.usercode = null;
				this.userDto.password = '';
				this.userDto.mobile = '';


			}

		}

	}
</script>

<style scoped>
	.code-box {
		display: flex;
		justify-content: space-between;
		width: 90%;
		position: relative;
	}

	.alert {
		color: red;
	}

	.blank {
		padding: 3%;
		height: 3%;
	}

	.big-container {
		font-family: 'Montserrat', sans-serif;
		background: #f6f5f7;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-image: url(../assets/img/img1.png);
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
		height: 70%;
		cursor: pointer;
		border-radius: 5%;
		position: absolute;
		right: 0;
		bottom: 14%;
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
	}

	.form-container {
		background: rgba(45, 52, 54, 1.0);
		display: flex;
		flex-direction: column;
		padding: 0 50px;
		height: 100%;
		justify-content: center;
		align-items: center;
		text-align: center;
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
		padding: 12px 45px;
		letter-spacing: 1px;
	}

	input[type=text] {
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

	input[type=password] {
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
		background-color: #ff4b2b
	}

	.form-container {
		position: absolute;
		top: 0;
		height: 100%;
		transition: all 0.6s ease-in-out;
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
		background: linear-gradient(to right, #ff4b2b, #ff416c) no repeat 0 0 /cover;
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
</style>
