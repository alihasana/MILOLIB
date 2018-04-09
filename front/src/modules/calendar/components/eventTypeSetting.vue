<template>
  <div class="container">
    <h5>{{msg}}</h5>
    <b-form>
      <b-form-group label="paramétrage de mes RDV">
        <b-form-checkbox-group id="eventSettings" name="eventSettings" v-model="selected">
          <b-list-group>
            <b-list-group-item v-for="type in types" :key="type.index">
              <b-row>
                <b-col sm="3" class="typesrdv">
                  <b-form-checkbox :value="type.rdv">{{ type.rdv }}</b-form-checkbox>
                </b-col>
                <b-col sm="6">
                    <b-button variant="link" size="sm" v-on:click="increaseDuration(type)"><i class="material-icons">add_circle_outline</i></b-button>
                    <span>{{type.duration}} min</span>
                    <b-button variant="link" size="sm" v-on:click="decreaseDuration(type)"><i class="material-icons">remove_circle_outline</i></b-button>
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button variant="outline-primary" v-on:click="confirmSelectedTypes(selected)" type="button">Confirmer mes types de RDV</b-button>
      <hr>
      <div>Selected: <strong>{{ selected }}</strong></div>
    </b-form>
  </div>
</template>

<script>

/* eslint-disable */

import moment from 'moment';
import 'moment/locale/fr';
import * as cHelpers from '.././calendarHelpers';

export default {
  name: "eventTypeSetting",
  data() {
    return {
      msg: "Event Type Settings",
      types:[
        { rdv:'Premier RDV individuel', index:0, duration:60},
        { rdv:'Emploi', index:1, duration:45},
        { rdv:'Formation', index:2, duration:45},
        { rdv:'Projet professionnel', index:3, duration:45},
        { rdv:'Aide Financiere', index:4, duration:30},
        { rdv:'Apprentissage', index:5, duration:45},
        { rdv:'Autre', index:6, duration:45}
      ],
      selected:[]
    };
  },
  components: {
  },
  methods: {
    confirmSelectedTypes: function(selected){
      console.log('selected types are: ', this.selected)
    },
    increaseDuration: function(t){
      return t.duration += 15;
    },
    decreaseDuration: function(t){
      return t.duration -= 15;
    }

  }
};



</script>



<style scoped>

.container {
  display: block;
}

.typesrdv{

text-align: left;
}

</style>
