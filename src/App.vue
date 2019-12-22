<template>
	<v-app>
		<v-content >
				<Snowf
				  :amount="100"
				  :size="5"
				  :speed="1.5"
				  :wind="0"
				  :opacity="0.8"
				  :swing="1"
				  :image="null"
				  :zIndex="null"
				  :resize="true"
				  color="#eee"
				/>
			<router-view />
		</v-content>
	</v-app>
</template>


<script>	
import Snowf from 'vue-snowf';
export default {
	components: {
		Snowf
	}
};

</script>

<style>
@import url('assets/css/basic.css');
@import url('assets/css/style.css');
	.snowf-canvas {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
</style>
