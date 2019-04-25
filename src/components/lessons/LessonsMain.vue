<template>
	<div class="">
		<!-- <h1>Lessons Main</h1> -->
		
		<v-tabs class="group_list">
			<v-tabs-slider color="transparent"></v-tabs-slider>
			<v-tab :key="all">Все группы</v-tab>
			<v-tab :key="36012">36012</v-tab>
			<v-tab>36203</v-tab>
			<v-tab>42011М</v-tab>
			<v-tab>36012</v-tab>
			<v-tab>36203</v-tab>
			<v-tab>42011М</v-tab>
			<v-tab>36012</v-tab>
			<v-tab>36203</v-tab>
			<v-tab>42011М</v-tab>
			<v-tab>36012</v-tab>
			<v-tab>36203</v-tab>
			<v-tab>42011М</v-tab>
			<v-tab>36012</v-tab>
			<v-tab>36203</v-tab>
			<v-tab>42011М</v-tab>
			<v-tab>36012</v-tab>
			<v-tab>36203</v-tab>
			<v-tab>42011М</v-tab>

			<v-tab-item key="all">
			  <v-card flat>
			    <v-card-text>{{ text }}</v-card-text>
			  </v-card>
			</v-tab-item>

			<v-tab-item key="36012">
			  <v-card flat>
			    <v-card-text>{{ second_text }}</v-card-text>
			  </v-card>
			</v-tab-item>
		</v-tabs>
	</div>	
</template>
<script>
	export default {
		data(){
			return {
				text: "Lorem ipsum dolor sit amet.",
				second_text: "Adipisicing elit. Praesentium illo veniam architecto."
			}
		}
	}
</script>
<style>
	.group_list a{
		height: 60%;
	}
	.group_list a.v-tabs__item--active{
		background-color: #eee;
		border-radius: 5px;
	}
</style>