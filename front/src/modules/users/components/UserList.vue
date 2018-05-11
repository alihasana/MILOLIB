<template>
  <div class="">
    <h2 class="heading-secondary" v-html="title"></h2>
    <b-container fluid>
      
    <!-- Search tool -->
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal class="mb-0">
          <b-input-group>
            <!-- search a user via filter -->
            <b-form-input v-model="filter" placeholder="Rechercher un utilisateur" />
            <b-input-group-append>
              <!-- Refresh filter -->
              <b-btn :disabled="!filter" @click="filter = ''">Rafraîchir</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <!-- Results/page -->
      <b-col md="6" class="my-1">
      </b-col>
      <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Résultats par page" class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table show-empty 
             stacked="md"
             striped hover small outlined fixed
             :fields="fields"
             :items="users" 
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             @filtered="onFiltered"
             >
        <!-- Action buttons -->
        <template slot="show_details" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
          <b-btn size="sm" variant="primary" @click.stop="row.toggleDetails" class="mr-2"> {{ row.detailsShowing ? 'Fermer le' : 'Voir'}} Profil</b-btn>

          <b-btn size="sm" variant="success" @click="goUserCalendar(users._id)">Calendrier</b-btn>
      </template>
      <!-- Toggle Show profile details -->
       <template slot="row-details" slot-scope="row">
      <b-card>      

        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right"><b>Nom : </b></b-col>
          <b-col>{{ row.item.lastName }} </b-col>
        </b-row>

        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right"><b>Prénom : </b></b-col>
          <b-col>{{ row.item.firstName }}  </b-col>
        </b-row>  

        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right"><b>E-mail : </b></b-col>
          <b-col>{{ row.item.email }}</b-col>
        </b-row>

        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right"><b>Rôle : </b></b-col>
          <b-col>{{ row.item.role }}</b-col>
        </b-row>

        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right"><b>Lieu(x) d'exercice : </b></b-col>
          <b-col>{{ row.item.workPlace }}</b-col>
        </b-row>


        <!-- <b-button size="sm" @click="row.toggleDetails">Fermer le profil</b-button> -->
          <b-btn size="sm" variant="primary" @click.stop="details(row.item)">Modifier</b-btn>
          <b-btn size="sm" variant="danger" @click.stop="details(row.item)">Désactiver</b-btn>
      </b-card>
    </template>
    </b-table>
    <!-- Info modal -->
    <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
      <pre>{{ modalInfo.content }}</pre>
    </b-modal>
  </b-container>
  </div>
</template>

<script>
  import swal from "sweetalert2";
  import http from '../../../helpers/http'

  const items = []

  export default {
    name: "userList",
    data() {
      return {
      title: "Liste des utilisateurs",
      users: [],
      items: items,
      // defining the order of the columns, and which columns to display
      fields: [
        { key: 'lastName', label: 'Nom', sortable: true },
        { key: 'firstName', label: 'Prénom', sortable: true },
        { key: 'role', label: 'Rôle', sortable: true },
        { key: 'ref', label: 'Réf. (PRP)' },
        { key: 'show_details', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: items.length,
      pageOptions: [ 5, 10, 15, 20 ],
      sortBy: null,
      sortDesc: false,
      filter: null,
      modalInfo: { title: '', content: '' }
      };
    },
    computed: {
    // sortOptions () {
    //   // Create an option list from our fields
    //   return this.fields
    //     .filter(f => f.sortable)
    //     .map(f => { return { text: f.label, value: f.key } })
    // }
  },
    methods: {
      getListUser() {
        http
          .get("/users", {})
          .then(res => {
            this.users = res.data.content;
          })
          .catch(error => {
            if (error)
              swal({
                type: "error",
                title: "Oh no ...",
                text: error.response.data.message
              });
          });
      },
      goUserCalendar(){
        console.log('user id is: ', this.users)
        // http.get('calendar/', + userId )
        // .then(res => {
        //   console.log("here is your calendar")
        // })
        // .catch(error => {
        //   if (error) {
        //     console.log('there is an error with user calendar', error)
        //   }
        // })
      }, 
     
      info (item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
    },
    created() {
      this.getListUser();
    }
  };
</script>

<style scoped>
</style>
