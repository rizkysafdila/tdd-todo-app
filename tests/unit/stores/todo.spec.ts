import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from '../../../app/stores/todo'

describe('Todo Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with empty todos', () => {
    const store = useTodoStore()
    expect(store.todos).toEqual([])
  })

  it('should add a new todo', () => {
    const store = useTodoStore()
    store.addTodo('Test todo')

    expect(store.todos).toHaveLength(1)
    expect(store.todos[0].title).toBe('Test todo')
    expect(store.todos[0].completed).toBe(false)
  })

  it('should toggle todo completion', () => {
    const store = useTodoStore()
    store.addTodo('Test todo')
    const todoId = store.todos[0].id

    store.toggleTodo(todoId)
    expect(store.todos[0].completed).toBe(true)

    store.toggleTodo(todoId)
    expect(store.todos[0].completed).toBe(false)
  })

  it('should delete a todo', () => {
    const store = useTodoStore()
    store.addTodo('Test todo')
    const todoId = store.todos[0].id

    store.deleteTodo(todoId)
    expect(store.todos).toHaveLength(0)
  })

  it('should filter active todos', () => {
    const store = useTodoStore()
    store.addTodo('Active todo')
    store.addTodo('Completed todo')
    store.toggleTodo(store.todos[1].id)

    const active = store.activeTodos
    expect(active).toHaveLength(1)
    expect(active[0].title).toBe('Active todo')
  })

  it('should filter completed todos', () => {
    const store = useTodoStore()
    store.addTodo('Active todo')
    store.addTodo('Completed todo')
    store.toggleTodo(store.todos[1].id)

    const completed = store.completedTodos
    expect(completed).toHaveLength(1)
    expect(completed[0].title).toBe('Completed todo')
  })

  it('should return filtered todos based on filter state', () => {
    const store = useTodoStore()
    store.addTodo('Todo 1')
    store.addTodo('Todo 2')
    store.toggleTodo(store.todos[0].id)

    store.setFilter('all')
    expect(store.filteredTodos).toHaveLength(2)

    store.setFilter('active')
    expect(store.filteredTodos).toHaveLength(1)

    store.setFilter('completed')
    expect(store.filteredTodos).toHaveLength(1)
  })
})
