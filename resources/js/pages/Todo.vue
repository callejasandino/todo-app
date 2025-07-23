<template>
  <v-app>
    <v-main class="bg-grey-lighten-4">
      <v-container class="py-8" max-width="800">
        <v-card class="add-todo-card mb-6" elevation="3">
          <v-card-title class="bg-gradient-primary text-white pa-4">
            <div class="d-flex align-center">
              <PlusIcon v-if="!form.id" class="me-3" style="width: 20px; height: 20px" />
              <PencilIcon v-else class="me-3" style="width: 20px; height: 20px" />
              <span class="text-h6">{{ form.id ? 'Edit Todo' : 'Add New Todo' }}</span>
            </div>
          </v-card-title>
          <v-card-text class="pa-6">
            <v-form ref="formRef" @submit.prevent="onSubmit">
              <v-text-field v-model="form.title" label="Title" :disabled="isLoading" required :rules="titleRules" class="mb-3" variant="outlined" prepend-inner-icon="mdi-format-title" />
              <v-text-field v-model="form.description" label="Description" :disabled="isLoading" :rules="descriptionRules" class="mb-3" variant="outlined" prepend-inner-icon="mdi-text" />
              <v-select v-model="form.status" :items="statusOptions" label="Status" :disabled="isLoading" required :rules="statusRules" class="mb-4" variant="outlined" prepend-inner-icon="mdi-flag" />
              <div class="d-flex gap-3">
                <v-btn :loading="isLoading" color="primary" type="submit" size="large" class="px-6">
                  <PlusIcon v-if="!form.id" class="me-2" style="width: 18px; height: 18px" />
                  <PencilIcon v-else class="me-2" style="width: 18px; height: 18px" />
                  {{ form.id ? 'Update Todo' : 'Add Todo' }}
                </v-btn>
                <v-btn v-if="form.id" color="grey" size="large" @click="resetForm" :disabled="isLoading" variant="outlined" class="px-6"> Cancel </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>

        <v-card class="todo-list-card">
          <v-card-title class="bg-primary text-white pa-4">
            <div class="d-flex align-center">
              <DocumentIcon class="me-3" style="width: 24px; height: 24px" />
              <span class="text-h6">Todo List</span>
            </div>
          </v-card-title>
          <v-data-table :headers="headers" :items="todos" :loading="isLoading" loading-text="Loading todos..." class="elevation-0" item-key="id">
            <template #item.status="{ item }">
              <v-chip :color="getStatusColor(item.status)" :text-color="getStatusTextColor(item.status)" size="small" variant="flat">
                {{ transformStatus(item.status) }}
              </v-chip>
            </template>
            <template #item.title="{ item }">
              <div :class="{ 'text-decoration-line-through text-grey': item.status === 'completed' }">
                {{ item.title }}
              </div>
            </template>
            <template #item.description="{ item }">
              <div :class="{ 'text-decoration-line-through text-grey': item.status === 'completed' }">
                {{ item.description }}
              </div>
            </template>
            <template #item.actions="{ item }">
              <v-btn icon size="small" @click="editTodo(item)" :disabled="isLoading" color="primary" variant="text">
                <PencilIcon style="width: 18px; height: 18px" />
                <v-tooltip activator="parent" location="top">Edit Todo</v-tooltip>
              </v-btn>
              <v-btn icon size="small" @click="deleteTodo(item.id)" :disabled="isLoading" color="error" variant="text">
                <TrashIcon style="width: 18px; height: 18px" />
                <v-tooltip activator="parent" location="top">Delete Todo</v-tooltip>
              </v-btn>
            </template>
            <template #no-data>
              <div class="text-center pa-8">
                <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-clipboard-text-outline</v-icon>
                <div class="text-h6 text-grey-darken-1 mb-2">No todos yet</div>
                <div class="text-body-2 text-grey">Start by adding your first todo above!</div>
              </div>
            </template>
          </v-data-table>
          <v-row justify="center" class="pa-4">
            <v-pagination v-model="page" :length="todosStore.lastPage" :total-visible="5" :disabled="isLoading" />
          </v-row>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useTodosStore } from '../store/todo.js'
