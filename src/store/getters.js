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
    const searchedShow = state.searchData.data.map((data) => data.show)
    return searchedShow.sort((a, b) => b.rating.average - a.rating.average)
  },
  genreList (state) {
    const genreList = state.shows.map((show) => show.genres)

    const finalGenre = genreList.reduce((finalList, genre) => [...finalList, ...genre], [])

    return [...new Set(finalGenre)]
  }
}
