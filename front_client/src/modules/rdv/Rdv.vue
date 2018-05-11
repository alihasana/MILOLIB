<template>
  <div class="rdv">
   <form v-on:submit.prevent>
    <div class="row login__row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1 class="heading-primary">{{ title }}</h1>
        <hr>
        <div>
          <b-form-select v-model="selected" :options="options" class="mb-3" required>
            <template slot="first">
              <!-- this slot appears above the options from 'options' prop -->
              </option> -->
              <option value="null" disabled>-- Sélectionner le type de rendez-vous --</option>
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
      options:[],
      id: '',
      slots: '',
      appointmentTypes: ''
    }
  },
  components: {},
  methods: {
      commit(){
        console.log('commit');
      this.$store.commit('getCalendarId', this.id);    
      this.$store.commit('getSlots', this.slots);
      this.$store.commit('getappointmentType', this.appointmentTypes);
      this.$store.commit('getselectedAptTypeName', this.selected);
      },
      pushCalendar(){
        console.log('calendar');
        this.$router.push("/calendar");
      },
      takeRdv() {
        // 1 - check what have been selected
        console.log('this.selected:', this.selected);
        // 3 - get the matching calendar from the backend
        http
        .get("/clients/appointment/" + this.selected)
        .then(res => {
          
          //here pass data from the backend to the store
          this.id = res.data.content._id;
          this.slots = res.data.content.slots;
          this.appointmentTypes = res.data.content.appointmentTypes;
          // async function goToCalendar(){
          //   await commit();
          //   await pushCalendar();
          // }
          console.log('res:', res);
          this.commit();
          this.pushCalendar();
          
          // swal({
          //     type: "success",
          //     title: "Vous allez maintenant choisir la date du rendez-vous !",
          //     // text: res.data.content
          //   });
          // this.$router.push("/calendar");
        })
        // .then(this.$router.push("/calendar"))
        .catch(error => {
          swal({
            type: "error",
            title: "Oups ! Une erreur s'est produite !",
            // text: error.res.data.content
          });
        });
    }

  }
};
</script>

<style scoped>
</style>