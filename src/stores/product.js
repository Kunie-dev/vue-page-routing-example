import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
  const loading = ref(false)
  const error = ref(null)
  const state = ref([])

  async function execute(page, size) {
    if (loading.value) {
      return
    }
    loading.value = true
    error.value = null;

    try {
      const limit = size
      const skip = (page - 1) * size
      state.value =
        (
          await fetch(
            `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price`
          ).then((res) => res.json())
        ).products || []
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return { loading, state, error, execute }
})
