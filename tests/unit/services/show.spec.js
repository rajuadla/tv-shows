import axios from 'axios'
import ShowServices from '@/services/show'

jest.mock('axios', () => ({
  get: jest.fn()
}))

describe('In Show sevices', () => {
  const baseUrl = 'http://api.tvmaze.com'
  const showid = 1
  const searchText = 'wire'

  it('should call getShowsData', async () => {
    axios.get.mockImplementation(() => Promise.resolve('data'))
    const res = await ShowServices.getShowsData()

    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/show`)
    expect(res).toEqual('data')
  })

  it('should reject the getShowsData call', async () => {
    axios.get.mockReturnValue(Promise.reject(new Error('error')))
    await expect(ShowServices.getShowsData()).rejects.toThrow('error')
  })

  it('should call getShowDetails', async () => {
    axios.get.mockImplementation(() => Promise.resolve('data'))
    const res = await ShowServices.getShowDetails(showid)

    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/shows/${showid}`)
    expect(res).toEqual('data')
  })

  it('should reject the getShowDetails call', async () => {
    axios.get.mockReturnValue(Promise.reject(new Error('error')))
    await expect(ShowServices.getShowDetails(showid)).rejects.toThrow('error')
  })

  it('should call getShowSearchResults', async () => {
    axios.get.mockImplementation(() => Promise.resolve('data'))
    const res = await ShowServices.getShowSearchResults(searchText)

    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/search/shows?q=${searchText}`)
    expect(res).toEqual('data')
  })

  it('should reject the getShowSearchResults call', async () => {
    axios.get.mockReturnValue(Promise.reject(new Error('error')))
    await expect(ShowServices.getShowSearchResults(searchText)).rejects.toThrow('error')
  })

  it('should call getShowCastDetails', async () => {
    axios.get.mockImplementation(() => Promise.resolve('data'))
    const res = await ShowServices.getShowCastDetails(showid)

    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/shows/${showid}/cast`)
    expect(res).toEqual('data')
  })

  it('should reject the getShowSearchResults call', async () => {
    axios.get.mockReturnValue(Promise.reject(new Error('error')))
    await expect(ShowServices.getShowCastDetails(showid)).rejects.toThrow('error')
  })
})
