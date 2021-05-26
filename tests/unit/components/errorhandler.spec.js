import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ErrorHandler from '@/components/ErrorHandler'

const localVue = createLocalVue()
localVue.use(Vuex)
const mutations = {
  setErrorHandler: (state, value) => { state.errorMessage = value }
}

const store = new Vuex.Store({
  state: {
    errorMessage: null
  },
  mutations
})

describe('In ErrorHandler vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(ErrorHandler, {
      localVue,
      store,
      propsData: {
        message: 'error'
      },
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    })
  })
  it('is a vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('should render the correct markup', () => {
    expect(wrapper.html()).toContain('<div class="error-handler')
  })

  it('should navigate to the home when home button clicked', async () => {
    await wrapper.find('button').trigger('click')
    wrapper.vm.goTo()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'Home' })
  })
})
