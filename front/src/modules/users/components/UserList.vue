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

          <b-btn size="sm" variant="success" @click="goUserCalendar(row.item.calendar, row.item._id)">Calendrier</b-btn>
      </template>
      <!-- Toggle Show profile details -->
       <template slot="row-details" slot-scope="row">
      <b-card>      

        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right"><b>Nom : </b></b-col>
          <b-col class="text-sm-left">{{ row.item.lastName }} </b-col>
        </b-row>

        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right"><b>Prénom : </b></b-col>
          <b-col class="text-sm-left">{{ row.item.firstName }}  </b-col>
        </b-row>  

        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right"><b>E-mail : </b></b-col>
          <b-col class="text-sm-left">{{ row.item.email }}</b-col>
        </b-row>

        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right"><b>Rôle : </b></b-col>
          <b-col class="text-sm-left">{{ row.item.role }}</b-col>
        </b-row>

        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right"><b>Lieu(x) d'exercice : </b></b-col>
          <b-col class="text-sm-left">{{ row.item.workPlace }}</b-col>
        </b-row>

        <!-- <b-button size="sm" @click="row.toggleDetails">Fermer le profil</b-button> -->
       <b-row class="mb-2">
         <b-col sm="6" class="text-sm-right"> 
          <b-btn size="sm" variant="primary" @click="goUserDetails(row.item._id)">Modifier</b-btn>
         </b-col>
         <b-col sm="6" class="text-sm-left"> 
           <b-btn v-if="row.item.active !=activity" size="sm" variant="success" @click="enableUser(row.item._id, row.item.active)">Activer l'utilisateur</b-btn>
          <b-btn v-else size="sm" variant="danger" @click="disableUser(row.item._id, row.item.active)">Désactiver l'utilisateur</b-btn>
         </b-col>
       </b-row>

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
      activity: true,
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
      _rowVariant: "danger", 
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
            console.log('res.data.content de la usersList', this.users)
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
      //fetch user calendar details
      goUserCalendar(userCalendar, userId){
        http.get('/calendar/userCalendar/' + userCalendar + '/' + userId)
        .then(res => {
          console.log("User Calendar data : ", res.data)
          console.log("Here is the calendar of : ", res.data.content.userId.firstName + ' ' + res.data.content.userId.lastName)
        this.$router.push('/calendar/' + userCalendar + '/' + userId)
        })
        .catch(error => {
          if (error) {
            console.log('No available calendar has been provided', error)
            swal({
              type: "error",
              title: "No available calendar has been provided"
            });
          }
        })
      }, 
      goUserDetails(userDetails) {
      this.$router.push('/users/' + userDetails)
      }, 
     disableUser(userId, userActivity) {
       console.log("deactivate user", userId, "user activity: ", userActivity)
       http.put('users/disable/' + userId + '/' + userActivity)
       .then(res => {
         console.log('User Deactivated', res.data)
          swal({
            type: "success",
                title: "User account has been disabled"
              });
              setTimeout( () => location.reload(), 1500);
        })
       .catch(error => {
         if (error) {
           console.log('deactivate not ok')
         }
       })
     },
      enableUser(userId, userActivity) {
       console.log("reactivate user", userId, "user activity: ", userActivity)
       http.put('users/enable/' + userId + '/' + userActivity)
       .then(res => {
         console.log('User Ractivated', res.data)
          swal({
            type: "success",
                title: "User account has been enabled"
              });
              setTimeout( () => location.reload(), 1500);
        })
       .catch(error => {
         if (error) {
           console.log('reactivation not ok')
         }
       })
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
