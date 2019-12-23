<template>
	<div class="hy-index-large">
		<div class="hy-index-mid ba-col-9">
			<v-card class="mx-auto" max-width="100%" max-height="600px">
				<v-card-text>
					<!-- 标题输入框 -->
					<form><v-text-field v-model="usertitle" :error-messages="nameErrors" :counter="10" label="标题"></v-text-field></form>

					<!-- 首页富文本编辑框 -->
					<v-card class="mx-auto " max-width="100%" max-height="400px"><div id="editor"></div></v-card>
					<v-card-actions><v-btn color="orange" @click="topublish()" text>确认发表</v-btn></v-card-actions>
				</v-card-text>
				<v-card-actions></v-card-actions>
			</v-card>
		</div>
	</div>
</template>

<script>
import Editor from 'wangeditor';
export default {
	data() {
		return {
			editor: '',
			formData: '',
			imgUrl: '',
			usertitle: '',
			usertext: '',
			content: '',
			show: true,
			wanglin: []
		};
	},
	methods: {
		topublish() {
			if (this.usertitle == '' || this.content == '') {
				alert('请输入内容');
			} else {
				this.content = this.editor.txt.html();
				console.log(this.content);
				this.axios({
					method: 'put',
					url: this.GLOBAL.baseUrl + '/journal/user/journal/pcjournal',
					data: {
						content: this.content,
						userId: JSON.parse(localStorage.getItem('user')).id,
						title: this.usertitle
					}
				}).then(res => {
					alert(res.data.data);
					this.editor = '';
					this.content = '';
					this.usertitle = '';
					this.$router.push('/personal/' + JSON.parse(localStorage.getItem('user')).id);
				});
			}
		},
		async initEditor() {
			this.editor = new Editor('#editor'); /* 括号里面的对应的是html里div的id */
			/* 配置菜单栏 */
			this.editor.customConfig.menu = [
				'head', // 标题
				'bold', // 粗体
				'fontSize', // 字号
				'fontName', // 字体
				'italic', // 斜体
				'underline', // 下划线
				'strikeThrough', // 删除线
				'foreColor', // 文字颜色
				'backColor', // 背景颜色
				'link', // 插入链接
				'list', // 列表
				'justify', // 对齐方式
				'quote', // 引用
				'emoticon', // 表情
				'image', // 插入图片
				'table', // 表格
				'code', // 插入代码
				'undo', // 撤销
				'redo' // 重复
			];
			this.editor.customConfig.uploadImgMaxLength = 9;
			// / 限制一次最多上传 5 张图片 */
			this.editor.customConfig.uploadImgMaxSize = 3 * 680 * 680;
			/* 将图片大小限制为 3M 默认为5M / 
			    /* 自定义图片上传（支持跨域和非跨域上传，简单操作）*/
			this.editor.customConfig.customUploadImg = async (files, insert) => {
				/* files 是 input 中选中的文件列表 */
				let formData = new FormData();
				for (var i = 0; i < files.length; i++) {
					formData.append('file', files[i]);
				}
				this.axios({
					method: 'post',
					url: this.GLOBAL.baseUrl + '/img',
					data: formData
				}).then(res => {
					for (var j = 0; j < i; j++) {
						insert(res.data.data[j]);
						console.log(res.data.data[j]);
					}
				});
				// let data = await this.upload()
				/* upload方法是后台提供的上传图片的接口 */
				/* insert 是编辑器自带的 获取图片 url 后，插入到编辑器的方法 上传代码返回结果之后，将图片插入到编辑器中*/
			};
			this.editor.customConfig.onchange = html => {
				/* html 即变化之后的内容 */
			};
			this.editor.create(); /* 创建编辑器 */
		}
	},
	created() {},
	mounted() {
		this.initEditor();
	}
};
</script>

<style scoped>
.thumbnail {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	width: 90%;
	margin: 0 auto;
	padding: 10px;
	/* background-color: #555555; */
	/* opacity: 0.5; */
	/* z-index: 1; */
}

.row {
	display: flex;
	justify-content: space-between;
	margin: 0 auto;
	flex-wrap: wrap;
}

.card {
	/* position: relative; */
	display: inline-block;
	width: 100%;
	/* height: 100%; */
	background: #fff;
	padding: 15px;
	min-width: 200px;
	box-shadow: 0 3px 5px #ddd;
	color: #555;
}

.card .box {
	width: 95%;
	margin: 0 auto;
	background: #ddd;
	cursor: pointer;
	box-shadow: 0 0 5px #ccc inset;
}

.card .box .fill {
	width: 100%;
	/* height: 250px; */
	position: relative;
	background: #03a9f4;
	opacity: 0.5;
	box-shadow: 0 0 5px #ccc;
	transition: 1s;
}

.rotateX:hover .fill {
	transform: rotateX(45deg);
}

.perspective {
	flex: 0 0 32%;
	height: 80%;
	margin-bottom: 20px;
	background-color: lavender;
}

.perspective .box {
	perspective: 700px;
}

.hy-index-large {
	width: 100%;
	/* display: flex; */
	/* background-color: red; */
}

.hy-index-left {
	/* background-color: black; */
	padding-top: 1%;
}

.hy-index-mid {
	/* background-color: red; */
	/* display: flex; */
	/* flex-wrap: wrap; */
}
</style>
