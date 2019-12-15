<!-- 根据密保问题修改密码 -->
<!-- <template>
	<div class="hy-ret-large">
		<div class="hy-ret-firstrow">
			
		</div>
			<div class="ba-col-8 hy-ret-main">
				<div class="hy-ret-main-firstrow">
					<div class="hy-ret-text">
						<h2>填写账号</h2>
					</div>
					<div class="hy-ret-text">
						<h2>身份验证</h2>
					</div>
					<div class="hy-ret-text">
						<h2>设置新密码</h2>
					</div>
					<div class="hy-ret-text">
						<h2>完成</h2>
					</div>

				</div>
				<div class="hy-ret-main-secrow">
					<div class="ba-col-2"></div>
					
					<div class="hy-ret-input ba-col-8" v-if="status==1">
						<input type="text" placeholder="手机号"  v-model="userDto.mobile" @input="checkPhone()">
						<label class="hy-ret-tip">{{mobileTip}}</label>
						<button  @click="tosec()">下一步</button>
					</div>
					
					<div class="hy-ret-input ba-col-8" v-if="status==2">
						<input type="text" placeholder="答案"  v-model="userDto.mobile" @input="checkPhone()">
						<button @click="tothi()">确认</button>
					</div>
					
					<div class="hy-ret-input ba-col-8" v-if="status==3">
						<input type="password" placeholder="新密码"  v-model="userDto.firstpsd">
						<input type="password" placeholder="确认密码"  v-model="userDto.secpsd">
						<label>{{mobileTip}}</label>
						<button @click="tofour()">登录</button>
					</div>
		
					<div class="hy-ret-input ba-col-8" v-if="status==4">
						<button @click="tologin()()">最后一步</button>
					</div>
					<div class="ba-col-2"></div>
				</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			userDto: {
				mobile:'',
				answer:'',
				firstpsd:'',
				secpsd:''
			},
			mobileTip:'',
			status:1
		};
	},
	methods: {
		checkPhone() {
			var phone = this.userDto.mobile;
			if (!(/^1[3456789]\d{9}$/.test(phone))) {
				this.mobileTip = "手机格式不正确";
				this.status = true;
				return false;
			} else {
				this.mobileTip = '';
			}
	},
	tosec(){
		this.status++;
	},
	tothi(){
		this.status++;
	},
	tofour(){
		this.status++;
	},
	tologin(){
		this.status++;
	}
	
	}
};
</script>

