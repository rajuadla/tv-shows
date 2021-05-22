export default {
  popularShows (state) {
    return state.shows.slice(0, 6)
  },
  showCastData (state) {
    return state.showCastData.data
  },
  genreByShows: (state) => (genres) => {
    const genreShows = {}

    for (const genre of genres) {
      genreShows[genre] = state.shows
        .filter((show) => show.genres.find((gen) => String(gen).toLowerCase() === String(genre).toLowerCase()))
    }
    return genreShows
  },
  showSearchResults (state) {
    const searchedShows = []

    if (state.searchData.data) {
      for (const data of state.searchData.data) {
        searchedShows.push(data.show)
      }
    }

    return searchedShows
  },
  genreList (state) {
    let finalGenre = []
    const genreList = state.shows.map((show) => show.genres)

    for (const genre of genreList) {
      finalGenre = [...genre, ...finalGenre]
    }
    return [...new Set(finalGenre)]
  }
}
