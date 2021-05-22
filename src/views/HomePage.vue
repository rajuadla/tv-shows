<template>
  <div class="home-page" v-if="!pageLoader">
      <div class="mb-1">
        <genre-shows
          genre="Popular"
          :shows="popularShows"
          :isHomePage="true"
        ></genre-shows>
      </div>
      <div v-for="genre of genreList" :key="genre">
        <genre-shows
          :genre="genre"
          :shows="genreShowsData"
          :isHomePage="true"
        ></genre-shows>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import GenreShows from "@/components/GenreShows.vue"

export default {
  name: "HomePage",
  components: {
    GenreShows
  },
  computed: {
    ...mapGetters(["popularShows", 'genreList']),
    genreShowsData () {
      return this.$store.getters.genreByShows(this.genreList)
    }
  },
  created () {
    this.getShows()
  },
  methods: {
    ...mapActions(["getShowsData"]),
    async getShows () {
      this.toggleLoader(true)
      try {
        await this.getShowsData()
        this.getErrorHandler('')
      } catch (error) {
        this.getErrorHandler(error.message)
      }
      this.toggleLoader(false)
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
