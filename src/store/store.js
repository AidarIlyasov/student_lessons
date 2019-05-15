import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './user'
import studentsModule from './students'
import {db} from './firebaseConfig'

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		token: localStorage.getItem('access_token') || null,
		created: false,
		message: {message: '', type: 'success'},
		lessons: [],
		filter: 'All',
		week: ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"],
		yearSesonName: ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"],
		loading: true,

	},
	mutations:{
		getLessons(state,payload){
			state.lessons = payload;
		},
	    updateFilter(state, payload){
		    state.filter = payload;
	    },
	    showMessage(state, payload){
	    	state.message.message = payload.message;
	    	state.message.type = payload.type;
	    },
		retrieveToken(state,payload){
			localStorage.setItem('access_token',payload);
		}
	},
	actions:{
		getLessons(context){
			return new Promise((resolve,reject) =>{
				let result = [];
				db.collection("lessons").get().then((querySnapshot)=>{
					querySnapshot.forEach((doc,index)=>{
						let data = doc.data();
						let sesonNum = data.date.split("-")[1] == 10 ? 10 : data.date.split("-")[1].replace('0','',1);
						let weekDay = new Date(data.date).getDay()+1 == 7 ? 0 : new Date(data.date).getDay()+1;

						let leson = {
							name: data.name,
							id: doc.id,
							location: data.location,
							start: data.start,
							date: data.date,
							day: data.date.split("-")[2],
							seasonName: context.state.yearSesonName[sesonNum],
							group: data.group,
							week: context.state.week[weekDay]
						};
				        result.push(leson);
					})
				}).then((responce)=>{context.state.created = true; resolve(context.state.created)})
				.catch((error)=>{reject(error)});

				context.commit('getLessons',result)

			})
		},
		updateFilter(context,filter){
			context.commit('updateFilter',filter);
		}
		,
		add(context,payload){
			db.collection("lessons").add({
				name: payload.name,
				location: payload.location,
				start: payload.classStart,
				date: payload.date,
				group: payload.group
			}).then(()=>{
				let sesonNum = payload.date.split("-")[1] == 10 ? 10 : payload.date.split("-")[1].replace('0','',1);
				let weekDay = new Date(payload.date).getDay()+1 == 7 ? 0 : new Date(payload.date).getDay()+1;
				context.state.lessons.push({
					name: payload.name,
					location: payload.location,
					start: payload.classStart,
					date: payload.date,
					group: payload.group,
					day: payload.date.split("-")[2],
					seasonName: context.state.yearSesonName[sesonNum],
					week: context.state.week[weekDay]
				});
				context.commit('showMessage',{message: 'Урок был успешно добавлен',type: 'success'});
			}).catch((error) =>{
			    context.commit('showMessage',{message: 'Error adding document:' + error, type: 'error'});
			});
		},
		remove(context,payload){
			db.collection("lessons").doc(payload).delete().then(()=>{
				context.commit('showMessage',{message: 'Урок был удален', type: 'success'});
			}).catch((error)=>{
				context.message(error);
				context.commit('showMessage',{message: 'Error delete document: ' + error, type: 'error'});
			})
		},
		change(context,payload){
			db.collection("lessons").doc(payload.id).update({
				name: payload.name,
				location: payload.location,
				start: payload.classStart,
				date: payload.date
			}).then(()=>{
				context.commit('showMessage',{message: 'Урок был изменен', type: 'success'});
			}).catch((error)=>{
				context.commit('showMessage',{message: 'Error change document: ' + error, type: 'error'});
			})
		}
	},
	getters:{
	    lessonsFiltered(state) {
	      if (state.filter == 'All') {
	        	return state.lessons
	      } else{
	      		return state.lessons.filter(item => item.group == state.filter)
	      }
	    },
	    getGroups(state){
	    	let arr = [];
	    	state.lessons.forEach((item,index) => {
	    		if(arr.indexOf(item) == -1 && item != undefined){
	    			arr.push(item.group)
	    		}
	    	});
	    	return arr;
	    },
	    getSubjects(state){
	    	return state.lessons.map((item) => item.name);
	    },
	    authStatus(state){
	    	return state.userModule.authStatus || state.token ? true : false
	    }
	},
	modules:{
	  userModule,
	  studentsModule
	}
})