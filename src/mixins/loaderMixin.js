export default {
  computed: {
    pageLoader () {
      return this.$store.state.loading
    },
    errorMessage () {
      return this.$store.state.errorMessage
    }
  },
  methods: {
    toggleLoader (val) {
      this.$store.commit('toggleLoader', val)
    },
    getErrorHandler (val) {
      this.$store.commit('setErrorHandler', val)
    }
  }
}
