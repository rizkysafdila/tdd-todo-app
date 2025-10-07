<script setup lang="ts">
const title = ref<string>('')

const emit = defineEmits<{
  (e: 'add-todo', title: string): void
}>()

const handleSubmit = () => {
  if (title.value.trim()) {
    emit('add-todo', title.value.trim())
    title.value = ''
  }
}
</script>

<template>
  <form
    class="flex gap-2"
    @submit.prevent="handleSubmit"
  >
    <UInput
      v-model="title"
      placeholder="What needs to be done?"
      size="lg"
      class="flex-1"
    />
    <UButton
      type="submit"
      size="lg"
    >
      Add
    </UButton>
  </form>
</template>
