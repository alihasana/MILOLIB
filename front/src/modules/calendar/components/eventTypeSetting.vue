<template>
  <div class="eventTypeSetting">
    <div class="eventTypeSetting__row">
      <b-form class="list">
        <b-form-group class="title" label="Paramétrage de mes types de RDV">
          <b-form-checkbox-group id="eventSettings" name="eventSettings" v-model="selected">
            <b-list-group>
              <b-list-group-item v-for="(type,index) in types" :key="index">
                <b-row >
                  <b-col sm="1">
                  </b-col>
                  <b-col class="eventTypeSetting__typesrdv">
                    <b-form-checkbox :value="type.rdvType">{{ type.rdvType }}</b-form-checkbox>
                  </b-col>
                  <b-col class="duration">
                    <b-button variant="link" size="sm" v-on:click="decreaseDuration(type)">
                      <i class="material-icons">remove_circle_outline</i>
                    </b-button>
                    <span>{{type.duration}} min</span>
                    <b-button variant="link" size="sm" v-on:click="increaseDuration(type)">
                      <i class="material-icons">add_circle_outline</i>
                    </b-button>
                  </b-col>
                  <b-col sm="1">
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button variant="outline-primary" v-on:click="confirmSelectedTypes(selected)" type="button">Confirmer mes types de RDV</b-button>
        <hr>
      </b-form>
    </div>
  </div>
</template>

<script>

/* eslint-disable */

import moment from 'moment';
import 'moment/locale/fr';
import swal from "sweetalert2";
import * as cHelpers from '.././calendarHelpers';
import http from '../../../helpers/http';

//description of component
//this component enable to set the type of meeting that will be allowed in calendar and their duration.

//TODO
//- would be greate to turn in color the selected type of meeting for better visualization
//- get route to display the actual type of appointment
//(get 'calendar/appontmentTypes')

export default {
  name: "eventTypeSetting",
  data() {
    return {
      types:[
      { rdvType:'Premier RDV individuel', index:0, duration:0},
      { rdvType:'Emploi', index:1, duration:0},
      { rdvType:'Formation', index:2, duration:0},
      { rdvType:'Projet professionnel', index:3, duration:0},
      { rdvType:'Aide Financiere', index:4, duration:0},
      { rdvType:'Apprentissage', index:5, duration:0},
      { rdvType:'Autre', index:6, duration:0}
      ],
      selected:[],
      eventTypeFilteredInETV:[]
    }
  },
  methods: {
    confirmSelectedTypes: function(sel){
      console.log('selected types are: ', sel);
      if(sel.length) {
        //if at least one type is selected, i get the value of duration and push it in array containing the enventType selection
        for (let i=0; i<sel.length; i++){
          for (let k=0; k<this.types.length; k++){
            if(this.types[k].rdvType == sel[i] && this.types[k].duration>0){
              this.eventTypeFilteredInETV.push({
                name: this.types[k].rdvType,
                duration: this.types[k].duration
              })
            }
          }
        }
      };
      console.log('this.eventTypeFilteredInETV: ', this.eventTypeFilteredInETV);
      this.sendEventsSettings(this.eventTypeFilteredInETV);
    },
    increaseDuration: function(t){
      if (t.duration>=0){
        return t.duration += 15;
      }
      else{
        console.log('Merci de sélectionner une durée valide');
      }
    },
    decreaseDuration: function(t){
      if (t.duration>=15){
        return t.duration -= 15;
      }
      else{
        console.log('Merci de sélectionner une durée valide');
      }
    },
    sendEventsSettings: function(SelectedEventTypes){
      console.log('j envoie mes types de RDV et leur durée au back end pour qu il les store en DB');
      let postBody = SelectedEventTypes;
      console.log('postBody: ', postBody);

      //for now while the route is not working
      // this.$store.commit('getEventTypes', SelectedEventTypes);

      http.put('/calendar/appointmentTypes', postBody)
      .then(
        res => {
          console.log('res:',res.data);
              swal({
                    type: "success",
                    title: "paramétrage de vos types de RDV et références",
                    text: res.message
              });
              // when the route will be working
              this.$router.push({name: 'agenda'});
              this.eventTypeFilteredInETV = '';
            })
      .catch(
        error => {
          console.log('error:', error.response.data.message);
            swal({
                    type: "error",
                    title: "paramétrage de vos types de RDV et références",
                    text: "non effectué: "+error.response.data.message
                    });
              //should display message to user that the events setting could not been saved
            });

    }
  }
};
</script>


<style scoped>

.eventTypeSetting{
   font-size: 12px;
   width:100%;
}

.eventTypeSetting__row{
  width: 100%;
}

.list{
  width:70%;
  margin: auto;
}
.title{
  font-size: 14px;
  font-weight: bold;
}

.list-group-item{
  font-size: 12px;
  font-weight: normal;
}

.eventTypeSetting__typesrdv{
  font-size: 14px;
  vertical-align: middle;
  text-align: left;
}

</style>
