<script setup lang="ts">
const todoStore = useTodoStore()

const handleAddTodo = (title: string) => {
  todoStore.addTodo(title)
}

const handleToggleTodo = (id: string) => {
  todoStore.toggleTodo(id)
}

const handleDeleteTodo = (id: string) => {
  todoStore.deleteTodo(id)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-2xl mx-auto px-4">
      <UCard>
        <template #header>
          <h1 class="text-3xl font-bold">
            Todo App (TDD)
          </h1>
        </template>

        <div class="space-y-6">
          <TodoForm @add-todo="handleAddTodo" />

          <div class="flex gap-2">
            <UButton
              :variant="todoStore.filter === 'all' ? 'solid' : 'outline'"
              @click="todoStore.setFilter('all')"
            >
              All ({{ todoStore.todos.length }})
            </UButton>
            <UButton
              :variant="todoStore.filter === 'active' ? 'solid' : 'outline'"
              @click="todoStore.setFilter('active')"
            >
              Active ({{ todoStore.activeTodos.length }})
            </UButton>
            <UButton
              :variant="todoStore.filter === 'completed' ? 'solid' : 'outline'"
              @click="todoStore.setFilter('completed')"
            >
              Completed ({{ todoStore.completedTodos.length }})
            </UButton>
          </div>

          <TodoList
            :todos="todoStore.filteredTodos"
            @toggle="handleToggleTodo"
            @delete="handleDeleteTodo"
          />
        </div>
      </UCard>
    </div>
  </div>
</template>
