import Vue from 'vue'
import Vuex from 'vuex'
import {db} from './firebaseConfig'

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		token: localStorage.getItem('access_token') || null,
		created: false,
		lessons: [],
		filter: 'All'
	},
	mutations:{
		getLessons(state,payload){
			state.lessons = payload;
		},
	    updateFilter(state, payload) {
		    state.filter = payload;
	    }
	},
	actions:{
		// retrieveToken(context,payload){
		// 	console.log(payload.email, payload.password)
		// },
		getLessons(context){
			return new Promise((resolve,reject) =>{
				let week = ["Понидельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];
				let yearSesonName = ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"];
				let result = [];
				db.collection("lessons").get().then((querySnapshot)=>{
					querySnapshot.forEach((doc,index)=>{
						let data = doc.data();
						// let sesonNum = data.date.split("-")[1] == 10 ? 10 : data.date.split("-")[1].replace('0','',1);
						let leson = {
							name: data.name,
							id: doc.id,
							location: data.location,
							start: data.start,
							date: data.date,
							day: data.date.split("-")[2],
							seasonName: yearSesonName[4],
							group: data.group
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
			return new Promise((resolve, reject) => {
				db.collection("lessons").add({
					name: payload.name,
					location: payload.location,
					start: payload.classStart,
					date: payload.date,
					group: payload.group
				}).then(()=>{
					console.log("Document successfully added!");
					resolve("Урок был добавлен");
				}).catch((error) =>{
				    console.error("Error adding document: ", error);
				    reject(error)
				});
			})
		},
		remove(context,payload){
			return new Promise((resolve,reject)=>{
				db.collection("lessons").doc(payload).delete().then(()=>{
					console.log("Document successfully deleted!");
					resolve("Урок был удален");
				}).catch((error)=>{
					console.error("Error delete document: ", error);
					reject(error)
				})
			})
		},
		change(context,payload){
			return new Promise((resolve,reject)=>{
				db.collection("lessons").doc(payload.id).update({
					name: payload.name,
					location: payload.location,
					start: payload.classStart,
					date: payload.date
				}).then(()=>{
					console.log("Document successfully changeed!");
					resolve("Урок был изменен");
				}).catch((error)=>{
					console.error("Error change document: ", error);
					reject(error)
				})
			})
		}
	},
	getters:{
		// getLessons(state){
		// 	// console.log(`getters info => ${state.lessons}`);
		// 	return state.lessons;
		// },
	    lessonsFiltered(state) {
	      if (state.filter == 'All') {
	        	return state.lessons
	      } else{
	      		return state.lessons.filter(item => item.group == state.filter)
	      }
	    }
	}
})