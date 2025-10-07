<script setup lang="ts">
import type { Todo } from '~/types/todo'

defineProps<{
  todos: Todo[]
}>()

const emit = defineEmits<{
  toggle: [id: string]
  delete: [id: string]
}>()
</script>

<template>
  <div class="space-y-2">
    <div
      v-if="todos.length === 0"
      class="text-center py-8 text-gray-500"
    >
      No todos yet. Add one above!
    </div>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="emit('toggle', todo.id)"
      @delete="emit('delete', todo.id)"
    />
  </div>
</template>
