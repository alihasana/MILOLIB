<template>
  <div>
    <p> Hello from Profile User </p>
    <h1>{{ titre1 }}</h1>
    <div class="form">
      <b-form @submit.prevent="updateUserProfile">
        <!-- User profile details -->
        <div>
          <!-- Role -->
          <b-form-group>
            <b-form-input type="text" v-model="profile.role" placeholder="Rôle" readonly></b-form-input>
          </b-form-group>

          <!-- Name -->
          <b-form-group>
            <b-form-input type="text" v-model="profile.lastname" placeholder="Nom" v-if="show"></b-form-input>
            <div v-else>{{ profile.lastname }}</div>         
          </b-form-group>

          <!-- Firstname -->
          <b-form-group>
            <b-form-input type="text" v-model="profile.firstname" placeholder="Prénom" v-if="show"></b-form-input>
            <div v-else>{{ profile.firstname }}</div>
          </b-form-group>
          <!-- E-mail -->
          <b-form-group>
            <b-form-input type="text" v-model="profile.email" placeholder="E-mail" v-if="show"></b-form-input>
            <div v-else>{{ profile.email }}</div>

          </b-form-group>
          <!-- Phone -->
       
  
        </div>
        <!-- User change password -->
        <h3>{{ titre2 }}</h3>
        <div class="passwordForm">
          <!--Former password-->
          <b-form-group>
            <b-form-input type="password" placeholder="Ancien mot de passe"></b-form-input>
          </b-form-group>
          <!--New password-->
          <b-form-group>
            <b-form-input type="password" placeholder="Nouveau mot de passe"></b-form-input>
          </b-form-group>
          <!--Confirm new password-->
          <b-form-group>
            <b-form-input type="password" placeholder="Confirmer le nouveau de passe"></b-form-input>
          </b-form-group>
          <!-- User's actions buttons -->
          <div class="class row">
            <b-button variant="success" type="submit" v-if="show">Enregistrer les modifications</b-button>
            <b-button variant="primary" @click="show=!show" v-else>Modifier votre profil</b-button>
            
          </div>
        </div>


      </b-form>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import http from '../../helpers/http'
  export default {
    name: "ProfileUser",
    data() {
      return {
        titre1: "Mettre à jour votre profil",
        titre2: "Mettre à jour votre mot de passe",
        profileForm: {
          name: '',
          firstname: '',
          username: '',
          phone: '',
          oldpassword: '',
          password: '',
          confirmPassword: ''
        },
        // userDetails: {
        //   name: String,
        //   firstname: String,
        //   phone: String,
        //   password: String,
        //   confirmPassword: String
        // },      
        profile: [],
        show: false
      };
    },
    created() {
      //Retrieve user profile
      http.get('/profile')
        .then(res => {
          console.log("voici le res: ", res);
          if (res.status === 401) {
            localStorage.removeItem('token')
            this.$router.push('/users')
          } else {
            this.profile = res.data.content;   
            console.log('voici le res.data: ', res.data.content)         
          }
          
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      updateUserProfile() {
        http.put('/profile', this.users)
          .then(res => {
            if (res.data) {
              console.log('User details have been updated')
              this.$router.push('/users')
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
    }
  }
</script>

<style scoped>
  /* import 'bootstrap/dist/css/bootstrap.css';
        import 'bootstrap-vue/dist/bootstrap-vue.css'; */
  
  .form {
    margin: auto;
    width: 50vw;
    margin-top: 3vw;
  }
</style>
