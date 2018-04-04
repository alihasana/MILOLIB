<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark"> <!-- navbar-expand-sm définit à partir de quand les liens seront remplacés par le toggle -->
      <div class="row">

        <!-- Brand -->
        <a class="navbar-brand" href="#">MILOLIB</a>
        <!-- <button type="button" class="btn btn-link navbar-brand navbar-toggle" data-toggle="collapse" data-target="#aside">Dashboard</button> -->

        <!-- Toggler/collapsibe Button -->
        <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#header">
          <span class="navbar-toggler-icon"></span>
        </button> -->
        
        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="header">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#"><span><i class="far fa-address-book"></i></span>User's list</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"><span><i class="far fa-calendar-alt"></i></span>Calendar</a>
            </li>
            <!-- Dropdown -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
              <span><i class="fa fa-cog"></i></span>
              Profile
              </a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Home</a>
                <a class="dropdown-item" href="#">Parameters</a>
                <a class="dropdown-item" href="#">Logout</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- Toggler/collapsibe Button -->
      <button class="navbar-toggler nav" type="button" data-toggle="collapse" data-target="#header" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>

    <nav class="navbar bg-dark navbar-dark aside">
    <button type="button" class="btn btn-link navbar-brand navbar-toggle" data-toggle="collapse" data-target="#aside"><i class="fa fa-tachometer-alt"></i>Dashboard</button>
    <!-- Aside -->
    <div class="row collapse navbar-collapse" id="aside">
      <nav class="navbar bg-dark">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#"><span><i class="fa fa-user"></i></span>Create User</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><span><i class="fa fa-envelope"></i></span>Messages</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><span><i class="fa fa-ban"></i></span>Access denied</a>
          </li>
        </ul>
      </nav>
    </div>
    </nav>
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
.container-fluid {
  padding: 0 !important;
}

.navbar-brand {
  padding-left: 10px;
}

.aside {
  width: 200px;
}

#header {
  /* padding-left: 100px; */
}
</style>