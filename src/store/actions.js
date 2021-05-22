import showModule from '@/services/show'

export default {
  async getShowsData ({ commit }) {
    try {
      const showData = await showModule.getShowsData()
      commit('getShows', showData)
    } catch (err) {
      const error = new Error(err.message)
      throw error
    }
  },

  async getShowDetails ({ commit }, showid) {
    try {
      const showDetails = await showModule.getShowDetails(showid)
      commit('getShowDetailsById', showDetails)
    } catch (err) {
      const error = new Error(err.message)
      throw error
    }
  },

  async getShowSearchResults ({ commit }, searchText) {
    try {
      const showSearchData = await showModule.getShowSearchResults(searchText)
      commit('getShowSearchData', showSearchData)
    } catch (err) {
      const error = new Error(err.message)
      throw error
    }
  },

  async getShowCastDetails ({ commit }, showid) {
    try {
      const showCastData = await showModule.getShowCastDetails(showid)
      commit('getShowCastData', showCastData)
    } catch (err) {
      const error = new Error(err.message)
      throw error
    }
  }
}
