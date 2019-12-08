<template>
	<!-- 根据密保问题修改密码 -->
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
