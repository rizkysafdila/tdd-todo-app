import { describe, it, expect, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { setActivePinia, createPinia } from 'pinia'
import TodoList from './TodoList.vue'

describe('TodoList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it.concurrent('should render empty state when no todos', async () => {
    const wrapper = await mountSuspended(TodoList, { props: { todos: [] } })
    expect(wrapper.text()).toContain('No todos yet')
  })

  it.concurrent('should render todos when available', async () => {
    const todos = [
      { id: '1', title: 'Todo 1', completed: false, createdAt: new Date() },
      { id: '2', title: 'Todo 2', completed: true, createdAt: new Date() }
    ]

    const wrapper = await mountSuspended(TodoList, {
      props: { todos }
    })

    expect(wrapper.text()).toContain('Todo 1')
    expect(wrapper.text()).toContain('Todo 2')
  })
})
