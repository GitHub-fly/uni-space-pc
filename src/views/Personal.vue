<template>
	<div>
		<div class="banner black-theme ba-yy-b">
			<div class="banner-tool ba-xy-c ba-xx-e">
				<div class="spinner"></div>
				<i class="iconfont mar">&#xe610;</i>
				<i class="iconfont mar">&#xe654;</i>
				<i class="iconfont mar">&#xe786;</i>
			</div>
		</div>
		<div class="container">
			<h1>个人中心</h1>
			<h2>dfihgoirjp</h2>
			<div class="cardd">dgreg</div>
			<div class="card"></div>
			<div class="bc-box"></div>
		</div>
	</div>
</template>

<script></script>

<style scoped>
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

.banner {
	width: 100%;
	height: 58px;
}

.banner-tool {
	position: sticky;
	top: 0;
	width: 100%;
	height: 96%;
	padding: 20px 20px;
	border: 1px solid white;
}

.container {
	position: relative;
	background-color: rgb(55, 62, 67);
	z-index: -10;
}

.bc-box {
	position: absolute;
	top: 0;
	left: 10%;
	width: 75%;
	background-color: #7d8f9b;
	opacity: 0.5;
	z-index: -5;
}

.card {
	width: 50%;
	height: 200px;
	margin: 0 auto;
	background-color: #03a9f4;
}

.cardd {
	width: 100%;
	height: 300px;
	background-color: #42b983;
}
</style>
