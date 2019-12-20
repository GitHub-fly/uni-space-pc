<template>
	<div class="hy-index-large">
		<div class="hy-index-mid ba-col-9">
			<div class="hy-user-large ba-xx-c">
				<div class="ba-col-1">
					<div class="avatar">
						<div class="img">
							<img :src="user.avatar" alt="测试头像" />
							<div class="file-box">
								<input type="file" title="更改头像" id="file" @change="changeAvatar($event)" accept=".jpg,.gif,.png,.bmp" ref="InputFile" name="files" />
							</div>
						</div>
					</div>
				</div>
				<div class="ba-col-8 hy-user-container">
					<div class="ba-col-10">
						<div class="hy-user-info" @mouseover="showFunction()" @mouseleave="hideFunction()">
							<h1 class="title">昵称</h1>
							<div class="value">
								<input type="text" class="input" :disabled="status" v-model="user.nickname" v-if="showInput" />
								<span v-else class="content">{{ user.nickname }}</span>
								<i class="iconfont" @click="saveNickname()" v-if="showSave">&#xea6e;保存</i>
								<i class="iconfont" @click="update()" v-if="showUpdate">&#xe600;修改</i>
							</div>
						</div>

						<div class="hy-user-info" @mouseover="showFunctionGender()" @mouseleave="hideFunctionGender()">
							<h1 class="title">性别</h1>
							<div class="value">
								<div class="radio" v-if="showRadio">
									<label for="" style="margin-right: 30px;">
										<input name="gender" type="radio" value="男" />
										男
									</label>
									<label for="" style="margin-right: 30px;">
										<input name="gender" type="radio" value="女" />
										女
									</label>
								</div>

								<span class="content" v-else>{{ user.gender }}</span>

								<i class="iconfont" @click="saveGender()" v-if="showSaveGender">&#xea6e;保存</i>
								<i class="iconfont" @click="updateGender()" v-if="showUpdateGender">&#xe600;修改</i>
							</div>
						</div>

						<div class="hy-user-info" @mouseover="showFunctionIntro()" @mouseleave="hideFunctionIntro()">
							<h1 class="title">简介</h1>
							<div class="value">
								<!-- <input type="text" class="input" v-model="user.introduction" v-if="showInputIntro" /> -->
								<textarea id="textarea" v-if="showInputIntro" rows="5" :value="user.introduction"></textarea>
								<span class="content-intro" v-else>{{ user.introduction.substring(0, 13) }}</span>
								<i class="iconfont" @click="saveIntro()" v-if="showSaveIntro">&#xea6e;保存</i>
								<i class="iconfont" @click="updateIntro()" v-if="showUpdateIntro">&#xe600;修改</i>
							</div>
						</div>

						<div class="hy-user-info" @mouseover="showFunctionAddress()" @mouseleave="hideFunctionAddress()">
							<h1 class="title">居住地</h1>
							<div class="value">
								<input type="text" class="input" v-model="user.address" v-if="showInputAddress" />
								<span v-else class="content">{{ user.address }}</span>
								<i class="iconfont" @click="saveAddress()" v-if="showSaveAddress">&#xea6e;保存</i>
								<i class="iconfont" @click="updateAddress()" v-if="showUpdateAddress">&#xe600;修改</i>
							</div>
						</div>

						<div class="hy-user-info">
							<h1 class="title">手机号</h1>
							<div class="value">
								<span class="content">{{ user.mobile }}</span>
							</div>
						</div>

						<div class="hy-user-info" @mouseover="showFunctionEmail()" @mouseleave="hideFunctionEmail()">
							<h1 class="title">邮箱</h1>
							<div class="value">
								<input type="email" class="input" v-model="user.email" v-if="showInputEmail" />
								<span v-else class="content">{{ user.email }}</span>
								<i class="iconfont" @click="saveEmail()" v-if="showSaveEmail">&#xea6e;保存</i>
								<i class="iconfont" @click="updateEmail()" v-if="showUpdateEmail">&#xe600;修改</i>
							</div>
						</div>

						<div class="hy-user-info" @mouseover="showFunctionAccount()" @mouseleave="hideFunctionAccount()">
							<h1 class="title">账号</h1>
							<div class="value">
								<input type="text" class="input" v-model="user.account" v-if="showInputAccount" />
								<span v-else class="content">{{ user.account }}</span>
								<i class="iconfont" @click="saveAccount()" v-if="showSaveAccount">&#xea6e;保存</i>
								<i class="iconfont" @click="updateAccount()" v-if="showUpdateAccount">&#xe600;修改</i>
							</div>
						</div>

						<div class="hy-user-info" @mouseover="showFunctionBirthday()" @mouseleave="hideFunctionBirthday()">
							<h1 class="title">生日</h1>
							<div class="value">
								<div v-if="showInputBirthday" class="selectBox">
									<select name="year" id="year" @change="changeDays()">
										<option :value="index + 1960" v-for="(item, index) in 60" :key="index">{{ item + 1959 }}</option>
									</select>
									<select name="month" id="month" @change="changeDays()">
										<option :value="index + 1" v-for="(item, index) in 12" :key="index">{{ item }}</option>
									</select>
									<select name="day" id="day">
										<option :value="index" v-for="(item, index) in days" :key="index">{{ item }}</option>
									</select>
								</div>
								<span class="content" v-else>{{ user.birthday }}</span>
								<i class="iconfont" @click="saveBirthday()" v-if="showSaveBirthday">&#xea6e;保存</i>
								<i class="iconfont" @click="updateBirthday()" v-if="showUpdateBirthday">&#xe600;修改</i>
							</div>
						</div>

						<div class="hy-user-info" @mouseover="showFunctionConstellation()" @mouseleave="hideFunctionConstellation()">
							<h1 class="title">星座</h1>
							<div class="value">
								<select name="" id="constellation" v-if="showInputConstellation">
									<option :value="item" v-for="(item, index) in constellationList" :key="index">{{ item }}</option>
								</select>
								<span class="content" v-else>{{ user.constellation }}</span>
								<i class="iconfont" @click="saveConstellation()" v-if="showSaveConstellation">&#xea6e;保存</i>
								<i class="iconfont" @click="updateConstellation()" v-if="showUpdateConstellation">&#xe600;修改</i>
							</div>
						</div>
					</div>
					<div class="function"></div>
				</div>
			</div>
		</div>
	
	</div>
