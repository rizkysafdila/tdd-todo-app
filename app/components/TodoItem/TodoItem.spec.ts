import { describe, it, expect, beforeAll } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import TodoItem from './TodoItem.vue'
import type { Todo } from '~/types/todo'
import type { VueWrapper } from '@vue/test-utils'

const mockTodo: Todo = {
  id: '1',
  title: 'Test todo',
  completed: false,
  createdAt: new Date()
}

describe('TodoItem', () => {
  let wrapper: VueWrapper<InstanceType<typeof TodoItem>>
  beforeAll(async () => {
    wrapper = await mountSuspended(TodoItem, {
      props: { todo: mockTodo }
    })
  })

  it('should render todo title', async () => {
    expect(wrapper.text()).toContain('Test todo')
  })

  it('should emit toggle event when checkbox is clicked', async () => {
    const checkbox = wrapper.find('#completedToggle')
    await checkbox.trigger('click')

    expect(wrapper.emitted('toggle')).toBeTruthy()
  })

  it('should emit delete event when delete button is clicked', async () => {
    const deleteBtn = wrapper.find('#deleteBtn')
    await deleteBtn.trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
  })

  it('should apply line-through style for completed todos', async () => {
    const completedTodo = { ...mockTodo, completed: true }
    const wrapper = await mountSuspended(TodoItem, {
      props: { todo: completedTodo }
    })

    expect(wrapper.find('.line-through').exists()).toBe(true)
  })
})
