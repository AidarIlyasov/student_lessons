import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
	apiKey: "AIzaSyAjod4o98Jx2ojbR413HapkJjcva12unnM",
	authDomain: "my-lesson-9a110.firebaseapp.com",
	databaseURL: "https://my-lesson-9a110.firebaseio.com",
	projectId: "my-lesson-9a110",
	storageBucket: "my-lesson-9a110.appspot.com",
	messagingSenderId: "602952582993"
});

export const db = firebase.firestore();