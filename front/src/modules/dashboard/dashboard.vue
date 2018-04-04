<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="dark"> <!-- color: primary, success, info, warning, danger, dark, or light. -->
      <b-navbar-brand href="#"><span><i class="material-icons">home</i></span>MILOLIB</b-navbar-brand>
      <b-navbar-toggle target="header_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="header_collapse">
        <b-navbar-nav>
          <b-nav-item href="#"><span><i class="material-icons">assignment_ind</i></span>User's list</b-nav-item>
          <b-nav-item href="#"><span><i class="material-icons">date_range</i></span>Calendar</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em><span><i class="material-icons">account_circle</i></span>Profile</em>
            </template>
            <b-dropdown-item href="#"><span><i class="material-icons">settings</i></span>Settings</b-dropdown-item> <!-- <i class="material-icons">perm_data_setting</i> -->
            <b-dropdown-item href="#"><span><i class="material-icons">power_settings_new</i></span>Logout</b-dropdown-item> <!-- <i class="material-icons">exit_to_app</i> -->
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-navbar type="dark" variant="dark" id="aside_collapse">
    <b-navbar-toggle target="aside_collapse"><span><i class="material-icons">dashboard</i></span>Dashboard</b-navbar-toggle>
    <b-collapse is-nav id="aside_collapse">
        <b-navbar-nav>
          <b-nav-item href="#"><span><i class="material-icons">face</i></span>Create user</b-nav-item>
          <b-nav-item href="#"><span><i class="material-icons">question_answer</i></span>Messages</b-nav-item>
          <b-nav-item href="#"><span><i class="material-icons">folder</i></span>Module</b-nav-item>
          <b-nav-item href="#" disabled><span><i class="material-icons">lock</i></span>Access denied</b-nav-item>
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

#aside_collapse {
  width: 200px;
}

#header_collapse {
  padding-left: 100px;
}

span {
  padding-right: 4px;
}
</style>