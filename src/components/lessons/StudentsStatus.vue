<template>
	<v-container>
		<v-layout row wrap>
			<!-- <h1>Lessons Main</h1> -->
			<v-flex md4>
				<v-tabs class="group_list">
					<v-tabs-slider color="transparent"></v-tabs-slider>
					<v-tab>Все группы</v-tab>
				</v-tabs>
			</v-flex>	
	    	<v-flex xs12 sm6 md2 d-flex>
	    	  <v-select
	    	    :items="subjects"
	    	    :value="subjects[0]" class="class_select"
	    	  ></v-select>
	    	</v-flex>
		</v-layout>
      

		<v-layout>
		 <table class="group_status">
		   <tr>
		   	<th colspan="31">Май</th>
		   	<th colspan="16">Апрель</th>
		   </tr>
		   <tr class="day_week">
		   	   <td></td>
			   <td v-for="(day,key) in mounth">{{ day }}</td>
			   <td class="last_day">30</td>  
			   <td>1</td>
	  		   <td>9</td>
			   <td>10</td>
			   <td>11</td>
			   <td>12</td>
			   <td>13</td>
			   <td>14</td>
			   <td>15</td>
			   <td>16</td>
			   <td>17</td>
			   <td>18</td>
		   </tr>
			<tr v-for="(value,key) in createfild">
				<td>{{value.name}}</td>
					<td v-for="(item,key) in value.value"  @click="check(`Ячейка - ${key}, оценка ${item}`)">
						<span :class="item != null ? 'cercle' : 'cercle-o'"></span>
					</td>
			</tr>
		   </table>
		</v-layout>    
	</v-container>
</template>
<script>
	export default {
		data(){
			return{
      			subjects: ['Мат.Анализ', 'Русский-язык', 'Физика', 'Культура'],
      			students: [
      				{
      					name: 'Иван Иванов',
      					group: '3716a',
      					ratings: {
      						day: ['18.04.2019','27.04.2019'],
      						value: [5,3],
      						// subject: 'Мат.Анализ'
      					}
      				},
      				{
      					name: 'Пётр Петров',
      					group: '3221',
      					ratings: {
      						day: ['14.04.2019'],
      						value: [4],
      						// subject: 'Русский-язык'
      					}
      				},
					{
      					name: 'Кобылкин Андрей',
      					group: '3221',
      					ratings: {
      						day: ['14.04.2019','15.04.2019','20.04.2019','21.04.2019','23.04.2019'],
      						value: [4,3,4,5,3],
      						// subject: 'Русский-язык'
      					}
      				}
      			],
      			ratings:  [],
      			mounthName: {}
      		}
      	},
      	methods:{
      		check(day){
      			console.log(day);
      		}
      	},
      	computed:{
      		gruopFilter(){

      		},
      		mounth(){

      			let result = [];
      			this.students.forEach((item) => {
      				item.ratings.day.map((d) => {
      					let day = d.split('.')[0];

      					if (result.indexOf(day) == -1){ result.push(day) }
      				});
      			});
      			return result.sort((a,b)=> a-b);
      		},
      		createfild(){
      			let result = [];
      			this.students.forEach((item)=> {
      				let days = item.ratings.day.map((el)=>el.split('.')[0]) // дни полученных оценок студентов

      				let indexs = [];
      				let k = 0;
      				this.mounth.forEach((v,i)=> {
      					if(days.indexOf(v) != -1){
      						indexs.push(item.ratings.value[k]);
      						k++;
      					}else{
      						indexs.push(undefined);
      					}
      				});  // индексы дней оценок, относительно построенного массива месяца 

      				result.push({name: item.name,value: indexs}); // добавляем имя студента в каждый массив оценок
      			});
      			return result;
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