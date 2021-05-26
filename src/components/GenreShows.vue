<template>
  <div class="genre-shows" >
    <h3 class="mb-2 mt-4 genre-heading text-center text-capitalize"
    :class="{ 'text-md-start': !!isHomePage }"  v-if="genre">{{ genre }}</h3>
    <div
      class="d-flex mb-2 overflow-auto"
      :class="{ 'flex-md-nowrap justify-content-md-start': !!isHomePage,
      'flex-wrap justify-content-center': !isHomePage }"
    >
      <div
        class="show-card flex-row justify-content-md-evenly show-item"
        :class="displayShowOrder(index)"
        v-for="(show, index) of showData"
        :key="index"
      >
        <div class="card" v-if="show.image">
          <router-link :to="{ name: 'Show', params: { showid: show.id } }">
            <img
              class="img-thumbnail rounded"
              :src="show.image ? show.image.medium : ''"
              :alt="show.name"
            />
          </router-link>
        </div>
        <div class="no-image-show-card card" v-else>
          <router-link :to="{ name: 'Show', params: { showid: show.id } }">
            <div class="card-body">
              {{show.name}}
            </div>
          </router-link>
        </div>
        <div class="rating">
          {{ show.rating.average ? show.rating.average.toFixed(1) : 0 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GenreShows',
  props: ['genre', 'shows', 'isHomePage'],
  computed: {
    showData () {
      let shows
      if (this.genre) {
        shows = this.genre === 'Popular' ? this.shows : this.shows[this.genre]
      } else {
        shows = this.shows
      }
      return shows
    }
  },
  methods: {
    displayShowOrder (index) {
      return {
        [`order-'${index}`]: this.isHomePage,
        [`me-1 mb-1`]: this.isHomePage,
        [`me-2 mb-2`]: !this.isHomePage
      }
    }
  }
}
</script>

<style scoped>

::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: #686464;
  border-radius: 2px
}

::-webkit-scrollbar-thumb:hover {
  background: #686464
}
.show-item {
  position: relative;
}
.show-card{
  min-width: 200px;
}
.no-image-show-card {
  min-width: 221px;
  width: 221px;
  height: 100%;
  background: #CCC;
}
.no-image-show-card.card .card-body{
  text-align: center;
  height: 100% !important;
  vertical-align: text-bottom;
  padding: 120px 10px;
  font-weight: bold;
  color: #333;
}
.rating {
  position: absolute;
  top: 10px;
  left: 5%;
  background: #c73838;
  padding: 5px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
  width: 29px;
  text-align: center;
  color: #fff;
}
</style>
