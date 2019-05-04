import Vue from 'vue'
import './plugins/vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import store from './store/store'

import HomePage from './components/HomePage.vue'
import StartPage from './components/StartPage.vue'
import LessonRating from './components/lessons/LessonRating.vue'
import lessonsItem from './components/lessons/lessonsItem.vue'
import LessonsMain from './components/lessons/LessonsMain.vue'
import StudentsStatus from './components/lessons/StudentsStatus.vue'


Vue.use(VueRouter,Vuex,Vuetify)

Vue.component('HomePage',HomePage);
Vue.component('StartPage',StartPage);
Vue.component('LessonRating',LessonRating);
Vue.component('lessonsItem',lessonsItem);
Vue.component('LessonsMain',LessonsMain);
Vue.component('StudentsStatus',StudentsStatus);


const router = new VueRouter({
	routes: [
		{ path: '/HomePage', component: HomePage},
		{ path: '/StartPage', component: StartPage, name: 'StartPage' },
		{ path: '/LessonRating', component: LessonRating },
		{ path: '/LessonsMain', component: LessonsMain, name: 'LessonsMain' },
		{ path: '/StudentsStatus', component: StudentsStatus }
	]
})



Vue.config.productionTip = false

new Vue({
  store,
  el: '#app',
  router,
  render: h => h(HomePage)
});
