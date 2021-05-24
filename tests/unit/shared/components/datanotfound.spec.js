import { shallowMount, createLocalVue } from '@vue/test-utils'
import DataNotFound from '@/shared/components/DataNotFound'

const localVue = createLocalVue()

describe('In ErrorHandler vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DataNotFound, {
      localVue
    })
  })
  it('is a vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('should render the correct markup', () => {
    expect(wrapper.html()).toContain('<div class="data-not-found')
  })
})
