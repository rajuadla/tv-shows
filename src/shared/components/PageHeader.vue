<template>
  <div class="page-header">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand
        ><router-link class="navbar-brand text-uppercase" to="/home"
          >Tv Shows</router-link
        ></b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown text="Genres" right>
            <b-dropdown-item class="genre-select" v-for="(genre, index) in genres" :key="index">
              <router-link
                class="nav-link p-0 text-black-color"
                :to="{ name: 'ListShows', params: { genre: genre } }"
                >{{ genre }}
              </router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ms-auto">
          <b-nav-form right>
            <b-input-group>
              <b-form-input
                id="input-sm"
                size="sm"
                class="mr-sm-2"
                placeholder="Search"
                v-model="searchText"
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  class="search-button"
                  @click="getSearchData"
                  >GO</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { BNavbar } from 'bootstrap-vue'
import { mapActions } from 'vuex'

export default {
  name: 'PageHeader',
  components: {
    BNavbar
  },
  data () {
    return {
      searchText: ''
    }
  },
  computed: {
    genres () {
      return this.$store.getters.genreList
    }
  },
  created () {
    this.getShowData()
  },
  methods: {
    ...mapActions(['getShowsData']),
    async getShowData () {
      try {
        await this.getShowsData()
        this.getErrorHandler('')
      } catch (error) {
        this.getErrorHandler(error.message)
      }
    },
    getSearchData () {
      this.$router.push({ name: 'Search', query: { q: this.searchText } })
      this.searchText = ''
    }
  }
}
</script>
<style scoped>
.page-header {
  margin-bottom: 20px;
}
.text-black-color {
  color: #000 !important;
}
.search-button {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.page-header .navbar{
  padding: 5px 65px;
}
</style>
