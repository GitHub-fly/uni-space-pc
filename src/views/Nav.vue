<template>
	<div>
		<div class="banner black-theme ba-yy-b">
			<div class="banner-tool ba-xy-c ba-xx-e">
				<div class="spinner"></div>
				<i class="iconfont mar">&#xe610;</i>
				<i class="iconfont mar">&#xe654;</i>
				<i class="iconfont mar">&#xe786;</i>
			</div>

			<div class="banner-bar ba-xy-e ba-xx-a">
				<div class="avatar ba-xx-c ba-xy-c">
					<p class="fontcolor-dark" @click="toSignIn()" v-if="user === null">去登陆~</p>
					<div class="img" v-else>
						<img :src="user.avatar" alt="测试头像" />
						<div class="file-box">
							<!-- <input type="file" title="更改头像" id="file" @change="changeAvatar()" /> -->
						</div>
					</div>
				</div>
				<div class="nav ba-xx-a ba-xy-c">
					<router-link to="/dynamic" class="a">动态</router-link>
					<router-link to="/photo">相册</router-link>
					<router-link to="/mylog">我的日志</router-link>
				</div>
			</div>
		</div>
		<router-view class="container" />
	</div>
</template>

<script>
export default {
	data() {
		return {
			user: {}
		};
	},
	created() {
		var userId = this.$route.query.id;
		this.axios.post('http://localhost:8080/api/user/userid/?id=' + userId).then(res => {
			this.user = res.data.data;
		});
	},
	methods: {
		toSignIn() {
			alert('asd'); 
			this.$route.push('/sign');
		},
		changeAvatar() {
			// this.axios.post('http://localhost:8080/api/avatar').then(res => {});
		}
	},
	computed: {}
};
</script>

<style scoped>
#file {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #000066;
	cursor: pointer;
}
.file-box {
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
	opacity: 1;
}
.a:hover {
	font-size: 30px;
}

@font-face {
	font-family: 'iconfont'; /* project id 1541989 */
	src: url('//at.alicdn.com/t/font_1541989_u845z1d6iyb.eot');
	src: url('//at.alicdn.com/t/font_1541989_u845z1d6iyb.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1541989_u845z1d6iyb.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1541989_u845z1d6iyb.woff') format('woff'), url('//at.alicdn.com/t/font_1541989_u845z1d6iyb.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1541989_u845z1d6iyb.svg#iconfont') format('svg');
}

.iconfont {
	font-family: 'iconfont' !important;
	font-size: 36px;
	font-style: normal;
	color: #ffffff;
	cursor: pointer;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}

.mar {
	margin-left: 1%;
}

.banner {
	width: 100%;
	height: 550px;
}

.banner-tool {
	position: sticky;
	top: 0;
	width: 100%;
	height: 10%;
	padding: 20px 20px;
	border: 1px solid white;
	opacity: 1;
	z-index: 100;
	background-color: #000000;
}

.banner-bar {
	width: 100%;
	height: 40%;
	/* border: 1px solid white; */
}

.avatar {
	width: 200px;
	height: 200px;
	cursor: pointer;
}
img {
	border-radius: 20px;
}
img:hover {
	animation: mymove 2s infinite;
}
@keyframes mymove {
	50% {
		border-top-left-radius: 50%;
	}
	50% {
		border-top-right-radius: 50%;
	}
	50% {
		border-bottom-left-radius: 50%;
	}
	50% {
		border-bottom-right-radius: 50%;
	}
}

.nav {
	width: 50%;
	height: 40%;
	/* border: 1px solid white; */
}

.container {
	background-color: rgb(55, 62, 67);
}

.fontcolor-dark {
	color: gold;
}

</style>
