<template>
	<div class="hy-index-large">
		<div class="hy-index-mid ba-col-9">
			<v-stepper v-model="e6" vertical class="hy-retrieve-mid-content" dark>
				<v-stepper-step :complete="e6 > 1" step="1">密保问题验证</v-stepper-step>
				<!-- 验证密保 -->
				<v-stepper-content step="1">
					<v-card class="mb-12" height="150px" max-width="80%">
						<div class="hy-retrieve-box">
							<v-form ref="form" v-model="valid" lazy-validation>
								<v-card-text class="headline">问题：{{ question }}</v-card-text>
								<v-text-field :counter="10" label="请输入答案" required v-model="useranswer"></v-text-field>
							</v-form>
						</div>
					</v-card>
					<v-btn color="primary" @click="firststep()">下一步</v-btn>
					<v-btn text @click="e6 = 1">重新开始</v-btn>
				</v-stepper-content>

				<v-stepper-step :complete="e6 > 2" step="2">密码重置</v-stepper-step>

				<v-stepper-content step="2">
					<v-card class="mb-12" height="150px" max-width="80%">
						<div class="hy-retrieve-box">
							<v-form ref="form" v-model="valid" lazy-validation>
								<v-text-field
									v-model="password"
									:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
									:rules="[rules.required, rules.min]"
									:type="show1 ? 'text' : 'password'"
									name="input-10-1"
									label="新密码"
									counter
									@click:append="show1 = !show1"
								></v-text-field>
								<v-text-field
									v-model="newpasssword"
									:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
									:rules="[rules.required, rules.min]"
									:type="show1 ? 'text' : 'password'"
									name="input-10-1"
									label="请确认密码"
									counter
									@click:append="show1 = !show1"
								></v-text-field>
							</v-form>
						</div>
					</v-card>
					<v-btn color="primary" @click="secondstep">下一步</v-btn>
					<v-btn text @click="e6 = 1">重新开始</v-btn>
				</v-stepper-content>

				<v-stepper-step :complete="e6 > 3" step="3">完成</v-stepper-step>

				<v-stepper-content step="3">
					<v-card class="mb-12" height="150px" max-width="80%"><div class="hy-retrieve-box"></div></v-card>
					<v-btn text @click="e6 = 1">返回首页</v-btn>
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
			useranswer: '',
			password: '',
			newpasssword: '',
			question: '',
			answer: '',
			show1: false,
			rules: {
				min: v => v.length >= 6 || '密码至少6位',
				emailMatch: () => "The email and password you entered don't match"
			}
		};
	},
	methods: {
		firststep() {
			if (this.useranswer == this.answer) {
				this.e6 = 2;
			} else {
				alert('密码错误');
			}
		},
		secondstep() {
			if (this.password === this.newpasssword) {
				this.axios({
					method: 'put',
					url: this.GLOBAL.baseUrl + '/user/security',
					data: {
						id: JSON.parse(localStorage.getItem('user')).id,
						password: this.password
					}
				}).then(res => {
					alert('修改成功');
					this.e6 = 3;
					this.useranswer = '';
					this.password = '';
					this.newpasssword = '';
					localStorage.clear();
					this.$router.push({
						name: 'sign',
						params: {}
					});
				});
			} else {
				alert('两次输入密码不一致');
			}
		},
		thirdstep() {
			this.e6 = 4;
			alert('进函数');
			console.console.log(123);
		},
		getretrieve() {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/security/search',
				data: {
					photoAlbumId: 0,
					userId: JSON.parse(localStorage.getItem('user')).id
				}
			}).then(res => {
				this.question = res.data.data.question;
				this.answer = res.data.data.answer;
				console.log(this.question);
			});
		}
	},
	created() {
		this.getretrieve();
	}
};
</script>
<style scoped>
.hy-retrieve-box {
	width: 60%;
	margin: 0 auto;
}

.hy-index-large {
	width: 100%;
	display: flex;
	/* background-color: red; */
}

.hy-index-mid {
	/* background-color: red; */
	display: flex;
	flex-wrap: wrap;
}

.hy-retrieve-mid-content {
	width: 100%;
}
</style>
