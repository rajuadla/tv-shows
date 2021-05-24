import { shallowMount } from '@vue/test-utils'
import PageFooter from '@/shared/components/PageFooter.vue'

describe('PageFooter.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(PageFooter)
  })

  it('is a vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('should render the correct markup', () => {
    expect(wrapper.html()).toContain('<div class="page-footer')
  })
})
