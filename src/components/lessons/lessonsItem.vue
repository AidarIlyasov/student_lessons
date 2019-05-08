<template>
	<div class="">
		<transition-group name="list" tag="table" class="lessons_list">
		  <tr v-for="(lesson,key) in lessonsFiltered" class="list-item" :key="key">
		    <td class="date">{{ lesson.day }} {{ lesson.seasonName}}</td>
		    <td class="day"> {{ lesson.week }} </td>
		    <td class="time">
		    	<span>
			    	<a href="#" @click.prevent="change(key,lesson.id)">
			    		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
			    	</a>
			    	{{ lesson.start }}
		    	</span>
		    </td>
		    <td class="location">
		    	<a href="#">{{ lesson.name}}, {{ lesson.location }}
			    	<i href="#" @click.prevent="remove(key,lesson.id)">
			    		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>
			    	</i>
		    	</a>
		    </td>
		  </tr>
		</transition-group>
		<div class="add_class">
	  		<a href="#" @click.prevent="add()" class="add_class-link">Добавить занятие</a>
	  	</div>
      <v-dialog
        v-model="addClassState"
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">{{ acceptText }} занятие</v-card-title>
  
          <v-card-text>
	        <v-flex>
	          <v-text-field
	            placeholder="Мат.анализ"
	            label="Предмет"
	            v-model="className"
	          ></v-text-field>
	          <v-text-field
	            placeholder="36012а"
	            label="Группа"
	            v-model="classGroupName"
	          ></v-text-field>
	          <v-text-field
	            placeholder="201a"
	            label="Аудитория"
	            v-model="classLocation"
	          ></v-text-field>
		      <v-dialog
		        ref="dialog"
		        v-model="modal2"
		        :return-value.sync="classStartTime"
		        persistent
		        lazy
		        full-width
		        width="290px"
		      >
		        <template v-slot:activator="{ on }">
		          <v-text-field
		            v-model="classStartTime"
		            label="Начало занятий"
		            v-on="on"
		          ></v-text-field>
		        </template>
		        <v-time-picker
		          v-if="modal2"
		          v-model="classStartTime"
		          format="24hr"
		          full-width
		        >
		          <v-spacer></v-spacer>
		          <v-btn flat color="primary" @click="modal2 = false">Отмена</v-btn>
		          <v-btn flat color="primary" @click="$refs.dialog.save(classStartTime)">Выбрать</v-btn>
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
              @click="modalAction = modalAction ==  'acceptAdd' ? acceptAdd() : acceptChange()"
            >
              {{ acceptText }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
	</div>
</template>
<script>
	export default {
		name: 'lessons-item',
		data(){
			return {
				date: new Date(),
				lessons: [],
				dateMenu: false,
				addClassState: false,
				className: '',
				classLocation: '',
				classDate: '',
				classStartTime: '',
				classId: '',
				classGroupName: '',
				modal2: false,
				acceptText: 'Добавить',
				modalAction: 'acceptAdd',
				modalText: 'Изменить'
			}
		},
		created(){
			this.$store.dispatch('getLessons')
			.then((responce)=>{
				this.lessons = this.$store.getters.lessonsFiltered;
			}).catch((error)=>{
				console.log(error)
			});
		},
		methods:{
			change(index,id){
				console.log(this.$store.state.lessons);
				this.addClassState = true;
				this.classId = id;
				this.className = this.lessons[index].name;
				this.classStartTime = this.lessons[index].start;
				this.classLocation = this.lessons[index].location;
				this.classDate = this.lessons[index].date;
				this.classGroupName = this.lessons[index].group;
				this.modalAction = 'acceptChange',
				this.acceptText = 'Изменить'
			},
			acceptChange(){
				this.$store.dispatch('change',{id: this.classId, name: this.className,location: this.classLocation, classStart: this.classStartTime, date: this.classDate});
				this.addClassState = false;
			},
			add(){
				this.addClassState = true,
				this.className =  "",
				this.classStartTime = "",
				this.classLocation = "",
				this.classDate = "",
				this.modalAction = 'acceptAdd',
				this.acceptText = 'Добавить';
			},
			acceptAdd(){
				this.$store.dispatch('add',{name: this.className,location: this.classLocation, classStart: this.classStartTime, date: this.classDate, group: this.classGroupName});
				this.addClassState = false;
			},
			remove(index,id){
				this.$store.dispatch('remove',id)
				this.$store.state.lessons.splice(index,1);
			}
		},
		computed:{
			lessonsFiltered(){
				return this.$store.getters.lessonsFiltered
			}
		}
	}
</script>
<style>
	
</style>