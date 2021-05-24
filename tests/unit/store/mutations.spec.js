import mutations from '@/store/mutations'
import ShowsMockData from '../testdata/showsData'

describe('In show mutations', () => {
  let state
  beforeEach(() => {
    state = {
      shows: [],
      showDetails: [],
      searchData: [],
      showCastData: [],
      loading: false,
      errorMessage: null
    }
  })

  it('should mutate shows', () => {
    mutations.getShows(state, { data: ShowsMockData.testShows })
    expect(state.shows).toEqual(ShowsMockData.testShows)
  })

  it('should mutate show details', () => {
    mutations.getShowDetailsById(state, ShowsMockData.showDetails)
    expect(state.showDetails).toEqual(ShowsMockData.showDetails)
  })

  it('should mutate show search data', () => {
    mutations.getShowSearchData(state, ShowsMockData.searchData)
    expect(state.searchData).toEqual(ShowsMockData.searchData)
  })

  it('should mutate show cast data', () => {
    mutations.getShowCastData(state, ShowsMockData.castData)
    expect(state.showCastData).toEqual(ShowsMockData.castData)
  })

  it('should mutate loading value', () => {
    mutations.toggleLoader(state, true)
    expect(state.loading).toBeTruthy()
  })

  it('should mutate error message', () => {
    mutations.setErrorHandler(state, 'somthing bad happened')
    expect(state.errorMessage).toEqual('somthing bad happened')
  })
})
