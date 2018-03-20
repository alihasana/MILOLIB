<template>
    <!-- <div class="container" id="main">
        <div class="col-md-9">
          <div class="panel panel-default">
            <div class="panel-heading main-color-bg">
              <h3 class="panel-title">VIEW COMPONENT</h3>
            </div>
            <div class="panel-body">
              <h1>{{ msg }}</h1>
            </div>
          </div>
        </div>
      </div> -->
      <!-- <div class="container" id="main">
        <div class="col-md-9"> -->
          <div class="panel panel-default">
            <div class="panel-heading main-color-bg">
              <h3 class="panel-title">VIEW COMPONENT</h3>
            </div>
            <div class="panel-body">
              <h1>{{ msg }}</h1>
            </div>
          </div>
        <!-- </div>
      </div> -->
</template>

<script>
/* eslint-disable */
export default {
  name: "dashSection",
  data() {
    return {
      msg: "SECTION"
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