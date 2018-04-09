<!-- Dashboard V2 : 
- Problèmes :
1) Les items sont en fill/justify [<b-navbar-nav justified id="items">] et occupe donc tous l'espace dispo mais le dropdown est décalé dû à l'agrandissement des divs.
2) Le clic sur les dropdowns n'est pas parfait : marche si click sur l'icon ou le texte mais en dehors d'un certains périmètre le click fail et ne route pas.
-->
<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="dark">
      <!-- <b-navbar-brand><span id="dashboard">DASHBOARD</span></b-navbar-brand> -->
      <b-navbar-brand><router-link tag="a" :to="{name: 'dashboard'}"><span id="dashboard">DASHBOARD</span></router-link></b-navbar-brand>
      <b-navbar-toggle target="header_collapse"></b-navbar-toggle>
    </b-navbar>
    <b-navbar type="dark" variant="dark" toggleable="sm" id="header_collapse">
      <b-collapse is-nav id="header_collapse">
        <b-navbar-nav justified id="items"> <!-- fill or justified -->
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em><i class="material-icons">assignment_ind</i><span>Users</span></em>
            </template>
            <b-dropdown-item><router-link tag="span" :to="{name: 'createUser'}"><i class="material-icons">note_add</i><span>Create user</span></router-link></b-dropdown-item> 
            <b-dropdown-item><router-link tag="span" :to="{name: 'userList'}"><i class="material-icons">folder_shared</i><span>User's list</span></router-link></b-dropdown-item>
            <b-dropdown-item><router-link tag="span" :to="{name: 'example'}"><i class="material-icons">perm_contact_calendar</i><span>User's schedule</span></router-link></b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em><i class="material-icons">date_range</i><span>Calendar</span></em>
            </template>
            <b-dropdown-item><router-link tag="span" :to="{name: 'calendar'}"><i class="material-icons">perm_data_setting</i><span>Settings</span></router-link></b-dropdown-item> 
            <b-dropdown-item><router-link tag="span" :to="{name: 'calendar'}"><i class="material-icons">event</i><span>RDV</span></router-link></b-dropdown-item>
            <b-dropdown-item><router-link tag="span" :to="{name: 'example'}"><i class="material-icons">perm_contact_calendar</i><span>User's schedule</span></router-link></b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em><i class="material-icons">account_circle</i><span>Profile</span></em>
            </template>
            <b-dropdown-item><router-link tag="span" :to="{name: 'example'}"><i class="material-icons">question_answer</i><span>Messages</span></router-link></b-dropdown-item>
            <b-dropdown-item><router-link tag="span" :to="{name: 'ProfileUser'}"><i class="material-icons">edit</i><span>Edit profile</span></router-link></b-dropdown-item>
            <b-dropdown-item><router-link tag="span" :to="{name: 'example'}"><i class="material-icons">settings</i><span>Settings</span></router-link></b-dropdown-item>
            <b-dropdown-item><router-link tag="span" :to="{name: 'example'}"><i class="material-icons">help</i><span>Help</span></router-link></b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item v-on:click="routerLogout"><i class="material-icons" id="logout">power_settings_new</i><span>Logout</span></router-link></b-dropdown-item> 
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Header",
  data() {
    return {
      token: localStorage.getItem("token")
      // msg: "Here we are ..."
    };
  },
  components: {},
  methods: {
    routerLogout() {
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
    this.Token();
  }
};
</script>

<style scoped>
.material-icons.md-18 { font-size: 18px; }
.material-icons.md-24 { font-size: 24px; }
.material-icons.md-36 { font-size: 36px; }
.material-icons.md-48 { font-size: 48px; }

#dashboard {
  /* color: yellow; */
}

#items {
  /* background-color: red; */
  width: 100%; /* comme les items sont en fill sur 100% de l'espace ils augmentent la taille de leur conteneur et décale ainsi le dropdown */

}

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