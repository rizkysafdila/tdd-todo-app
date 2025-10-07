export interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

export interface TodoState {
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
}
