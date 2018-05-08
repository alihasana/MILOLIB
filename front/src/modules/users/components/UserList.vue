<template>
  <div class="">
    <h2 class="heading-secondary">Liste des utilisateurs</h2>
    <!-- <div class="row userlist__row"> -->
          <!--Il faudrait plutôt mettre des boutons, car le lien doit permettre de modifier, supprimer, accéder au calendrier, et accéder au détails de l'utilisateur-->
      <!-- <router-link class="userlist__list col-xs-6 col-lg-3" :to="{name:'userDetail' , params: {id: user._id , user: user}}" v-for='user in users' :key="user._id">
        <p>{{ user.email }}<br/>
          <i class="material-icons">edit</i>
          <i class="material-icons">event</i>
          <i class="material-icons">delete_forever</i>
          </p> -->
        <!-- <button v-on:click="redirectToUserList">Modifier</button> -->
      <!-- </router-link>
    </div> -->


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
              striped hover 
              :items="users" 
              :fields="fields"
             stacked="md"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             @filtered="onFiltered"
             >
      <!-- <template slot="ref" slot-scope="row"> </template> -->
      <template slot="actions" slot-scope="row">
          <b-btn size="sm" variant="primary" @click.stop="details(row.item)">profil</b-btn>
          <b-btn size="sm" variant="primary" @click.stop="details(row.item)">Calendrier</b-btn>
          <b-btn size="sm" variant="primary" @click.stop="details(row.item)">Modifier</b-btn>
          <b-btn size="sm" variant="primary" @click.stop="details(row.item)">Désactiver</b-btn>
      </template>
     
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <!-- <b-button size="sm" @click.stop="row.toggleDetails" variant="primary">
         Voir le profil
        </b-button>
        <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1" variant="primary">
          Voir le calendrier
        </b-button>
        <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1" variant="primary">
          Modifier
        </b-button>
        <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1" variant="primary">
          Désactiver
        </b-button> -->




      <!-- Voir le détail du profil -->
      <template slot="row-details" slot-scope="row">
           <router-link class="userlist__list col-xs-6 col-lg-3" :to="{name:'userDetail' , params: {id: user._id , user: user}}" v-for='user in users' :key="user._id">
             <b-card>
        <!-- show profil details  -->
        <p>{{ user.email }}<br/>
          </p>
             </b-card>
        <!-- <button v-on:click="redirectToUserList">Modifier</button> -->
      </router-link>
      </template>



        
    </b-table>
    <!-- Info modal -->
    <!-- <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
      <pre>{{ modalInfo.content }}</pre>
    </b-modal> -->
  </b-container>


  </div>
</template>

<script>
  import swal from "sweetalert2";
  import http from '../../../helpers/http'

  const items = [
  { ref: true, role: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
  { ref: false, role: 21, name: { first: 'Larsen', last: 'Shaw' } },
  { ref: false, role: 9, name: { first: 'Mini', last: 'Navarro' } },
  { ref: false, role: 89, name: { first: 'Geneva', last: 'Wilson' } },
  { ref: true, role: 38, name: { first: 'Jami', last: 'Carney' } },
  { ref: false, role: 27, name: { first: 'Essie', last: 'Dunlap' } }
]
  export default {
    name: "userList",
    data() {
      return {
        title: "Your are on the userList",
        users: [],
        items: items,
        // Table field name
      fields: [
        { key: 'email', label: 'Nom et Prénom de l\'utilisateur', sortable: true },
        { key: 'role', label: 'Rôle de l\'utilisateur', sortable: true, 'class': 'text-center' },
        { key: 'ref', label: 'Réf. (PRP)' },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: items.length,
      pageOptions: [ 5, 10, 15, 20 ],
      sortBy: null,
      sortDesc: false,
      filter: null,
      modalInfo: { title: '', content: '' }
      };
    },
    computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
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
      // redirectToUserList() {
      //   this.$router.push('ProfileUser')
      // }
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
