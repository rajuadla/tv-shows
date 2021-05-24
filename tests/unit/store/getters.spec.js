import getters from '@/store/getters'
import ShowsTestData from '../testdata/showsData'

describe('In Show getters', () => {
  const state = {
    shows: ShowsTestData.testShows,
    searchData: ShowsTestData.searchData,
    showCastData: { data: ShowsTestData.castData }
  }

  const genreList = ['Drama', 'Action', 'Science-Fiction', 'Horror', 'Romance', 'Crime', 'Thriller']

  it('should call popularShows', () => {
    const result = getters.popularShows(state)
    expect(result).toEqual(state.shows)
  })

  it('should call showCastData', () => {
    const result = getters.showCastData(state)
    expect(result).toEqual(state.showCastData.data)
  })

  it('should call genreByShows', () => {
    const genres = ['Drama']
    const result = getters.genreByShows(state)(genres)
    const filterdData = state.shows
      .filter((show) => show.genres.find((gen) => String(gen).toLowerCase() === String('Drama').toLowerCase()))
    expect(result).toEqual({ Drama: filterdData })
  })

  it('should call showSearchResults', () => {
    const result = getters.showSearchResults(state)
    const finalRes = state.searchData.data.map((item) => item.show)
    expect(result).toEqual(finalRes)
  })

  it('should call genreList', () => {
    const result = getters.genreList(state)
    expect(result).toEqual(genreList)
  })
})
