import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import LoaderMixin from '@/mixins/loaderMixin'
import GenreShows from '@/components/GenreShows.vue'

import ShowsMockData from '../testdata/showsData'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin(LoaderMixin)
const mutations = {
  toggleLoader: (state, value) => { state.loading = value }
}

const store = new Vuex.Store({
  state: {
    loading: false
  },
  mutations
})

const wrapperOptions = {
  localVue,
  store,
  propsData: {
    genre: 'Drama',
    shows: { Drama: [ShowsMockData.showDetails] },
    isHomePage: true
  },
  stubs: ['router-link']
}

describe('GenreShows.vue', () => {
  it('is a vue instance', () => {
    const wrapper = shallowMount(GenreShows, wrapperOptions)
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('should render the correct markup', () => {
    const wrapper = shallowMount(GenreShows, wrapperOptions)
    expect(wrapper.html()).toContain('<div class="genre-shows')
  })

  it('should add the class order-1', async () => {
    wrapperOptions.propsData.isHomePage = true
    const wrapper = shallowMount(GenreShows, wrapperOptions)

    await wrapper.vm.isHomePage
    const result = await wrapper.vm.displayShowOrder(1)

    expect(result['me-1 mb-1']).toBeTruthy()
  })

  it('should remove the class order-1', async () => {
    wrapperOptions.propsData.isHomePage = false
    const wrapper = shallowMount(GenreShows, wrapperOptions)

    await wrapper.vm.isHomePage

    const result = await wrapper.vm.displayShowOrder(1)
    expect(result['me-1 mb-1']).toBeFalsy()
  })

  it('should return genre based shows when genre sent is valid', async () => {
    wrapperOptions.propsData.genre = 'Drama'
    wrapperOptions.propsData.shows = { Drama: [ShowsMockData.showDetails] }
    const wrapper = shallowMount(GenreShows, wrapperOptions)

    await wrapper.vm.genre
    expect(wrapper.vm.showData).toEqual(wrapper.vm.shows.Drama)
  })

  it('should return all show list if genre "Popular"', async () => {
    wrapperOptions.propsData.genre = 'Popular'
    wrapperOptions.propsData.shows = [ShowsMockData.showDetails]
    const wrapper = shallowMount(GenreShows, wrapperOptions)

    await wrapper.vm.genre
    expect(wrapper.vm.showData).toEqual(wrapper.vm.shows)
  })

  it('should to return the list show when genre empty', async () => {
    wrapperOptions.propsData.genre = ''
    wrapperOptions.propsData.shows = [ShowsMockData.showDetails]
    const wrapper = shallowMount(GenreShows, wrapperOptions)

    await wrapper.vm.genre
    expect(wrapper.vm.showData).toEqual(wrapper.vm.shows)
  })
})
