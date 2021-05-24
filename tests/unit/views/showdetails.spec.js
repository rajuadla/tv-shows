import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ShowDetails from '@/views/ShowDetails.vue'
import LoaderMixin from '@/mixins/loaderMixin'
import ShowsMockData from '../testdata/showsData'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin(LoaderMixin)

const actions = {
  getShowDetails: jest.fn(),
  getShowCastDetails: jest.fn()
}

const error = new Error("something bad happened")

window.scrollTo = jest.fn()

const getters = {
  showCastData: () => ShowsMockData.castData
}

const mutations = {
  toggleLoader: (state, value) => { state.loading = value },
  setErrorHandler: (state, value) => { state.errorMessage = value },
  getShowDetailsById: (state, value) => { state.showDetails = value },
  getShowCastData: (state, value) => { state.showCastData = value }
}

const store = new Vuex.Store({
  state: {
    loading: false,
    errorMessage: null,
    showDetails: ShowsMockData.showDetails,
    showCastData: ShowsMockData.castData
  },
  getters,
  mutations,
  actions
})

describe('ShowDetails.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(ShowDetails, {
      localVue,
      store,
      stubs: ['data-not-found'],
      propsData: {
        showid: 1
      }
    })
  })

  it('is a vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('should render the correct markup', () => {
    expect(wrapper.html()).toContain('<div class="show-details')
  })

  it('should load the page when loader off', async () => {
    mutations.toggleLoader(store.state, false)
    await wrapper.vm.pageLoader
    expect(wrapper.html()).toContain('<div class="show-details')
  })

  it('should not load the page when loader on', async () => {
    mutations.toggleLoader(store.state, true)
    await wrapper.vm.pageLoader
    expect(wrapper.html()).not.toContain('<div class="show-details')
  })

  it('should call getShowData to fetch show details', async () => {
    wrapper.vm.getShowData()
    actions.getShowDetails.mockImplementation(() => Promise.resolve('data'))
    await mutations.getShowDetailsById(store.state, 'data')

    expect(store.state.showDetails).toBeTruthy()
  })

  it('should return an error on getShowData call fail', async () => {
    wrapper.vm.getShowData()
    actions.getShowDetails.mockImplementation(() => Promise.reject(error))

    mutations.setErrorHandler(store.state, error.message)
    await mutations.getShowDetailsById(store.state, null)

    expect(wrapper.vm.errorMessage).toEqual('something bad happened')
    expect(store.state.showDetails).toBeFalsy()
  })

  it('should call getShowCastData to fetch show cast data', async () => {
    wrapper.vm.getShowCastData()
    actions.getShowCastDetails.mockImplementation(() => Promise.resolve('data'))
    await mutations.getShowCastData(store.state, 'data')

    expect(store.state.showCastData).toBeTruthy()
  })

  it('should return an error on getShowCastData call fail', async () => {
    wrapper.vm.getShowCastData()
    actions.getShowCastDetails.mockImplementation(() => Promise.reject(error))

    mutations.setErrorHandler(store.state, error.message)
    await mutations.getShowCastData(store.state, null)

    expect(wrapper.vm.errorMessage).toEqual('something bad happened')
    expect(store.state.showCastData).toBeFalsy()
  })

  it('should fetch show cast data ', () => {
    expect(wrapper.vm.showCastData).toEqual(ShowsMockData.castData)
  })

  it('should fetch the show details', async () => {
    await mutations.getShowDetailsById(store.state, { data: ShowsMockData.showDetails })

    expect(wrapper.vm.showData).toEqual(ShowsMockData.showDetails)
  })

  it('should fetch the show details for show id = 1', () => {
    const validData = wrapper.vm.showData.id === wrapper.vm.showid

    expect(validData).toBeTruthy()
  })
})
