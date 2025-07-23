import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useTodosStore = defineStore('todo', () => {
  const todos = ref([])
  const todo = ref([])
  const error = ref(null)
  const loading = ref(false)

  const currentPage = ref(1)
  const lastPage = ref(1)
  const perPage = ref(10)
  const total = ref(0)
  const hasMorePages = ref(false)

  const setPagination = (data = {}) => {
    currentPage.value = data.current_page || 1
    lastPage.value = data.last_page || 1
    perPage.value = data.per_page || 10
    total.value = data.total || 0
    hasMorePages.value = (data.current_page || 1) < (data.last_page || 1)
  }

  async function fetchTodos(page = 1) {
    try {
      loading.value = true
      const { data } = await axios.get(`/todo?page=${page}`)
      todos.value = data.todos.data || []
      setPagination(data.todos)
    } catch (err) {
      error.value = 'Failed to fetch todos'
    } finally {
      loading.value = false
    }
  }

  async function addTodoItem(storeTodoData) {
    error.value = null
    loading.value = true
    try {
      const { data } = await axios.post('/todo', storeTodoData)
      todo.value = data.todos

      // Update pagination and todos array efficiently
      total.value += 1

      // If we're on the last page and have space, add the new item
      if (currentPage.value === lastPage.value && todos.value.length < perPage.value) {
        todos.value.push(data.todos)
      }

      // Recalculate last page based on new total
      lastPage.value = Math.ceil(total.value / perPage.value)
      hasMorePages.value = currentPage.value < lastPage.value
    } catch (err) {
      error.value = 'Failed to add todo item'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateTodoItem(updateTodoData) {
    error.value = null
    loading.value = true
    try {
      const { data } = await axios.put('/todo', updateTodoData)
      todo.value = data.todos

      const newTodo = data.todos

      if (newTodo) {
        const index = todos.value.findIndex((b) => b.id === newTodo.id)
        if (index !== -1) todos.value[index] = newTodo
      }
    } catch (error) {
      error.value = 'Failed to add todo item'
    } finally {
      loading.value = false
    }
  }

  async function deleteTodoItem(id) {
    error.value = null
    loading.value = true
    try {
      await axios.delete(`/todo/${id}`)

      // Remove from current todos array
      todos.value = todos.value.filter((todo) => todo.id !== id)
      total.value -= 1

      // Recalculate pagination
      lastPage.value = Math.ceil(total.value / perPage.value) || 1
      hasMorePages.value = currentPage.value < lastPage.value

      // If current page is now empty and we're not on page 1, we might need to go back
      return {
        shouldGoToPreviousPage: todos.value.length === 0 && currentPage.value > 1,
        newPage: currentPage.value - 1,
      }
    } catch (error) {
      error.value = 'Failed to delete todo item'
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    todos,
    error,
    loading,
    fetchTodos,
    addTodoItem,
    updateTodoItem,
    deleteTodoItem,
    currentPage,
    lastPage,
    perPage,
    total,
    hasMorePages,
  }
})
