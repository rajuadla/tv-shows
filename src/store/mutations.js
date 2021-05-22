export default {
  getShows (state, payload) {
    state.shows = payload.data
      .sort((a, b) => b.rating.average - a.rating.average)
  },
  getShowDetailsById (state, payload) {
    state.showDetails = payload
  },
  getShowSearchData (state, payload) {
    state.searchData = payload
  },
  getShowCastData (state, payload) {
    state.showCastData = payload
  },
  toggleLoader (state, payload) {
    state.loading = payload
  },
  setErrorHandler (state, payload) {
    state.errorMessage = payload
  }
}
