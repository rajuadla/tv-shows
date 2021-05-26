import showModule from '@/services/show'

export default {
  getShowsData ({ commit }) {
    return showModule.getShowsData().then((res) => {
      commit('getShows', res)
    })
  },

  getShowDetails ({ commit }, showid) {
    return showModule.getShowDetails(showid).then((res) => {
      commit('getShowDetailsById', res)
    })
  },

  getShowSearchResults ({ commit }, searchText) {
    return showModule.getShowSearchResults(searchText).then((res) => {
      commit('getShowSearchData', res)
    })
  },

  async getShowCastDetails ({ commit }, showid) {
    return showModule.getShowCastDetails(showid).then((res) => {
      commit('getShowCastData', res)
    })
  }
}
