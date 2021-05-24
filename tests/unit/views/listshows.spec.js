import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ListShows from '@/views/ListShows.vue'
import LoaderMixin from '@/mixins/loaderMixin'
import ShowsMockData from '../testdata/showsData'
import router from '@/router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.mixin(LoaderMixin)

const actions = {
  getShowsData: jest.fn()
}

window.scrollTo = jest.fn()

const error = new Error("something bad happened")

const getters = {
  genreList: () => ShowsMockData.listGenre,
  genreByShows: () => () => ShowsMockData.genreShows.Drama
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

describe('ListShows.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(ListShows, {
      localVue,
      store,
      router,
      stubs: ['data-not-found'],
      propsData: {
        genre: 'Drama'
      }
    })
  })

  it('is a vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('should render the correct markup', () => {
    expect(wrapper.html()).toContain('<div class="list-shows')
  })

  it('should load the page when loader off', async () => {
    mutations.toggleLoader(store.state, false)
    await wrapper.vm.pageLoader
    expect(wrapper.html()).toContain('<div class="list-shows')
  })

  it('should not load the page when loader on', async () => {
    mutations.toggleLoader(store.state, true)
    await wrapper.vm.pageLoader
    expect(wrapper.html()).not.toContain('<div class="list-shows')
  })

  it('should call getShows to fetch shows data', async () => {
    wrapper.vm.getShows()
    actions.getShowsData.mockImplementation(() => Promise.resolve('data'))
    await mutations.getShows(store.state, 'data')

    expect(store.state.shows).toBeTruthy()
  })

  it('should return an error on getShows call fail', async () => {
    wrapper.vm.getShows()
    actions.getShowsData.mockImplementation(() => Promise.reject(error))

    mutations.setErrorHandler(store.state, error.message)
    await mutations.getShows(store.state, null)

    expect(wrapper.vm.errorMessage).toEqual('something bad happened')
    expect(store.state.shows).toBeFalsy()
  })

  it('should fetch list genres', () => {
    expect(wrapper.vm.genreList).toEqual(ShowsMockData.listGenre)
  })

  it('should fetch genre based show', () => {
    expect(wrapper.vm.showData).toEqual(ShowsMockData.genreShows[wrapper.vm.genre])
  })
})
