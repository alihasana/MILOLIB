<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <dashHeader style="border: thick solid black; background-color: purple;"/>
      </div>
    </div>
    <div class="row" id="main">
      <div class="col-md-3">
        <dashAside style="background-color: orange;"/>
      </div>
      <div class="col-md-9">
        <dashSection style="background-color: cyan;"/>
      </div>
    </div>
  </div>
</template>

<script>
import dashHeader from "./components/dashHeader";
import dashAside from "./components/dashAside";
import dashSection from "./components/dashSection";

/* eslint-disable */
export default {
  name: "dashboard",
  data() {
    return {
      // msg: "Here we are ..."
    };
  },
  components: {
    dashHeader,
    dashAside,
    dashSection
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