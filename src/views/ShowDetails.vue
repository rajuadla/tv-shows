<template>
  <div class="show-details margin-t mb-3" v-if="!pageLoader">
    <ul class="list-group list-group-flush" v-if="showData && showData.id">
      <li class="list-group-item">
        <div
          class="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-start"
        >
          <div class="text-center me-3 mb-3 mb-md-0">
            <div v-if="showData.image">
              <img :src="showData.image.medium" />
            </div>
            <div class="no-image-show-card card" v-else>
              <div class="card-body">
                {{showData.name}}
              </div>
            </div>
          </div>
          <div class="ms-3">
            <h3>{{ showData.name }}</h3>
            <p v-if="showData.genres" class="mb-1 show-details">
              <b>Genre:</b>
              <small>
                <i>
                  {{ showData.genres.join(", ") }}
                </i>
              </small>
            </p>
            <p class="mb-1 show-details">
              <b>Rating:</b>
              <small>
                <i>
                  {{ showData.rating ? showData.rating.average : 0 }}
                </i>
              </small>
            </p>
            <p class="mb-1 show-details">
              <b>Language:</b>
              <small>
                <i>
                  {{ showData.language }}
                </i>
              </small>
            </p>
            <p class="mb-1 show-details">
              <b>Type:</b>
              <small>
                <i>
                  {{ showData.type }}
                </i>
              </small>
            </p>
            <div class="mt-4">
              <h5 class="mb-1 border-bottom">Summary</h5>
              <p cla ss="show-desc" v-html="showData.summary"></p>
            </div>
            <h5 class="mt-2 border-bottom p-1">Cast</h5>
            <div class="d-flex flex-wrap justify-content-center justify-content-sm-start">
              <div class="me-3 cast-data" v-for="(cast, index) in showCastData" :key="index">
                <div v-if="cast.person.image">
                  <img :src="cast.person.image.medium" />
                  <p class="text-capitalize">{{cast.person.name}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <data-not-found v-else>
    </data-not-found>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DataNotFound from '@/shared/components/DataNotFound.vue'
export default {
  components: { DataNotFound },
  name: 'ShowDetails',
  props: ['showid'],
  created () {
    this.getShowData()
    this.getShowCastData()
  },
  computed: {
    ...mapGetters(['showCastData']),
    showData () {
      return this.$store.state.showDetails
        ? this.$store.state.showDetails.data
        : []
    }
  },
  methods: {
    ...mapActions(['getShowDetails', 'getShowCastDetails']),
    async getShowData () {
      this.toggleLoader(true)
      try {
        await this.getShowDetails(this.showid)
        this.getErrorHandler('')
      } catch (error) {
        this.getErrorHandler(error.message)
      }
      this.toggleLoader(false)
    },

    async getShowCastData () {
      this.toggleLoader(true)
      try {
        await this.getShowCastDetails(this.showid)
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
.show-desc {
  text-align: justify;
}
.cast-data{
  max-width: 80px;
}
.cast-data img{
  width: 100%;
}
.show-details{
  font-size: 14px;
}
.no-image-show-card {
  max-width: 221px;
  height: 100%;
  background: #CCC;
}
.no-image-show-card.card .card-body{
  width: 221px;
  text-align: center;
  height: 100% !important;
  vertical-align: text-bottom;
  padding: 120px 10px;
  font-weight: bold;
  color: #333;
}
</style>
