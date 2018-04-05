<template>
    <!-- <div class="container" id="main">
      <div class="row">
        <div class="col-md-3">
          <div class="list-group">
            <a href="index.html" class="list-group-item active main-color-bg">
              <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Dashboard
            </a>
            <a href="pages.html" class="list-group-item"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span> Calendrier</a>
            <a href="posts.html" class="list-group-item"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span> Évènements </a>
            <a href="users.html" class="list-group-item"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Liste des profils </a>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div class="container" id="main">
      <div class="row">
        <div class="col-md-3"> -->
          <div class="list-group">
            <a href="index.html" class="list-group-item active main-color-bg">
              <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Dashboard
            </a>
            <a href="pages.html" class="list-group-item"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span> Calendrier</a>
            <a href="posts.html" class="list-group-item"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span> Évènements </a>
            <a href="users.html" class="list-group-item"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Liste des profils </a>
          </div>
        <!-- </div>
      </div>
    </div> -->
</template>

<script>
/* eslint-disable */
export default {
  name: "dashAside",
  data() {
    return {
      msg: "ASIDE"
    };
  },
  methods: {}
};
</script>

<style scoped>
.main-color-bg{
  background-color: #e74c3c !important;
  border-color: #c0392b !important;
  color:#ffffff !important;
}

#header{
  background:#333333;
  color:#ffffff;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

#header .create{
  padding-top: 20px;
}

@media (max-width: 767px) {
  .dropdown-menu>li>a {
    color: #ecf0f1;
  }
  .dropdown-menu>li>a:hover,
  .dropdown-menu>li>a:focus {
    color: #ffbbbc;
  }
  .dropdown-menu>.active>a,
  .dropdown-menu>.active>a:hover,
  .dropdown-menu>.active>a:focus {
    color: #ffbbbc;
    background-color: #c0392b;
  }
}
</style>