<!-- Dashboard V4 :

- Rôles utilisateurs :
-> Administrateur
-> Conseiller
-> Chargé d'accueil
-> Invité
-> Suivit
-> Primo

- Problèmes :
1) Les items sont en fill/justify [<b-navbar-nav justified id="items">] et occupe donc tous l'espace dispo mais le dropdown est décalé dû à l'agrandissement des divs.
2) Le clic sur les dropdowns n'est pas parfait : marche si click sur l'icon ou le texte mais en dehors d'un certains périmètre le click fail et ne route pas.
3) Une fois loggué, peu importe le role utilisateur, tous peuvent accéder aux routes en rentrant le nom de cette dernière dans la barre du navigateur ...
4) Les restrictions d'affichages marches mais lorsque on actualise la page on récupère des champs cachés (non accessible normalement avec le role actuellement connecté) et inversement certains disparaissent ... (exemple : pour le conseiller : n'a plus accès à l'user list ainsi qu'au calendrier ...)
=> ACTUALISER LA PAGE EFFACE LE ROLE !!!! => VOIR VUEX-PERSIST => REPASSAGE EN LOCAL STORAGE POUR LE MOMENT !
-->
<template>
  <div>
    <!-- navbar menus -->
    <b-navbar type="dark" variant="dark" toggleable="sm">
      <b-navbar-brand>
        <router-link tag="a" :to="{name: 'dashboard'}"><span id="dashboard">DASHBOARD {{ role }}</span></router-link>
      </b-navbar-brand>
      <b-navbar-toggle target="header_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="header_collapse">
        <b-navbar-nav justified style="width: 100%">
          <!-- fill or justified -->
          <b-nav-item-dropdown no-caret right v-if="role !== 'Primo' && role !== 'Suivit'">
            <template slot="button-content">
                <div><i class="material-icons">assignment_ind</i><span>Users</span></div>
            </template>
            <b-dropdown-item v-if="role === 'Administrateur' || role === 'Administrateur/Conseiller'">
              <router-link tag="div" :to="{name: 'createUser'}">
                <i class="material-icons">note_add</i><span>Créer un utilisateur</span>
              </router-link>
            </b-dropdown-item>
            <!-- <b-dropdown-item v-if="role === 'Administrateur' || role === 'Administrateur/Conseiller' || role === 'Conseiller' || role === 'Chargé d\'accueil' || role === 'Invité'"><router-link tag="span" :to="{name: 'userList'}"><i class="material-icons">folder_shared</i><span>User's list</span></router-link></b-dropdown-item> -->
            <b-dropdown-item v-if="role !== 'Primo' || role !== 'Suivit'">
              <router-link tag="div" :to="{name: 'userList'}">
                <i class="material-icons">folder_shared</i><span>Liste des utilisateurs</span>
              </router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-if="role === 'Administrateur/Conseiller' || role === 'Conseiller'">
            <em><router-link tag="span" :to="{name: 'agenda'}"><i class="material-icons">date_range</i><span>Agenda</span></router-link></em>
           <!--  <em><router-link tag="div" :to="{name: 'calendar'}">
              <i class="material-icons">date_range</i><span>Agenda</span>
            </router-link></em> -->
          </b-nav-item>
          <b-nav-item-dropdown right v-if="role === 'Administrateur/Conseiller' || role === 'Conseiller'">
          <template slot="button-content">
            <em><i class="material-icons">perm_data_setting</i><span>Paramètres de l'agenda</span></em>
          </template>
            <b-dropdown-item>
              <router-link tag="div" :to="{name: 'availabilitySetting'}">
                <i class="material-icons">event</i><span>Disponibilités</span>
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link tag="div" :to="{name: 'eventTypeSetting'}">
                <i class="material-icons">perm_contact_calendar</i><span>Type/Durée RDV</span>
              </router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-if="role !== 'Invité' && role !== 'Primo' && role !== 'Suivit'">
            <router-link tag="div" :to="{name: 'ProfileUser'}">
              <i class="material-icons">account_circle</i><span>Profil {{ role }}</span>
            </router-link>
          </b-nav-item>
          <b-nav-item v-on:click="routerLogout">
            <i class="material-icons" id="logout">power_settings_new</i><span>Déconnexion</span>
          </b-nav-item>
          <!-- <b-nav-item-dropdown right>
<template slot="button-content">
  <em><i class="material-icons">account_circle</i><span>{{ role }}</span></em>
</template>
            <b-dropdown-item v-if="role !== 'Invité' && role !== 'Primo' && role !== 'Suivit'"><router-link tag="span" :to="{name: 'example'}"><i class="material-icons">question_answer</i><span>Notifications</span></router-link></b-dropdown-item>
            <b-dropdown-item v-if="role !== 'Invité' && role !== 'Primo' && role !== 'Suivit'"><router-link tag="span" :to="{name: 'ProfileUser'}"><i class="material-icons">settings</i><span>Profile</span></router-link></b-dropdown-item>
            <b-dropdown-item v-if="role === 'Administrateur' || role === 'Administrateur/Conseiller'"><router-link tag="span" :to="{name: 'example'}"><i class="material-icons">settings</i><span>Paramètres</span></router-link></b-dropdown-item>
            <b-dropdown-item><router-link tag="span" :to="{name: 'example'}"><i class="material-icons">help</i><span>Help</span></router-link></b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item v-on:click="routerLogout"><i class="material-icons" id="logout">power_settings_new</i><span>Logout</span></router-link></b-dropdown-item>
          </b-nav-item-dropdown> -->
          
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- <h1>Connecté en tant que : {{ role }}</h1> -->
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: "Header",
    data() {
      return {
        token: localStorage.getItem("token"),
        role: ""
      };
    },
    components: {},
    methods: {
      routerLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        this.$router.push("/");
      },
      Token() {
        let getToken = localStorage.getItem("token");
        if (getToken === null) {
          this.$router.push("/");
        }
      },
      getRole() {
        // this.role = this.$store.state.role;
        this.role = localStorage.getItem("role");
      }
    },
    created() {
      this.Token();
      this.getRole();
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