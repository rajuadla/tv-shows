import actions from '@/store/actions'
import services from '@/services/show'

jest.mock('@/services/show')

describe('Show actions', () => {
  const commit = jest.fn()

  it('should resolved the getShowsData call', async () => {
    services.getShowsData.mockImplementation(() => Promise.resolve('data'))
    await actions.getShowsData({ commit })
    expect(commit).toHaveBeenCalledWith('getShows', 'data')
  })

  it('should reject the getShowsData call', async () => {
    services.getShowsData.mockImplementation(() => Promise.reject(new Error('error')))
    await expect(actions.getShowsData({ commit })).rejects.toThrow('error')
  })

  it('should resolved the getShowDetails call', async () => {
    services.getShowDetails.mockImplementation(() => Promise.resolve('data'))
    await actions.getShowDetails({ commit })
    expect(commit).toHaveBeenCalledWith('getShowDetailsById', 'data')
  })

  it('should reject the getShowDetails call', async () => {
    services.getShowDetails.mockImplementation(() => Promise.reject(new Error('error')))
    await expect(actions.getShowDetails({ commit })).rejects.toThrow('error')
  })

  it('should resolved the getShowSearchResults call', async () => {
    services.getShowSearchResults.mockImplementation(() => Promise.resolve('data'))
    await actions.getShowSearchResults({ commit })
    expect(commit).toHaveBeenCalledWith('getShowSearchData', 'data')
  })

  it('should reject the getShowSearchResults call', async () => {
    services.getShowSearchResults.mockImplementation(() => Promise.reject(new Error('error')))
    await expect(actions.getShowSearchResults({ commit })).rejects.toThrow('error')
  })

  it('should resolved the getShowCastDetails call', async () => {
    services.getShowCastDetails.mockImplementation(() => Promise.resolve('data'))
    await actions.getShowCastDetails({ commit })
    expect(commit).toHaveBeenCalledWith('getShowCastData', 'data')
  })

  it('should reject the getShowCastDetails call', async () => {
    services.getShowCastDetails.mockImplementation(() => Promise.reject(new Error('error')))
    await expect(actions.getShowCastDetails({ commit })).rejects.toThrow('error')
  })
})