</template>

<script>
export default {
	data() {
		return {
			user: {
				id: null,
				mobile: '',
				// account: '',
				verifyCode: '',
				nickname: '',
				// email: '',
				avatar: '',
				address: '',
				gender: '',
				introduction: '',
				constellation: '',
				birthday: ''
			},
			status: true,
			showInput: false,
			showUpdate: false,
			showSave: false,

			showRadio: false,
			showUpdateGender: false,
			showSaveGender: false,

			// 个人简介：
			showInputIntro: false,
			showUpdateIntro: false,
			showSaveIntro: false,

			// 地址
			showSaveAddress: false,
			showUpdateAddress: false,
			showInputAddress: false,

			// 邮箱
			showSaveEmail: false,
			showUpdateEmail: false,
			showInputEmail: false,

			// 地址
			showSaveAccount: false,
			showUpdateAccount: false,
			showInputAccount: false,

			// 星座
			showSaveConstellation: false,
			showUpdateConstellation: false,
			showInputConstellation: false,
			constellationList: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],

			// 生日
			showSaveBirthday: false,
			showUpdateBirthday: false,
			showInputBirthday: false,

			days: 31
		};
	},

	created() {
		this.axios({
			method: 'post',
			url: this.GLOBAL.baseUrl + '/user/id',
			data: {
				id: JSON.parse(localStorage.getItem('user')).id
			},
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(res => {
			this.user = res.data.data;
		})
	},

	methods: {
		// 更改头像的方法
		changeAvatar(e) {
			var reader = new FileReader();
			let fileData = this.$refs.InputFile.files[0];
			console.log(fileData)
			reader.readAsDataURL(fileData);
			let _this = this;
			// 使用formapi打包
			let formData = new FormData();
			formData.append('file', fileData);

			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/img',
				data: formData
			}).then(res => {
				this.user.avatar = res.data.data[0];
				this.user.id = this.user.id;
				this.axios({
					method: 'put',
					url: this.GLOBAL.baseUrl + '/user/avatar',
					data: JSON.stringify(this.user),
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(res => {
					alert('修改成功');
				});
			});
		},

		save() {
			this.user.id = JSON.parse(localStorage.getItem('user')).id;
			this.axios({
				method: 'put',
				url: this.GLOBAL.baseUrl + '/user/data',
				data: JSON.stringify(this.user),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {});
		},

		update() {
			this.showInput = true;
			this.status = false;
			this.showSave = true;
		},

		showFunction() {
			this.showUpdate = true;
		},
		hideFunction() {
			this.showUpdate = false;
		},

		saveNickname() {
			this.save();
			this.showSave = false;
			this.showInput = false;
		},

		showFunctionGender() {
			this.showUpdateGender = true;
		},
		updateGender() {
			this.showRadio = true;
			this.showSaveGender = true;
		},
		hideFunctionGender() {
			this.showUpdateGender = false;
		},
		saveGender() {
			//获取所有单选按钮（同一组），得到对象
			var genders = document.getElementsByName('gender');
			for (var i = 0; i < genders.length; i++) {
				if (genders[i].checked) {
					this.user.gender = genders[i].value;
					return;
				}
			}
			this.save();
			this.showSaveGender = false;
			this.showRadio = false;
		},

		showFunctionIntro() {
			this.showUpdateIntro = true;
		},
		saveIntro() {
			this.user.introduction = document.getElementById('textarea').value;
			this.save();
			this.showSaveIntro = false;
			this.showInputIntro = false;
		},
		updateIntro() {
			this.introStatus = false;
			this.showInputIntro = true;
			this.showSaveIntro = true;
		},
		hideFunctionIntro() {
			this.showUpdateIntro = false;
		},

		showFunctionAddress() {
			this.showUpdateAddress = true;
		},
		updateAddress() {
			this.showInputAddress = true;
			this.AddressStatus = false;
			this.showSaveAddress = true;
		},
		saveAddress() {
			this.axios({
				method: 'put',
				url: this.GLOBAL.baseUrl + '/user/userData',
				data: JSON.stringify(this.user),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				this.showInputAddress = false;
				this.showSaveAddress = false;
			});
		},
		hideFunctionAddress() {
			this.showUpdateAddress = false;
		},

		showFunctionEmail() {
			this.showUpdateEmail = true;
		},
		updateEmail() {
			this.showInputEmail = true;
			this.showSaveEmail = true;
		},
		saveEmail() {
			this.save();
			this.showSaveEmail = false;
			this.showInputEmail = false;
		},
		hideFunctionEmail() {
			this.showUpdateEmail = false;
		},

		showFunctionAccount() {
			this.showUpdateAccount = true;
		},
		updateAccount() {
			this.showInputAccount = true;
			this.showSaveAccount = true;
		},
		saveAccount() {
			this.save();
			this.showSaveAccount = false;
			this.showInputAccount = false;
		},
		hideFunctionAccount() {
			this.showUpdateAccount = false;
		},

		showFunctionBirthday() {
			this.showUpdateBirthday = true;
		},
		updateBirthday() {
			this.showInputBirthday = true;
			this.showSaveBirthday = true;
		},
		saveBirthday() {
			let year = document.getElementById('year').value;
			let month = document.getElementById('month').value;
			let day = document.getElementById('day').value;
			this.user.birthady = year + '-' + month + '-' + day;
			this.save();
			this.showSaveBirthday = false;
			this.showInputBirthday = false;
		},
		hideFunctionBirthday() {
			this.showUpdateBirthday = false;
		},

		changeDays() {
			let year = document.getElementById('year').value;
			let month = document.getElementById('month').value;
			if (year % 4 == 0 && month == 2) {
				return (this.days = 29);
			}
			if (year % 4 != 0 && month == 2) {
				return (this.days = 28);
			}

			if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
				return (this.days = 31);
			} else {
				return (this.days = 30);
			}
		},

		showFunctionConstellation() {
			this.showUpdateConstellation = true;
		},
		updateConstellation() {
			this.showInputConstellation = true;
			this.showSaveConstellation = true;
		},
		saveConstellation() {
			this.user.constellation = document.getElementById('constellation').value;
			this.save();
			this.showSaveConstellation = false;
			this.showInputConstellation = false;
		},
		hideFunctionConstellation() {
			this.showUpdateConstellation = false;
		}
	},

	computed: {}
};
</script>

<style scoped>
* {
	transition: all 1s ease 0s;
}
#file {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	cursor: pointer;
	opacity: 0;
}
.file-box {
	position: relative;
	margin-top: -200px;
	width: 200px;
	height: 200px;
	opacity: 0.5;
}

