<template>
  <div class="rdv">
    <!-- <div>{{this.$store.state.test}}</div>
    <div>{{this.$store.state.calendarId}}</div>
    <div>{{this.$store.state.calendarSlots}}</div>
    <div>{{this.$store.state.appointmentTypes}}</div>
    <button class="btn btn-lg btn--white" v-on:click="updateStore()">updateStore</button> -->
   <form v-on:submit.prevent>
    <div class="row login__row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1 class="heading-primary">{{ title }}</h1>
        <hr>
        <div>
          <b-form-select v-model="selected" :options="options" class="mb-3" required>
            <template slot="first">
              <!-- this slot appears above the options from 'options' prop -->
              <option :value="null" disabled>-- Sélectionner le type de rendez-vous --</option>
            </template>
            <!-- these options will appear after the ones from 'options' prop -->
            <option value="Premier rendez-vous">Premier rendez-vous (uniquement si vous n'avez jamais eu d'entretien individuel)</option>
            <option value="Emploi">Emploi</option>
            <option value="Formation">Formation</option>
            <option value="Projet professionnel">Projet professionnel</option>
            <option value="Aide financière">Aide financière</option>
            <option value="Apprentisage">Apprentissage</option>
            <option value="Autre">Autre</option>
          </b-form-select>
          <div>Selected: <strong>{{ selected }}</strong></div>
        </div>
        <button class="btn btn-lg btn--white" v-on:click="takeRdv">Valider</button>
      </div>
    </div>
  </form>
  <br>
  <!-- <div>
    <h1> Choisir une date : </h1>
  </div> -->
</div>
</template>

<script>
/* eslint-disable */
import swal from "sweetalert2";
import http from '../../helpers/http';

export default {
  name: "Rdv",
  data() {
    return {
      title: "Prendre un rendez-vous :",
      selected: null,
      test:'test',
      id: '',
      slots: '',
      appointmentTypes: '',
    };
  },
  components: {},
  methods: {
        // updateStore(){
        //   this.$store.commit('getTest', this.test);
          // this.$store.commit('getCalendarId', this.id);
          // this.$store.commit('getSlots', this.slots);
          // this.$store.commit('getappointmentType', this.appointmentTypes);
        // },
        takeRdv() {
        http
        .get("/clients/appointment/" + this.selected)
        // .get("/profile/appointment/" + this.selected)
        .then(res => {
          console.log('this.selected:', this.selected);
          console.log('res:', res);
          // console.log('res.data.content._id:', res.data.content._id);
          // console.log('res.data.content.appointmentTypes:', res.data.content.appointmentTypes);
          // console.log('res.data.content.slots:', res.data.content.slots);
          // console.log('res.data.content.updatedAt:', res.data.content.updatedAt);
          // console.log('res.data.content.userId:', res.data.content.userId);
          // console.log('res.data.content.createdAt:', res.data.content.createdAt);
          // this.$store.state.calendarId = res.data.content._id;
          // this.$store.state.calendarSlots = res.data.content.slots;
          // this.$store.state.appointmentTypes = res.data.content.appointmentTypes;
          // this.$store.commit('CalendarId');
          // this.$store.commit('Slots');
          // this.$store.commit('appointmentType');
          // console.log('this.$store.state.calendarId:', this.$store.state.calendarId);
          // console.log('this.$store.state.calendarSlots:', this.$store.state.calendarSlots);
          // console.log('this.$store.state.appointmentTypes:', this.$store.state.appointmentTypes);

          // this.$store.state.rdv.updatedAt = res.data.content.updatedAt;
          // this.$store.state.rdv.userId = res.data.content.userId;
          // this.$store.state.rdv.createdAt = res.data.content.createdAt;
          // this.selected = res.data.content;
          // console.log(this.selected);

          // this.$store.commit('getTest', this.test);
          this.id = res.data.content._id;
          this.$store.commit('getCalendarId', this.id);
          this.slots = res.data.content.slots;
          this.$store.commit('getSlots', this.slots);
          this.appointmentTypes = res.data.content.appointmentTypes;
          this.$store.commit('getappointmentType', this.appointmentTypes);

          this.$router.push("/calendar");
          swal({
              type: "success",
              title: "Vous allez maintenant choisir la date du rendez-vous !",
              // text: res.data.content
            });
          // this.$router.push("/calendar");
        })
        .catch(error => {
          swal({
            type: "error",
            title: "Merci de sélectionner un type de rendez-vous.",
            // text: error.res.data.content
          });
        });
    }
  }
};
</script>

<style scoped>
</style>