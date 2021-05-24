import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import PageHeader from '@/shared/components/PageHeader.vue'
import ShowsMockData from '../../testdata/showsData'
import LoaderMixin from '@/mixins/loaderMixin'

import router from '@/router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(BootstrapVue)
localVue.mixin(LoaderMixin)
const actions = {
  getShowsData: jest.fn()
}

window.scrollTo = jest.fn()

const error = new Error("something bad happened")

const getters = {
  genreList: () => ShowsMockData.listGenre
}

const mutations = {
  setErrorHandler: (state, value) => { state.errorMessage = value },
  getShows: (state, payload) => { state.shows = payload }
}

const store = new Vuex.Store({
  state: {
    shows: ShowsMockData.testShows,
    errorMessage: null
  },
  getters,
  mutations,
  actions
})

describe('PageHeader.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(PageHeader, {
      localVue,
      store,
      router,
      data () {
        return {
          searchText: ''
        }
      },
      stubs: ['router-link']
    })
  })

  it('is a vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('should render the correct markup', () => {
    expect(wrapper.html()).toContain('<div class="page-header')
  })

  it('should call getShowData to fetch show details', async () => {
    wrapper.vm.getShowData()
    actions.getShowsData.mockImplementation(() => Promise.resolve('data'))
    await mutations.getShows(store.state, 'data')

    expect(store.state.shows).toBeTruthy()
  })

  it('should return an error on getShowData call fail', async () => {
    wrapper.vm.getShowData()
    actions.getShowsData.mockImplementation(() => Promise.reject(error))
    mutations.setErrorHandler(store.state, error.message)
    await mutations.getShows(store.state, null)

    expect(wrapper.vm.errorMessage).toEqual('something bad happened')
    expect(store.state.shows).toBeFalsy()
  })

  it('should fetch the genre list', () => {
    expect(wrapper.vm.genres).toEqual(ShowsMockData.listGenre)
  })

  it('should navigate to search page with search text', async () => {
    const routerPushSpy = jest.spyOn(router, 'push')
    await wrapper.find('b-button-stub').trigger('click')

    expect(routerPushSpy).toHaveBeenCalledWith({ name: 'Search', query: { q: wrapper.vm.searchText } })
  })
})
