import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ShowSearch from '@/views/ShowSearch.vue'
import LoaderMixin from '@/mixins/loaderMixin'
import ShowsMockData from '../testdata/showsData'
import router from '@/router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin(LoaderMixin)
localVue.use(VueRouter)

const actions = {
  getShowSearchResults: jest.fn()
}

window.scrollTo = jest.fn()

const error = new Error("something bad happened")

const getters = {
  showSearchResults: () => ShowsMockData.searchData.data
}

const mutations = {
  toggleLoader: (state, value) => { state.loading = value },
  setErrorHandler: (state, value) => { state.errorMessage = value },
  getShowSearchData: (state, value) => { state.searchData = value }
}

const store = new Vuex.Store({
  state: {
    loading: false,
    errorMessage: null,
    searchData: []
  },
  getters,
  mutations,
  actions
})

describe('ShowSearch.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(ShowSearch, {
      localVue,
      store,
      router,
      stubs: ['data-not-found'],
      propsData: {
        searchText: ''
      }
    })
  })

  it('is a vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('should render the correct markup', () => {
    expect(wrapper.html()).toContain('<div class="show-search')
  })

  it('should load the page when loader off', async () => {
    mutations.toggleLoader(store.state, false)
    await wrapper.vm.pageLoader
    expect(wrapper.html()).toContain('<div class="show-search')
  })

  it('should not load the page when loader on', async () => {
    mutations.toggleLoader(store.state, true)
    await wrapper.vm.pageLoader
    expect(wrapper.html()).not.toContain('<div class="show-search')
  })

  it('should call getShowData to fetch show details', async () => {
    wrapper.vm.getShowSearchData()
    actions.getShowSearchResults.mockImplementation(() => Promise.resolve('data'))
    await mutations.getShowSearchData(store.state, 'data')

    expect(store.state.searchData).toBeTruthy()
  })

  it('should return an error on getShowData call fail', async () => {
    wrapper.vm.getShowSearchData()
    actions.getShowSearchResults.mockImplementation(() => Promise.reject(error))

    mutations.setErrorHandler(store.state, error.message)
    await mutations.getShowSearchData(store.state, null)

    expect(wrapper.vm.errorMessage).toEqual('something bad happened')
    expect(store.state.searchData).toBeFalsy()
  })

  it('should fetch show cast data ', () => {
    expect(wrapper.vm.showSearchResults).toEqual(ShowsMockData.searchData.data)
  })

  it('should call the getseach result if route query params same from prev and next search', async () => {
    const spy = jest.spyOn(wrapper.vm, 'getShowSearchData')

    const to = { name: 'Search', query: { q: 'temp' } }
    const from = { name: 'Search', query: { q: 'dummy' } }

    await wrapper.vm.$options.watch.$route.call(wrapper.vm, to, from)

    expect(spy).toBeCalled()
  })

  it('should not call the getseach result if route query params same from prev and next search', async () => {
    const spy = jest.spyOn(wrapper.vm, 'getShowSearchData')

    const to = { name: 'Search', query: { q: 'temp' } }
    const from = { name: 'Search', query: { q: 'temp' } }

    await wrapper.vm.$options.watch.$route.call(wrapper.vm, to, from)

    expect(spy).not.toBeCalled()
  })
})
