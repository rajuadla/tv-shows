<template>
  <div class="show-search margin-t" v-if="!pageLoader">
    <p class="lead">
      Showing results for: <i>{{ searchText }}</i>
    </p>
    <div class="search-data" v-if="showSearchResults.length">
      <genre-shows :shows="showSearchResults" ></genre-shows>
    </div>
    <div v-else>
      <data-not-found>
      </data-not-found>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import GenreShows from '@/components/GenreShows.vue'

export default {
  name: 'ShowSearch',
  props: ['searchText'],
  components: {
    GenreShows
  },
  created () {
    this.getShowSearchData()
  },
  computed: {
    ...mapGetters(['showSearchResults'])
  },
  watch: {
    $route (to, from) {
      if (to.query.q !== from.query.q) {
        this.getShowSearchData()
      }
    }
  },
  methods: {
    ...mapActions(['getShowSearchResults']),
    async getShowSearchData () {
      this.toggleLoader(true)
      try {
        await this.getShowSearchResults(this.searchText)
      } catch (error) {
        this.getErrorHandler(error.message)
      }
      this.toggleLoader(false)
    }
  }
}
</script>

<style scoped>
</style>