import { showToast } from '../composables/useToast'
import { TrashIcon, PencilIcon, PlusIcon, DocumentIcon } from '@heroicons/vue/24/outline'

const todosStore = useTodosStore()
const isLoading = ref(false)
const todos = ref([])
const formRef = ref(null)
const form = ref({
  id: null,
  title: '',
  description: '',
  status: '',
})
const page = ref(1)

const statusOptions = [
  { title: 'Pending', value: 'pending' },
  { title: 'In Progress', value: 'in_progress' },
  { title: 'Completed', value: 'completed' },
]

// Form validation rules
const titleRules = [(v) => !!v || 'Title is required', (v) => (v && v.length >= 3) || 'Title must be at least 3 characters', (v) => (v && v.length <= 100) || 'Title must be less than 100 characters']

const descriptionRules = [(v) => !v || v.length <= 500 || 'Description must be less than 500 characters']

const statusRules = [(v) => !!v || 'Status is required']

const headers = [
  { title: 'ID', value: 'id', sortable: false, width: '80px' },
  { title: 'Title', value: 'title', width: '25%' },
  { title: 'Description', value: 'description', width: '35%' },
  { title: 'Status', value: 'status', width: '20%' },
  { title: 'Actions', value: 'actions', sortable: false, width: '20%' },
]

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'success'
    case 'in_progress':
      return 'info'
    case 'pending':
      return 'warning'
    default:
      return 'grey'
  }
}

const getStatusTextColor = (status) => {
  return 'white'
}

const fetchTodos = async (p = 1) => {
  isLoading.value = true
  await todosStore.fetchTodos(p)
  todos.value = Array.isArray(todosStore.todos) ? todosStore.todos : []
  isLoading.value = false
}

const onSubmit = async () => {
  // Validate form before submission
  const { valid } = await formRef.value.validate()
  if (!valid) {
    showToast('Please fix the validation errors', 'error')
    return
  }

  isLoading.value = true
  try {
    if (form.value.id) {
      await todosStore.updateTodoItem(form.value)
      showToast('Todo updated successfully!', 'success')
    } else {
      await todosStore.addTodoItem(form.value)
      showToast('Todo added successfully!', 'success')
    }
    resetForm()
  } catch (error) {
    showToast('An error occurred. Please try again.', 'error')
  } finally {
    isLoading.value = false
  }
}

const editTodo = (item) => {
  form.value = { ...item }
}

const deleteTodo = async (id) => {
  isLoading.value = true
  try {
    const result = await todosStore.deleteTodoItem(id)
    showToast('Todo deleted successfully!', 'success')

    // Handle page navigation if current page becomes empty
    if (result && result.shouldGoToPreviousPage) {
      page.value = result.newPage
      await fetchTodos(page.value)
    }
  } catch (error) {
    showToast('Failed to delete todo', 'error')
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  form.value = { id: null, title: '', description: '', status: '' }
  // Reset form validation
  if (formRef.value) {
    formRef.value.resetValidation()
  }
}

const transformStatus = (status) => {
  switch (status) {
    case 'pending':
      return 'Pending'
    case 'in_progress':
      return 'In Progress'
    case 'completed':
      return 'Completed'
    default:
      return status
  }
}

watch(
  () => todosStore.error,
  (newValue) => {
    showToast(newValue, 'error')
  },
)

watch(
  () => todosStore.todos,
  (newValue) => {
    todos.value = newValue || []
  },
)

onMounted(() => fetchTodos(page.value))

watch(page, (newPage, oldPage) => {
  if (newPage !== oldPage) {
    fetchTodos(newPage)
  }
})
</script>

<style src="../../css/todo.scss" lang="scss" scoped></style>
