<template>
  <div class="side-nav">
		<div class="logo">
			<i class="fa fa-tachometer-alt"></i>
			<span>MILOLIB</span>
		</div>
		<nav>
			<ul>
				<li>
					<a href="#">
						<span><i class="fa fa-user"></i></span>
						<span>Users</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span><i class="fa fa-envelope"></i></span>
						<span>Messages</span>
					</a>
				</li>
				<!-- <li class="active"> -->
          <li>
					<a href="#">
						<span><i class="fa fa-chart-bar"></i></span>
						<span>Analytics</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span><i class="fas fa-credit-card"></i></span>
						<span>Payments</span>
					</a>
				</li>
			</ul>
		</nav>
	</div>
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
.logo {
	height: 42px;
	padding: 10px;
	font-weight: bold;
}
.logo  i {
	font-size: 22px;
}
.logo span {
	margin-left: 5px;
	/* text-transform: uppercase; */
}
.side-nav .logo {
  /* background-color: #233245; */
  background-color: #111111;
	color: #fff;
}
.side-nav {
	position: absolute;
	width: 100%;
	height: 100vh;
  /* background-color: #35475e; */
  background-color: #333333;
	z-index: 1;
	display: none;
}
.side-nav.visible {
	display: block;
}
.side-nav ul {
	margin: 0;
	padding: 0;
}
.side-nav ul li {
	padding: 16px 16px;
  /* border-bottom: 1px solid #3c506a; */
  border-bottom: 1px solid #006eff;
	position: relative;
}
.side-nav ul li.active:before {
	content: '';
	position: absolute;
	width: 4px;
	height: 100%;
	top: 0;
	left: 0;
	background-color: #fff;
}
.side-nav ul li a {
	color: #fff;
	display: block;
	text-decoration: none;
}
.side-nav ul li i {
	color: #0497df;
	min-width: 20px;
	text-align: center;
}
.side-nav ul li span:nth-child(2) {
	margin-left: 10px;
	font-size: 14px;
	font-weight: 600;
}
@media screen and (min-width: 600px) {
	.side-nav {
		display: block;
		width: 70px;
		z-index: 2;
	}
	.side-nav ul li span:nth-child(2) {
		display: none;
	}
	.side-nav .logo i {
		text-align: center;
	}
	.side-nav .logo span {
		display: none;
	}
	.side-nav ul li i {
		font-size: 26px;
	}
	.side-nav ul li a {
		text-align: center;
	}
}
@media screen and (min-width: 800px) {
	.side-nav {
		width: 200px;
	}
	.side-nav ul li span:nth-child(2) {
		display: inline-block;
	}
	.side-nav ul li i {
		font-size: 16px;
	}
	.side-nav ul li a {
		text-align: left;
	}
	.side-nav .logo i {
    padding-left: 0;
    float: left;
	}
	.side-nav .logo span {
    display: inline-block;
    
    float: left;
  }
  .side-nav .logo {
    
  }
}
</style>