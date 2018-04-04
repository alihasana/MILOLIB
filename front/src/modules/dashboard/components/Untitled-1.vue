<template>
<!-- <div class="container-fluid" id="header">
      <div class="row">
        <div class="col-md-3 col-md-offset-6">
          <div class="dropdown create">
            <button class="btn btn-default dropdown-toggle glyphicon glyphicon-user" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              Créer un utilisateur
              <span class="caret"></span>
            </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><a type="button" data-toggle="modal" data-target="#addPage">Administrateur</a></li>
                <li><a href="#">Chargé d'acceuil</a></li>
                <li><a href="#">Conseiller</a></li>
                <li><a href="#">Guest</a></li>
                <li><a href="#">Demandeur</a></li>
                <li><a href="#">Primo demandeur</a></li>
              </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div class="dropdown create">
            <button class="btn btn-default dropdown-toggle glyphicon glyphicon-cog" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              Menu
              <span class="caret"></span>
            </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li>
                  <a type="button" data-toggle="modal" data-target="#">Profil</a>
                </li>
                <li>
                  <a href="login.html">Déconnexion</a>
                </li>
              </ul>
          </div>
        </div>
      </div>
</div> -->
<div class="container" id="header">
      <div class="row">
        <div class="col-md-3">
          <div class="dropdown create">
            <button class="btn btn-default dropdown-toggle glyphicon glyphicon-user" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              Créer un utilisateur
              <span class="caret"></span>
            </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><a type="button" data-toggle="modal" data-target="#addPage">Administrateur</a></li>
                <li><a href="#">Chargé d'acceuil</a></li>
                <li><a href="#">Conseiller</a></li>
                <li><a href="#">Guest</a></li>
                <li><a href="#">Demandeur</a></li>
                <li><a href="#">Primo demandeur</a></li>
              </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div class="dropdown create">
            <button class="btn btn-default dropdown-toggle glyphicon glyphicon-cog" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              Menu
              <span class="caret"></span>
            </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li>
                  <a type="button" data-toggle="modal" data-target="#">Profil</a>
                </li>
                <li>
                  <a href="login.html">Déconnexion</a>
                </li>
              </ul>
          </div>
        </div>
      </div>
</div>
</template>

<script>
/* eslint-disable */
export default {
  name: "dashHeader",
  data() {
    return {
      msg: "HEADER"
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