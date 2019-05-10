import firebase from 'firebase'

export default ({
  state:{
    authStatus: false,
    error: '',
    user: ''
  },
  mutations:{
  	signIn(state,payload){
  		state.authStatus = payload;
  	}
  },
  actions:{
	signIn(context,payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(function(){
      	context.commit('signIn',true);
      	context.dispatch('retrieveToken');
        console.log("User logged");
      })
      .catch(function(error) {
        context.commit('showMessage',{message: error.message, type: 'error'});
      })
	},
	retrieveToken(context){
		firebase.auth().currentUser.getIdToken(true).then((idToken)=>{
			context.commit('retrieveToken',idToken);
			console.log(idToken);
		}).catch((error)=>{
			console.log(error);
		})
	}
  }
})