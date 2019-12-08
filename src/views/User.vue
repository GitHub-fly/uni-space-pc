<template>
	<div class="hy-user-large ba-xx-c">
		<div class="ba-col-2"></div>

		<div class="ba-col-8 hy-user-container">
			<div class="ba-col-1"></div>
			<div class="ba-col-10">
				<div class="info">
					<div class="item"><h1>昵称</h1></div>
					<div class="value"><input type="text" class="value" :disabled="status" v-model="user.nickname" /></div>
				</div>
				<div class="info">
					<div class="item"><h1>手机号:</h1></div>
					<div class="value"><input type="text" class="mobile" disabled :placeholder="user.mobile" /></div>
				</div>
				<div class="info">
					<div class="item"><h1>账号:</h1></div>
					<div class="value"><input type="text" class="value" placeholder="未设置" :disabled="status" v-model="user.account" /></div>
				</div>
				<div class="info">
					<div class="item"><h1>邮箱:</h1></div>
					<div class="value"><input type="text" class="value" placeholder="未设置" :disabled="status" v-model="user.email" /></div>
				</div>
				<div class="info">
					<div class="item"><h1>地址:</h1></div>
					<div class="value"><input type="text" class="value" :disabled="status" v-model="user.address" /></div>
				</div>
				<div class="info">
					<div class="item"><h1>性别:</h1></div>
					<div class="value"><input type="text" class="value" :disabled="status" v-model="user.gender" /></div>
				</div>
				<div class="info">
					<div class="item"><h1>简介:</h1></div>
					<div class="value"><input type="text" class="value" :disabled="status" v-model="user.introduction" /></div>
				</div>
				<div class="info">
					<div class="item"><h1>星座:</h1></div>
					<div class="value"><input type="text" class="value" :disabled="status" v-model="user.constellation" /></div>
				</div>
				<div class="info">
					<div class="item"><h1>生日:</h1></div>
					<div class="value"><input type="text" class="value" :disabled="status" v-model="user.birthday" /></div>
				</div>
			</div>
			<div class="function">
				<label for="">
					<i class="iconfont" @click="update()">&#xe600;</i>
					修改
				</label>
				<label for="" @click="save()">
					<i class="iconfont">&#xea6e;</i>
					保存
				</label>
			</div>
		</div>

		<div class="ba-col-2"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			user: {
				mobile: '',
				account: '',
				nickname: '',
				email: '',
				avatar: '',
				address: '',
				gender: '',
				introduction: '',
				constellation: '',
				birthady: ''
			},
			status: true
		};
	},

	created() {
		var userId = this.$route.query.id;
		this.axios.post('http://localhost:8080/api/user/userid/?id=' + userId).then(res => {
			this.user = res.data.data;
		});
	},

	methods: {
		save() {
			this.axios({
				method: 'put',
				url: this.GLOBAL.baseUrl + '/user/userData',
				data: JSON.stringify(this.user),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				if (res.data.msg == '成功') {
					alert('修改成功');
					this.status = true;
				} else {
					alert('修改失败');
				}
			});
		},
		update() {
			this.status = false;
		}
	},

	computed: {}
};
</script>

<style scoped>
* {
	transition: all 0.8s ease 0s;
}
input {
	outline: none;
	border: none;
}
i {
	margin-right: 10%;
}

label {
	margin-bottom: 50%;
	cursor: pointer;
	width: 100%;
	height: 6%;
	border-radius: 20px;
	background-color: rgb(255, 255, 255);
	display: flex;
	justify-content: center;
	align-items: center;
	transform: none;
}
label:hover {
	background-color: rgb(158, 158, 158);
}

.function {
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 10%;
}
.value,
.mobile {
	width: 89%;
	height: 100%;
	/* background-color: lawngreen; */
}

.item {
	width: 15%;
	height: 100%;
	display: flex;
	margin-right: 1%;
	align-items: center;
	background-color: lightgray;
}

.info {
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 2%;
	/* background-color: lemonchiffon; */
}

.ba-col-10 {
	padding: 10px;
	height: 100%;
	display: flex;
	flex-direction: column;
}

.hy-user-large {
	width: 100%;
	display: flex;
}
.hy-user-container {
	margin-top: 1%;
	background-color: white;
	display: flex;
}
.hy-user-block-row {
	width: 100%;
	height: 18%;
	margin-bottom: 20px;
	border-bottom: 2px solid gray;
}
/* 阿里图标 */
@font-face {
	font-family: 'iconfont';
	/* project id 1550259 */
	src: url('//at.alicdn.com/t/font_1550259_vl8sk3ac3p.eot');
	src: url('//at.alicdn.com/t/font_1550259_vl8sk3ac3p.eot?#iefix') format('embedded-opentype'),
		url('//at.alicdn.com/t/font_1550259_vl8sk3ac3p.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1550259_vl8sk3ac3p.woff') format('woff'),
		url('//at.alicdn.com/t/font_1550259_vl8sk3ac3p.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1550259_vl8sk3ac3p.svg#iconfont') format('svg');
}

.iconfont {
	font-family: "iconfont" !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}
</style>
