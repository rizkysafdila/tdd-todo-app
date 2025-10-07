import { describe, it, expect, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import TodoForm from './TodoForm.vue'
import type { VueWrapper } from '@vue/test-utils'

describe('TodoForm', () => {
  let wrapper: VueWrapper<InstanceType<typeof TodoForm>>
  beforeEach(async () => {
    wrapper = await mountSuspended(TodoForm)
  })

  it('should render input field', async () => {
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('should emit add-todo event with input value', async () => {
    const input = wrapper.find('input')

    await input.setValue('New todo')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('add-todo')).toBeTruthy()
    expect(wrapper.emitted('add-todo')?.[0]).toEqual(['New todo'])
  })

  it('should clear input after submission', async () => {
    const input = wrapper.find('input')

    await input.setValue('New todo')
    await wrapper.find('form').trigger('submit')

    expect((input.element as HTMLInputElement).value).toBe('')
  })

  it('should not emit event with empty input', async () => {
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('add-todo')).toBeFalsy()
  })
})