<style scoped>
	.hy-ret-tip{
		font-size: 16px;
		color: red;
	}
	.hy-ret-large{
		width: 100%;
		height: 100%;
	}
	.hy-ret-firstrow{
		width: 100%;
		height: 100px;
		background-color: gray;
		display: flex;
	}
	.hy-ret-main{
		width: 100%;
	}
	.hy-ret-main-firstrow{
		width: 100%;
		background-color: red;
		height: 30%;
		display: flex;
	}
	.hy-ret-text{
		flex: 1 1 25%;
		margin: 1%;
		/* background-color: gray; */
		display: flex;
		justify-content: center;
		/* align-content: center; */
		/* text-align: center; */
		align-items: center;
	}
	.hy-ret-input{
		background-color: gray;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.hy-ret-main-secrow{
		height: 430px;
		display: flex;
	}
	input {
		background: #eee;
		border: none;
		width: 35%;
		height: 10%;
		border-radius:4%;
	}
	button {
		width: 35%;
		height: 10%;
		border-radius: 20px;
		border: 1px solid #ff4b2b;
		background: #ff4b2b;
		color: #fff;
		font-size: 12px;
		font-weight: bold;
		letter-spacing: 1px;
	}
</style>
 -->
<template>




	<div class="hy-index-large">
		<div class="hy-index-left ba-col-1 ">
			<v-card height="400" width="100%" class="mx-auto">
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title class="title">
							Application
						</v-list-item-title>
						<v-list-item-subtitle>
							subtext
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>

				<v-list dense nav>
					<v-list-item to="/index">
						<v-list-item-icon>
							<v-icon>mdi-home</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>
								主页
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

					<v-list-item link>
						<v-list-item-icon>
							<v-icon>mdi-image</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>照片</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

					<v-list-item link>
						<v-list-item-icon>
							<v-icon>mdi-widgets</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>应用</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

				</v-list>
			</v-card>
		</div>

		<div class="hy-index-mid ba-col-9">

			<v-stepper v-model="e6" vertical class="hy-retrieve-mid-content" dark="">
				<v-stepper-step :complete="e6 > 1" step="1">
					手机号验证
				</v-stepper-step>
				<!-- 第一步先验证手机号 -->
				<v-stepper-content step="1">
					<v-card class="mb-12" height="150px" max-width="80%">
						<div class="hy-retrieve-box">
							<v-form ref="form" v-model="valid" lazy-validation>
								<v-text-field :counter="10" :rules="nameRules" label="手机号" required v-model="usermobile"></v-text-field>

								<v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?"
								 required></v-checkbox>
							</v-form>
						</div>
					</v-card>
					<v-btn color="primary" @click="firststep()">下一步</v-btn>
					<v-btn text @click="e6 = 1">重新开始</v-btn>
				</v-stepper-content>


				<v-stepper-step :complete="e6 > 2" step="2">密保问题验证</v-stepper-step>

				<v-stepper-content step="2">
					<v-card class="mb-12" height="150px" max-width="40%">
						<div class="hy-retrieve-box">
							<v-form ref="form" v-model="valid" lazy-validation>
								<v-text-field :counter="10" :rules="nameRules" label="答案" required v-model="useranswer"></v-text-field>

							</v-form>
						</div>
					</v-card>
					<v-btn color="primary" @click="e6 = 3">下一步</v-btn>
					<v-btn text @click="e6 = 1">重新开始</v-btn>
				</v-stepper-content>


				<v-stepper-step :complete="e6 > 3" step="3">密码重置</v-stepper-step>
				<v-stepper-content step="3">

					<v-card class="mb-12" height="150px" max-width="40%">
						<div class="hy-retrieve-box">
							<v-form ref="form" v-model="valid" lazy-validation>
								<v-text-field :counter="10" :rules="nameRules" label="密码" required v-model="password"></v-text-field>

								<v-text-field :counter="10" :rules="nameRules" label="新密码" required v-model="newpasssword"></v-text-field>
							</v-form>
						</div>

					</v-card>
					<v-btn color="primary" @click="e6 = 4">下一步</v-btn>
					<v-btn text @click="e6 = 1">重新开始</v-btn>
				</v-stepper-content>
				<v-stepper-step step="4">成功</v-stepper-step>
				<v-stepper-content step="4">
					<v-card color="grey lighten-1" class="mb-12" height="150px" max-width="40%">


					</v-card>
					<v-btn color="primary" @click="e6 = 1">完成</v-btn>
					<v-btn text @click="e6 = 1">重新开始</v-btn>
				</v-stepper-content>
			</v-stepper>


		</div>

	</div>

</template>
<script>
	export default {
		data() {
			return {
				e6: 1,
				usermobile: '',
				useranswer: '',
				password: '',
				newpasssword: ''
			}
		},
		methods: {
			firststep() {
				this.e6 = 2
				alert("进函数")
				console.console.log(123);
			},
			secondstep() {
				this.e6 = 3
				alert("进函数")
				console.console.log(123);
			},
			thirdstep() {
				this.e6 = 4
				alert("进函数")
				console.console.log(123);
			},
			fourstep() {
				this.e6 = 1
				alert("进函数")
				console.console.log(123);
			}
		}
	}
</script>
<style>
	.hy-retrieve-box {
		width: 60%;
		margin: 0 auto;
	}

	.hy-index-large {
		width: 100%;
		display: flex;
		/* background-color: red; */
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

	.hy-retrieve-mid-content{
		width: 100%;
	}
</style>
