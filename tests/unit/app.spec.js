import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import LoaderMixin from '@/mixins/loaderMixin'
import App from '@/App.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(BootstrapVue)
localVue.mixin(LoaderMixin)

const mutations = {
  toggleLoader: (state, value) => { state.loading = value },
  setErrorHandler: (state, value) => { state.errorMessage = value }
}

const store = new Vuex.Store({
  state: {
    loading: false,
    errorMessage: null
  },
  mutations
})

window.scrollTo = jest.fn()

describe('ShowSearch.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(App, {
      localVue,
      store,
      stubs: ['router-view', 'page-header', 'page-footer', 'error-handler'],
      data () {
        return {
          scrollHight: 10
        }
      }
    })
  })

  it('is a vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('should render the correct markup', () => {
    expect(wrapper.html()).toContain('<div id="app">')
  })

  it('should not load the page loading', async () => {
    mutations.toggleLoader(store.state, true)
    await wrapper.vm.pageLoader

    expect(wrapper.html()).toContain('b-spinner-stub')
  })

  it('should load the page loading', async () => {
    mutations.toggleLoader(store.state, false)
    await wrapper.vm.pageLoader

    expect(wrapper.html()).not.toContain('b-spinner-stub')
  })

  it('should not load the error handler', async () => {
    mutations.setErrorHandler(store.state, '')
    await wrapper.vm.errorMessage

    expect(wrapper.html()).toContain('router-view')
    expect(wrapper.html()).not.toContain('error-handler')
  })

  it('should load the error handler', async () => {
    mutations.setErrorHandler(store.state, 'something bad happened')
    await wrapper.vm.errorMessage

    expect(wrapper.html()).not.toContain('router-view')
    expect(wrapper.html()).toContain('error-handler')
  })

  it('should display scroll to button on scroll hight >200', async () => {
    await wrapper.vm.handleScroll()
    wrapper.setData({ scrollHight: 500 })
    await wrapper.vm.scrollHight
    expect(wrapper.html()).toContain('scroll-to-top')
  })

  it('should scroll', async () => {
    const spy = jest.spyOn(window, 'scrollTo')

    await wrapper.vm.scrollTop()
    expect(spy).toHaveBeenCalled()
  })

  it('should destoy the wrapper', () => {
    wrapper.destroy()
  })
})
