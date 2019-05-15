import firebase from 'firebase'
import {db} from './firebaseConfig'

export default ({
	state: {
		students: []
	},
	mutations: {
		getStudents(state,payload){
			state.students = payload;
		}
	},
	actions:{
		addSudent(context,payload){
			db.collection("students").add({
				name: `${payload.name} ${payload.secondName}`,
				group: payload.group
			})
			.then(() => {
				context.commit('showMessage',{message: 'Студент был успешно добавлен',type: 'success'});
			})
			.catch((error) => {
				context.commit('showMessage',{message: `Возникла ошибка: ${error}` ,type: 'error'});
			})
		},
		getStudentsStatus(context){
			let result = [];
			db.collection("students").get().then((querySnapshot)=>{
				querySnapshot.forEach((doc,index)=>{
					let data = doc.data();
					let student = {
      					name: data.name,
      					group: data.group,
      					ratings: {
      						day: data.day,
      						value: data.value,
      						subject: data.subject
      					}	
      				};
      				result.push(student);
				})
			})	
			context.commit('getStudents', result);
		}
	},
	getters:{
		// Фильтры по предмету, по группе, возможно по оценкам
	}
})