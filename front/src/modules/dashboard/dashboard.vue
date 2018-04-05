<template>
  <div>
    
    <b-navbar toggleable="sm" type="dark" variant="dark">
      <b-navbar-brand href="#"><span id="dashboard">DASHBOARD</span></b-navbar-brand>
      <b-navbar-toggle target="header_collapse"></b-navbar-toggle>
    </b-navbar>
        
    <b-navbar type="dark" variant="dark" toggleable="sm" id="header_collapse">
      <b-collapse is-nav id="header_collapse">

        <b-navbar-nav justified id="items"> <!-- fill or justified -->
        
          <!-- <b-nav-item href="#"><i class="material-icons">assignment_ind</i><span>User's list</span></b-nav-item> -->
        
          <!-- <b-nav-item href="#"><i class="material-icons">date_range</i><span>Calendar</span></b-nav-item> -->
        
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em><i class="material-icons">assignment_ind</i><span>Users</span></em>
            </template>
            <b-dropdown-item href="#"><i class="material-icons">note_add</i><span>Create user</span></b-dropdown-item> 
            <b-dropdown-item href="#"><i class="material-icons">folder_shared</i><span>User's list</span></b-dropdown-item>
            <b-dropdown-item href="#"><i class="material-icons">perm_contact_calendar</i><span>User's schedule</span></b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em><i class="material-icons">date_range</i><span>Calendar</span></em>
            </template>
            <b-dropdown-item href="#"><i class="material-icons">perm_data_setting</i><span>Settings</span></b-dropdown-item> 
            <b-dropdown-item href="#"><i class="material-icons">event</i><span>RDV</span></b-dropdown-item>
            <b-dropdown-item href="#"><i class="material-icons">perm_contact_calendar</i><span>User's schedule</span></b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em><i class="material-icons">account_circle</i><span>Profile</span></em>
            </template>
            <b-dropdown-item href="#"><i class="material-icons">question_answer</i><span>Messages</span></b-dropdown-item>
            <b-dropdown-item href="#"><i class="material-icons">edit</i><span>Edit profile</span></b-dropdown-item>
            <b-dropdown-item href="#"><i class="material-icons">settings</i><span>Settings</span></b-dropdown-item>
            <b-dropdown-item href="#"><i class="material-icons">help</i><span>Help</span></b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="#"><i class="material-icons" id="logout">power_settings_new</i><span>Logout</span></b-dropdown-item> 
          </b-nav-item-dropdown>


          
          
          
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "dashboard",
  data() {
    return {
      // msg: "Here we are ..."
    };
  },
  components: {},
  methods: {}
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

span {
  /* color: purple; */
}
</style>