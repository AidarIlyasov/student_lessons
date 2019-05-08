<template>
	<v-container>
		<v-layout row wrap>
			<!-- <h1>Lessons Main</h1> -->
			<v-flex md4>
				<v-tabs class="group_list">
					<v-tabs-slider color="transparent"></v-tabs-slider>
					<v-tab @click="groupLessons('All')">Все группы</v-tab>
					<v-tab v-for="(group,key) in groups" class="list-item" :key="key" @click="groupLessons(group)">
						{{ group }}
					</v-tab>
				</v-tabs>
			</v-flex>	
		</v-layout>
		<v-layout row>
			<lessons-item></lessons-item>
		</v-layout>
	</v-container>	
</template>
<script>
	import lessonsItem from './lessonsItem'

	export default {
		components:{
			lessonsItem
		},
		data(){
			return {
				text: "Lorem ipsum dolor sit amet.",
				second_text: "Adipisicing elit. Praesentium illo veniam architecto.",
				message: null,
				alertMessage: '',
			}
		},
		methods:{
			groupLessons(index){
				this.$store.dispatch('updateFilter',index);
			},
			showMessage(response){
				alert(response);
			}
		},
		computed:{
			groups(){
				return this.$store.getters.getGroups
			}
		}
	}
</script>
<style lang="sass">
	.layout
		flex-wrap: wrap
	.group_list
		a
			height: 60%;
		
	.group_list
		a.v-tabs__item--active
			background-color: #eee;
			border-radius: 5px;
	.class_select
		padding: 0
		margin-left: 15px
	.lessons_list
		font-size: 16px
		td
			padding: 5px 10px
			vertical-align: top
		.date
			font-weight: bold
		.day
			color: #aea
		.time
			display: -webkit-flex
			display: -moz-flex
			display: -ms-flex
			display: -o-flex
			display: flex
			flex-wrap: wrap
			align-items: center
			width: 100px
			span
				display: -webkit-flex
				display: -moz-flex
				display: -ms-flex
				display: -o-flex
				display: flex
				flex-wrap: wrap
				align-items: center
				margin-right: 5px
				a
					display: inherit
					margin-right: 5px
			svg
				fill: #1976d2
		.location
			font-size: 14px
			text-decoration: underline
			a
				display: flex
				i
					margin-left: 5px
	.add_class
		width: 100%
		&-link
			text-decoration: underline
			font-size: 14px
	.list-item
	  margin-right: 10px
	.list-enter-active, .list-leave-active
	  transition: all .5s;
	.list-enter, .list-leave-to
	  opacity: 0
	  transform: translateX(30px)
</style>