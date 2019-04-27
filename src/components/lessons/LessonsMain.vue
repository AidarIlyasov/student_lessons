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
		</v-layout>
		<v-layout>
			<table class="lessons_list">
			  <tr v-for="(lesson,key) in lessons">
			    <td class="date">{{ lesson.day }}</td>
			    <td class="day">{{  }}</td>
			    <td class="time">
			    	<span v-for="(time,key) in lesson.times">
				    	<a href="#" @click.prevent="changeTime(0)">
				    		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
				    	</a>
				    	{{ time }}
			    	</span>
			    </td>
			    <td class="location">
			    	<a href="#" v-for="(location,key) in lesson.locations">{{ location }}</a>
			    </td>
			  </tr>
			  <a href="#" @click.stop="addClassState = true" class="add_class">Добавить занятия</a>
			</table>
		</v-layout>
	    <v-layout row justify-center>
	  
		      <v-dialog
		        v-model="addClassState"
		        max-width="290"
		      >
		        <v-card>
		          <v-card-title class="headline">Добавить занятие</v-card-title>
		  
		          <v-card-text>
			        <v-flex>
			          <v-text-field
			            placeholder="Мат.анализ"
			            label="Предмет"
			            v-model="className"
			          ></v-text-field>
			          <v-text-field
			            placeholder="201a"
			            label="Аудитория"
			            v-model="classLocation"
			          ></v-text-field>
				      <v-dialog
				        ref="dialog"
				        v-model="modal2"
				        :return-value.sync="time"
				        persistent
				        lazy
				        full-width
				        width="290px"
				      >
				        <template v-slot:activator="{ on }">
				          <v-text-field
				            v-model="time"
				            label="Начало занятий"
				            v-on="on"
				          ></v-text-field>
				        </template>
				        <v-time-picker
				          v-if="modal2"
				          v-model="time"
				          format="24hr"
				          full-width
				        >
				          <v-spacer></v-spacer>
				          <v-btn flat color="primary" @click="modal2 = false">Отмена</v-btn>
				          <v-btn flat color="primary" @click="$refs.dialog.save(time)">Выбрать</v-btn>
				        </v-time-picker>
				      </v-dialog>
				        <v-menu
				          ref="menu"
				          v-model="dateMenu"
				          :close-on-content-click="false"
				          :nudge-right="40"
				          :return-value.sync="date"
				          :first-day-of-week="1"
				          lazy
				          transition="scale-transition"
				          offset-y
				          locale="ru"
				          full-width
				          min-width="290px"
				        >
				          <template v-slot:activator="{ on }">
				            <v-text-field
				              v-model="classDate"
				              label="Дата"
				              v-on="on"
				            ></v-text-field>
				          </template>
				          <v-date-picker v-model="classDate" no-title scrollable>
				            <v-spacer></v-spacer>
				            <v-btn flat color="primary" @click="dateMenu = false">Отмена</v-btn>
				            <v-btn flat color="primary" @click="$refs.menu.save(date)">Выбрать</v-btn>
				          </v-date-picker>
				        </v-menu>
			        </v-flex>
		          </v-card-text>
		  
		          <v-card-actions>
		            <v-spacer></v-spacer>
		  
		            <v-btn
		              color="blue darken-1"
		              flat="flat"
		              @click="addClassState = false"
		            >
		              Отменить
		            </v-btn>
		  
		            <v-btn
		              color="blue darken-1"
		              flat="flat"
		              @click="addClass()"
		            >
		              Добавить
		            </v-btn>
		          </v-card-actions>
		        </v-card>
		      </v-dialog>
		    </v-layout>
	</v-container>	
</template>
<script>
	export default {
		data(){
			return {
				date: new Date(),
				text: "Lorem ipsum dolor sit amet.",
				second_text: "Adipisicing elit. Praesentium illo veniam architecto.",
				week: ["Понидельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"],
				yearSesonName: ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"],
				lessons: [
					{
						day: '12.3.2019',
						times: ['11:00','13:30'],
						locations: ['Мат.анализ, ауд. 215, 36012','Теор.вер, 3 курс, 102а']
					},
					{
						day: '14.3.2019',
						times: ['14:00'],
						locations: ['Теор.вер, 3 курс, 102а']
					},
					{
						day: '26.3.2019',
						times: ['17:00'],
						locations: ['Мат.анализ, ауд. 215, 36012']
					}
				],
				addClassState: false,
				dateMenu: false,
				className: '',
				classLocation: '',
				classDate: '',
				classStartTime: '',
				modal2: false
			}
		},
		created() {
			let date = new Date();
			let today = `${date.getDate()}.${date.getMonth()-1}.${date.getFullYear()}`;

			for (var i = 0; i < this.lessons.length; i++) {
				if(today == this.lessons[i].day){
					this.lessons[i].day = "Сегодня"
				}else{
					this.lessons[i].day = `${this.lessons[i].day.split(".")[0]} ${this.yearSesonName[+this.lessons[i].day.split(".")[1]-1]}`
				}
			}
		},
		methods:{
			changeTime(){
				console.log(this.classDate)
			},
			addClass(){
				this.lessons.push({day: this.classDate, times: [this.classStartTime], locations: [`${this.className} ауд. ${this.classLocation}`]});
				this.addClassState = false
			}
		}	
	}
</script>
<style lang="sass">
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
			svg
				fill: #1976d2
		.location
			font-size: 14px
			text-decoration: underline
			a
				display: block
		.add_class
			text-decoration: underline
			font-size: 14px

</style>