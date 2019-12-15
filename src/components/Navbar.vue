<template>
	<nav>
		<v-toolbar flat app>
			<v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title class="text-uppercase grey--text">
				<span class="font-weight-light">Todo</span>
				<span>Space</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<!-- <v-btn flat color="grey">
				<span>Sign Out</span>
				<v-icon right>mdi-minus</v-icon>
			</v-btn> -->
		</v-toolbar>

		<v-navigation-drawer v-model="drawer" app right temporary>
			<p>好友列表</p>
		</v-navigation-drawer>
	</nav>
</template>

<script>
export default {
	data() {
		return {
			drawer: false,
			messages: [{ title: 'Home', icon: 'dashboard' }, { title: 'About', icon: 'question_answer' }]
		};
	}
};
</script>

<style></style>
