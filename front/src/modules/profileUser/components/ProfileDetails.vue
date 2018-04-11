

<!--<script>
  /* eslint-disable */
  import http from '../../../helpers/http'
  export default {
    name: "ProfileDetails",
    data() {
      return {
        profileDetails: "Détails du profil utilisateur",
        changePassword: "Modifier le mot de passe",
        profileForm: {
          name: '',
          firstname: '',
          phone: '',
          password: '',
          confirmPassword: ''
        },
        userDetails: {
          name: String,
          firstname: String,
          phone: String,
          password: String,
          confirmPassword: String
        }
      };
    },
    components: {},
    methods: {
      userProfileDetails: function() {
        const userDetails = {
          name: this.profileForm.name,
          firstname: this.profileForm.firstname,
          phone: this.profileForm.phone,
          password: this.profileForm.password,
          confirmPassword: this.profileForm.confirmPassword
        }
        //emit sends data to parent file
        this.$emit('completeProfile', userDetails)
        console.log(userDetails)

      }
    }
  };
</script>

<style scoped>
  .form {
    margin: auto;
    width: 50vw;
    margin-top: 3vw;
  }

  .passwordForm {
    margin-top: 3vw;
  }
</style>
