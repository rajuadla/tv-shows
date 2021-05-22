import axios from 'axios'

const baseURL = 'http://api.tvmaze.com'

export default {
  getShowsData () {
    return axios.get(`${baseURL}/show`)
  },

  getShowDetails (showid) {
    return axios.get(`${baseURL}/shows/${showid}`)
  },

  getShowSearchResults (searchText) {
    return axios.get(`${baseURL}/search/shows?q=${searchText}`)
  },

  getShowCastDetails (showid) {
    return axios.get(`${baseURL}/shows/${showid}/cast`)
  }
}
