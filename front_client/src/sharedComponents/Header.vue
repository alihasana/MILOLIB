<template>
  <div>
    <!-- navbar menus -->
    <b-navbar type="dark" variant="dark" toggleable="sm">
      <b-navbar-brand>
        <router-link tag="a" :to="{name: 'dashboard'}"><span id="dashboard">DASHBOARD</span></router-link>
      </b-navbar-brand>
      <b-navbar-toggle target="header_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="header_collapse">
        <b-navbar-nav justified style="width: 100%">
          <!-- fill or justified -->
          <b-nav-item>
            <em><router-link tag="div" :to="{name: 'rdv'}">
              <i class="material-icons">date_range</i><span>Prendre un rendez-vous</span>
            </router-link></em>
          </b-nav-item>
          <b-nav-item v-on:click="routerLogout">
            <i class="material-icons" id="logout">power_settings_new</i><span>Déconnexion</span>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  /* eslint-disable */
  import swal from "sweetalert2";
  export default {
    name: "Header",
    data() {
      return {
        token: localStorage.getItem("token"),
      };
    },
    components: {},
    methods: {
      routerLogout() {
        swal({
              type: "success",
              title: "Vous êtes déconnecté !",
              // text: res.data.message
            });
        localStorage.removeItem("token");
        this.$router.push("/");
      },
      Token() {
        let getToken = localStorage.getItem("token");
        if (getToken === null) {
          this.$router.push("/");
        }
      }
    },
    created() {
      // this.Token();
    }
  };
</script>

<style scoped>
  .material-icons.md-18 {
    font-size: 18px;
  }
  
  .material-icons.md-24 {
    font-size: 24px;
  }
  
  .material-icons.md-36 {
    font-size: 36px;
  }
  
  .material-icons.md-48 {
    font-size: 48px;
  }

  a.dropdown-item div {
    display: flex;
    align-items: center
  }

 a.nav-link {
   display: flex;
   align-items: center;
   justify-content: flex-end
 }

 a.nav-link.dropdown-toggle div {
   display: flex
 }

 a.nav-link div {
   display: flex;
   align-items: center;
   justify-content: flex-end
 }

@media all and (max-width: 720px) {
  a.nav-link {
   display: flex;
   align-items: center;
   justify-content: center
 }

 a.nav-link div {
   display: flex;
   align-items: center;
   justify-content: center
 }
}



  /* #dashboard {
     color: yellow;
  } */
  
  /* #items {
     background-color: red; 
    width: 100%;
     comme les items sont en fill sur 100% de l'espace ils augmentent la taille de leur conteneur et décale ainsi le dropdown 
  } */
  
  i {
    /* color: purple; */
    padding-right: 4px;
  }
  
  #logout {
    color: red;
  }
  
  
  /* span {
    color: #16181B;
    text-decoration: none;
  }
  
  span:hover {
    color: #16181B;
    text-decoration: none;
  } */
</style>