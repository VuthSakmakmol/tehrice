import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  // Add product to cart
  const addItem = (product) => {
    const existing = items.value.find((i) => i._id === product._id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  // Remove item by index
  const removeItem = (index) => {
    items.value.splice(index, 1)
  }

  // Increase quantity
  const increaseQuantity = (index) => {
    items.value[index].quantity++
  }

  // Decrease quantity
  const decreaseQuantity = (index) => {
    if (items.value[index].quantity > 1) {
      items.value[index].quantity--
    } else {
      removeItem(index)
    }
  }

  // Clear all items
  const clearCart = () => {
    items.value = []
  }

  return {
    items,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  }
})