.avatar {
	width: 200px;
	height: 200px;
	cursor: pointer;
}
.img {
	width: 100%;
	height: 100%;
}
.img img {
	position: relative;
	border-radius: 20px;
	width: 100%;
	height: 100%;
}
img:hover {
	animation: mymove 2s infinite;
}

select {
	margin-right: 20px;
	height: 30px;
	width: 80px;
}
.selectBox {
	height: 100%;
}
textarea {
	width: 75%;
}
.content-intro {
	/* font-family: '楷体'; */
	font-size: 18px;
}
.iconfont {
	margin-right: 10px;
}
.content {
	/* font-family: '楷体'; */
	font-size: 18px;
}
.title {
	font-size: 30px;
	width: 15%;
}
.input {
	outline: none;
	border-radius: 20px;
	border: 1px solid gray;
	padding-left: 20px;
}
.function {
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 20%;
}
.value {
	width: 90%;
	display: flex;
	align-items: center;
}

.hy-user-info {
	width: 100%;
	height: 45px;
	display: flex;
	align-items: center;
	margin-bottom: 5%;
	border-bottom: 1px solid lightgray;
}
.ba-col-10 {
	padding: 30px 10px 10px 10px;
	display: flex;
	flex-direction: column;
}

.hy-user-large {
	width: 100%;
	display: flex;
}
.hy-user-container {
	margin-top: 1%;
	display: flex;
}
.hy-user-block-row {
	width: 100%;
	height: 18%;
	margin-bottom: 20px;
	border-bottom: 2px solid gray;
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
	display: flex;
	flex-wrap: wrap;
}

.hy-index-rigth {
	background-color: white;
}
</style>
