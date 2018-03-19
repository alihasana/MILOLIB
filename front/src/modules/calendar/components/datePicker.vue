<template>
	<div>
 <h1>{{ msg }}</h1>
 	<form class="timerange">
 		<div class="startingdate form-group">
 			<label>De</label>
 			<input type="text" placeholder="MM/DD/YYY" name="startdate">
 		</div>
 		<div class="endingdate form-group"> 
 			<label>à</label>
 			<input type="text" placeholder="MM/DD/YYY" name="enddate">
 		</div>
 		
 	</form>
 	</div>
</template>

<script>
/* eslint-disable */

export default {
  name: "datePicker",
  data() {
    return {
      msg: "datePicker Vue"
    };
  },
  components: {},
  methods: {}
};
</script>

<style scoped>
</style>