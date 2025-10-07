<script setup lang="ts">
import type { Todo } from '~/types/todo'

defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  toggle: []
  delete: []
}>()
</script>

<template>
  <div class="flex justify-between items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
    <UCheckbox
      id="completedToggle"
      :model-value="todo.completed"
      :label="todo.title"
      :ui="{
        label: todo.completed && 'line-through text-gray-400'
      }"
      @update:model-value="emit('toggle')"
    />
    <UButton
      id="deleteBtn"
      color="error"
      variant="ghost"
      icon="i-heroicons-trash"
      @click="emit('delete')"
    />
  </div>
</template>
