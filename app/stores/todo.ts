import type { Todo, TodoState } from '~/types/todo'

export const useTodoStore = defineStore('todo', {
  state: (): TodoState => ({
    todos: [],
    filter: 'all'
  }),

  getters: {
    activeTodos: state => state.todos.filter(todo => !todo.completed),
    completedTodos: state => state.todos.filter(todo => todo.completed),
    filteredTodos: (state) => {
      switch (state.filter) {
        case 'active':
          return state.todos.filter(todo => !todo.completed)
        case 'completed':
          return state.todos.filter(todo => todo.completed)
        default:
          return state.todos
      }
    }
  },

  actions: {
    addTodo(title: string) {
      const todo: Todo = {
        id: crypto.randomUUID(),
        title,
        completed: false,
        createdAt: new Date()
      }
      this.todos.push(todo)
    },

    toggleTodo(id: string) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },

    deleteTodo(id: string) {
      const index = this.todos.findIndex(t => t.id === id)
      if (index !== -1) {
        this.todos.splice(index, 1)
      }
    },

    setFilter(filter: 'all' | 'active' | 'completed') {
      this.filter = filter
    }
  }
})
