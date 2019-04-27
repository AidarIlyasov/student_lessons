<template>
	<v-container>
			<v-layout row wrap>
			<!-- <h1>Lessons Main</h1> -->
			<v-flex md4>
				<v-tabs class="group_list">
					<v-tabs-slider color="transparent"></v-tabs-slider>
					<v-tab>Все группы</v-tab>
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
			</v-flex>	
	    	<v-flex xs12 sm6 md2 d-flex>
	    	  <v-select
	    	    :items="items"
	    	    :value="items[0]" class="class_select"
	    	  ></v-select>
	    	</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
	export default {
		data(){
			return{
      			items: ['Мат.Анализ', 'Русский-язык', 'Физика', 'Культура'],
				text: "Lorem ipsum dolor sit amet.",
				second_text: "Adipisicing elit. Praesentium illo veniam architecto."
			}
		}
	}
</script>
<style>
	
</style>