<template>
  <div class="list-shows margin-t" v-if="!pageLoader">
    <genre-shows :genre="genre" :shows="showData" v-if="(isValidGenre && showData)" />

    <data-not-found v-else-if="!!(isValidGenre && !showData.length)">
      No data available for genre: {{ genre }}
    </data-not-found>

    <data-not-found v-else>
      Invalid genre: {{genre}}
    </data-not-found>

  </div>
</template>

<script>
import GenreShows from '@/components/GenreShows.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ListShows',
  props: ['genre'],
  components: {
    GenreShows
  },
  computed: {
    ...mapGetters(['genreList']),
    showData () {
      return this.$store.getters.genreByShows([this.genre])
    },
    isValidGenre () {
      return this.genreList.find(() => this.genre)
    }
  },
  created () {
    this.getShows()
  },
  methods: {
    ...mapActions(['getShowsData']),
    async getShows () {
      this.toggleLoader(true)
      try {
        await this.getShowsData()
      } catch (error) {
        this.getErrorHandler(error.message)
      }
      this.toggleLoader(false)
    }
  }
}
</script>
