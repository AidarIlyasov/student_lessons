import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		token: localStorage.getItem('access_token') || null
	},
	mutations:{

	},
	actions:{
		retrieveToken(context,payload){
			console.log(payload.email, payload.password)
		}
	}
})