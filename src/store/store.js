import Vue from 'vue'
import Vuex from 'vuex'
import {db} from './firebaseConfig'

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		token: localStorage.getItem('access_token') || null,
		lessons: []
	},
	mutations:{
		getLessons(state,payload){
			state.lessons = payload;
		}
	},
	actions:{
		// retrieveToken(context,payload){
		// 	console.log(payload.email, payload.password)
		// },
		getLessons(context){
			let result = [];
			db.collection("lessons").get().then((querySnapshot)=>{
				querySnapshot.forEach((doc,index)=>{
					let data = doc.data();
					let leson = {
						name: data.name,
						id: doc.id,
						location: data.location,
						start: data.start,
						date: data.date
					};
			        result.push(leson);
				})
			})

			context.commit('getLessons',result)
		},
		addClass(context,payload){
			return new Promise((resolve, reject) => {
				db.collection("lessons").add({
					name: payload.name,
					location: payload.location,
					start: payload.classStart,
					date: payload.date
				})
				.then(function(docRef) {
				    console.log("Document written with ID: ", docRef.id);
				    resolve("Урок был добавлен")
				})
				.catch(function(error) {
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
					context.dispatch('getLessons');
				}).catch((error)=>{
					console.error("Error adding document: ", error);
					reject(error)
				})
			})
		}
	}
})