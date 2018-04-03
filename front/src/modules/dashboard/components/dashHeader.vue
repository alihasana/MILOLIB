<template>
  <div class="header">
    <!-- <div class="logo"> ne s'affiche que lorsque la résolution est < à 600px (vu que dashAside n'est plus affiché) -->
		<div class="logo">
			<i class="fa fa-tachometer-alt"></i>
			<span>MILOLIB</span>
		</div>
		<a href="/#/dashboard" class="nav-trigger"><i class="fas fa-bars"></i></a>
    <!-- <div class="logo"> ne s'affiche que lorsque la résolution est < à 600px (vu que dashAside n'est plus affiché)-->
	</div>
</template>

<script>
// POURQUOI NECESSAIRE ICI ET DANS LE PARENT ?
$(document).ready(function() {
	$('.nav-trigger').click(function() {
		$('.side-nav').toggleClass('visible');
	});
});

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
.header {
  /* nécessaire pour que le aside s'affiche sur le header */
  position: absolute;
	width: 100%;
  z-index: 3;
  /* nécessaire pour que le aside s'affiche sur le header */
	height: 42px;
	background-color: #fff;
  /* border-bottom: 3px solid #2d3d51; */
  border-bottom: 4px solid #333333;
}
.header .logo {
  float: left;
	/* height: 44px; */
	/* z-index: 1; */
	padding: 10px;
	font-weight: bold;
  /* color: #233245; */
  color: #2d3d51;
}
.nav-trigger {
	/* position: relative; */
  float: right;
  /* padding: 2px 5px 10px 10px; */
	/* width: 20px; */
	/* height: 44px; */
	/* right: 30px; */
  /* display: block;	 */
}
.nav-trigger i {
  color: #2d3d51;
  font-size: 20px;
  padding: 10px;
}
@media screen and (min-width: 600px) {
	.header {
    /* background-color: #35475e; */
    background-color: #333333;
		z-index: 1;
	}
	.header .logo {
		display: none;
	}
	.nav-trigger {
		display: none;
	}
}
</style>