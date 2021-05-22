import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import HomePage from '@/views/HomePage.vue'
import LoaderMixin from '@/mixins/loaderMixin'
import ShowsMockData from '../testdata/showsData'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin(LoaderMixin)

const actions = {
  getShowsData: jest.fn()
}

const error = new Error("something bad happened")

const getters = {
  genreList: () => ShowsMockData.listGenre,
  popularShows: () => ShowsMockData.testShows,
  genreByShows: () => () => ShowsMockData.genreShows
}

const mutations = {
  toggleLoader: (state, value) => { state.loading = value },
  setErrorHandler: (state, value) => { state.errorMessage = value },
  getShows: (state, value) => { state.shows = value }
}

const store = new Vuex.Store({
  state: {
    shows: ShowsMockData.testShows,
    loading: false,
    errorMessage: null
  },
  getters,
  mutations,
  actions
})

describe('HomePage.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(HomePage, {
      localVue,
      store
    })
  })
  it('is a vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('should render the correct markup', () => {
    expect(wrapper.html()).toContain('<div class="home-page">')
  })

  it('should load the page when loader off', async () => {
    mutations.toggleLoader(store.state, false)
    await wrapper.vm.pageLoader
    expect(wrapper.html()).toContain('<div class="home-page">')
  })

  it('should not load the page while loader on', async () => {
    mutations.toggleLoader(store.state, true)
    await wrapper.vm.pageLoader
    expect(wrapper.html()).not.toContain('<div class="home-page">')
  })

  it('should call getShows to fetch shows data', async () => {
    wrapper.vm.getShows()
    actions.getShowsData.mockImplementation(() => Promise.resolve('data'))
    await mutations.getShows(store.state, 'data')

    expect(store.state.shows).toBeTruthy()
  })

  it('should return an error on getShows call fail', () => {
    wrapper.vm.getShows()
    actions.getShowsData.mockImplementation(() => Promise.reject(error))

    mutations.setErrorHandler(store.state, error.message)
    mutations.getShows(store.state, null)

    expect(wrapper.vm.errorMessage).toEqual('something bad happened')
    expect(store.state.shows).toBeFalsy()
  })

  it('shold get the popular shows', () => {
    expect(wrapper.vm.popularShows).toEqual(ShowsMockData.testShows)
  })

  it('should fetch genre based show', () => {
    expect(wrapper.vm.genreShowsData).toEqual(ShowsMockData.genreShows)
  })

  it('should fetch list genres', () => {
    expect(wrapper.vm.genreList).toEqual(ShowsMockData.listGenre)
  })
})
