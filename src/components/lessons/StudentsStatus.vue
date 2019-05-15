<template>
	<v-container>
		<v-layout row wrap>
			<!-- <h1>Lessons Main</h1> -->
			<v-flex md4>
				<v-tabs class="group_list">
					<v-tabs-slider color="transparent"></v-tabs-slider>
                    <v-tab @click="setActiveGroup(0,'All')">Все группы</v-tab>
                    <v-tab v-for="(group,key) in groups" class="list-item" :key="key" @click="setActiveGroup(key+1,group)">
                        {{ group }}
                    </v-tab>				
                </v-tabs>
			</v-flex>	
	    	<v-flex xs12 sm6 md2 d-flex>
            <v-select v-model="selected" :value="subjects[0]" v-bind:items="subjects" v-on:input="selectSubject"> 
            </v-select>
	    	</v-flex>
		</v-layout>
      

		<v-layout>
		 <table class="group_status">
		   <tr>
		   	<th ></th>
                  <th :colspan="ze[key]" v-for="(name,key) in ze,mounthName" class="last_day">
                        {{name}}
                  </th>
		   </tr>
		   <tr class="day_week">
		   	   <td></td>
			   <td v-for="(day,key) in mounth" :class="dividingLine == day ? 'last_day' : ''">
                    {{day}}
                 </td>
		   </tr>
			<tr v-for="(value,key) in createfild">
				<td>{{value.name}}</td>
					<td v-for="(item,key) in value.value"  @click="check(`Ячейка - ${key}, оценка ${item}`)">
						<span :class="item != null ? 'cercle' : 'cercle-o'"></span>
					</td>
			</tr>
		   </table>
		</v-layout>
    <v-dialog
    v-model="modaAddStudent"
    max-width="290">
        <v-card>
            <v-card-title class="headline">Добавить студента</v-card-title>
            <v-card-text>     
              <v-flex>
                <v-text-field
                label="Имя"
                v-model="sudentName"
                ></v-text-field>
                <v-text-field
                label="Фамилия"
                v-model="sudentSecondName"
                ></v-text-field>
                <v-text-field
                label="Группа"
                v-model="studentGroup"
                ></v-text-field>
              </v-flex>      
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    flat="flat"
                    @click="modaAddStudent = false"
                    >
                    Отменить
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  flat="flat"
                  @click="acceptAdd"
                  >
                  Добавить
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
        <div>
          <v-btn style="margin: 10px 0 0" small color="primary" @click="addSudent()">Добавить студента</v-btn>
        </div>    
	</v-container>
</template>
<script>
	export default {
        created(){
            this.$store.dispatch('getStudentsStatus');
        },
		data(){
			return{
      			subjects: this.$store.getters.getSubjects,
                students: this.$store.state.studentsModule.students,
      			ratings:  [],
      			mounthName: [],
      			dates: [],
                monthLength: [],
                ze: [],
                selected: 'Мат.Анализ',
                activeGroup: 0,
                modaAddStudent: false,
                sudentName: '',
                sudentSecondName: '',
                studentGroup: ''
      		}
      	},
      	methods:{
      		check(day){
      		},
            selectSubject(){
                let filtredSubjects = [];
                this.students.forEach((item)=>{
                    if(item.ratings.subject == this.selected){
                        filtredSubjects.push(item)
                    }
                })
                // console.log(this.selected);
                // console.log(filtredSubjects)
            },
            setActiveGroup(name,index){
                this.activeGroup = index;
                console.log(num)
            },
            addSudent(){
                this.modaAddStudent = true;
            },
            acceptAdd(){
                this.$store.dispatch('addSudent',{name: this.sudentName, secondName: this.sudentSecondName, group: this.studentGroup});
                modaAddStudent = false
            }
      	},
      	computed:{
      		gruopFilter(){

      		},
      		mounth(){
      			let result = [];
      			let test = [];
                console.log(this.students);
      			this.students.forEach((item) => {
      				item.ratings.day.map((d) => {
      					let day = d.split('.').reverse().join('.');
      					let p = new Date(day).getTime();
      					if (result.indexOf(p) == -1){ result.push(p) }
      				});
      			});
      			result.sort((a,b)=> a-b);

      			return result.map((milliseconds)=>{
      				let date = new Date(milliseconds);
      				this.dates.push(`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`);

      				if(this.mounthName.indexOf(this.$store.state.yearSesonName[date.getMonth()]) == -1){
      					this.mounthName.push(this.$store.state.yearSesonName[date.getMonth()]); // Название месяца
      				}
                    this.monthLength.push(date.getMonth()+1);
      				return date.getDate();
      			});
      		},
      		createfild(){
      			let result = [];
      			this.students.forEach((item)=> {
      				let days = item.ratings.day.map((el)=>{return el}) // дни полученных оценок студентов
      				let indexs = [];
      				let k = 0;
      				this.dates.forEach((v,i)=> {
      					if(days.indexOf(v) != -1){
      						indexs.push(item.ratings.value[k]);
      						k++;
      					}else{
      						indexs.push(undefined);
      					}
      				});  // индексы дней оценок, относительно построенного массива месяца 

      				result.push({name: item.name,value: indexs}); // добавляем имя студента в каждый массив оценок
      			});
                    let count = 0;
                    let currentDate = 0;

                    for (var i = 0; i < this.monthLength.length+1; i++) {
                          if(this.monthLength[i] == currentDate){
                                count++; 
                          }else{
                               this.ze.push(count+1);
                               currentDate = this.monthLength[i]; 
                               count = 0;
                          }
                    }
                    this.ze.splice(0,1);

      			return result;
      		},
            dividingLine(){
                  return 23
            },
            groups(){
                return this.$store.getters.getGroups
            }
      	}		
	}
</script>
<style lang='sass'>
	table.group_status
		border-collapse: collapse;
		tr
			td
				min-width: 25px;
				text-align: center
				border-top: solid 1px #c8c8c8
				padding-top: 5px
				&:first-child
					text-align: left
					font-weight: bold
					padding-right: 15px
				&[day="5"]
					background-color: #e4eaf2
		.day_week
			td
				&[day="5"]
					color: #2256b5
					border-bottom: 2px solid #2256b5
					font-weight: bold	
			.last_day
				border-right: solid 1px #c8c8c8				
						
	.cercle,.cercle-o
		display: inline-block
		border-radius: 50%
		width: 10px
		height: 10px
		background-color: #ee3
		padding-bottom: 5px
		color: transparent
		text-align: center
		line-height: 1.2
		&-o
			background-color: #fff
			border: solid 1px #aea
</style>