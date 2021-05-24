import { shallowMount, createLocalVue } from '@vue/test-utils'
import ErrorHandler from '@/components/ErrorHandler'

const localVue = createLocalVue()

describe('In ErrorHandler vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(ErrorHandler, {
      localVue,
      propsData: {
        message: 'error'
      }
    })
  })
  it('is a vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('should render the correct markup', () => {
    expect(wrapper.html()).toContain('<div class="error-handler')
  })
})
