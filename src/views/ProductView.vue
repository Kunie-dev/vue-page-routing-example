<script setup>
import { useProductStore } from '@/stores/product.js'
import { computed, watch } from 'vue'

const props = defineProps(['page'])
const page = computed(() => {
  const nanable = Number(props.page || '1')
  return isNaN(nanable) ? 1 : nanable
})

const productStore = useProductStore()

watch(
  page,
  async (newPage) => {
    await productStore.execute(newPage, 20)
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div>
    <h1>Product (Page = {{ page }})</h1>
    <p v-if="productStore.loading">Loading...</p>
    <p v-else-if="productStore.error">{{ productStore.error.message }}</p>
    <ul v-else>
      <li v-for="product in productStore.state" :key="`product-${product.id}`">
        {{ product.title }} / {{ product.price }}
      </li>
    </ul>
    <router-link :to="{ name: 'product', query: { page: page + 1 }, force: true }">
      Next
    </router-link>
  </div>
</template>
