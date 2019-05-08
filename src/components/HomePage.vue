<template>
	<v-app id="app">
		<v-alert v-show="alertMessage"
	      :value="true"
	      color="success"
	      icon="check_circle"
	      outline
	      transition="slide-x-transition"
	      class="alert_message"
	    >
	    {{ alertMessage }}
	    </v-alert>
		<v-container v-if="logged">
			<v-layout row wrap>
				<v-tabs fixed-tabs slider-color="blue">
					<v-tab><router-link to="/LessonsMain">Расписание</router-link></v-tab>
					<v-tab><router-link to="/StudentsStatus">Студенты</router-link></v-tab>
					<v-tab><router-link to="/StartPage">StartPage</router-link></v-tab>
					<v-tab><router-link to="/LessonRating" id="32">Оценки по предмету</router-link></v-tab>
				</v-tabs>
				<router-view></router-view>
			</v-layout>
		</v-container>
      <v-container fluid fill-height v-else>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 class="login_form">
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Войти в систему</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="email" label="Email" type="email" v-model="email"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Пароль" id="password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login()">Войти</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
	</v-app>	
</template>
<script>
	export default {
		data(){
			return {
				email: '',
				password: '',
				logged: false
			}
		},
		methods:{
			login(){
				// this.$store.dispatch('retrieveToken',{
				// 	email: this.email,
				// 	password: this.password
				// });
				
				this.$router.push({name: 'LessonsMain'});
				this.logged = true;
				this.$store.dispatch('getLessons')
			}
		},
		computed:{
			alertMessage(){
				setTimeout(()=>{
					this.$store.state.message = ''
				},2000);
				return this.$store.state.message;
			}
		}
	}
</script>
<style>
	body{
		font-family: 'Roboto', sans-serif;
	}
	a{
		text-decoration: none;
		color: #333;
		cursor: pointer;
	}
	#app{
		background-color: #fff;
	}
	.container{
		padding: 10px 0;
	}
	.v-tabs__item a{
	    display: flex;
	    width: 100%;
	    align-items: center;
	    height: 100%;
	    justify-content: center;
	}
	.alert_message{
		position: fixed;
		right: 15px;
		z-index: 99;
		background: #fff;
	}
	.container .login_form{
		max-width: 400px;
	}
</style>