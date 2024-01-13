import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useResize() {
  const resizeWindow = ref(window.innerWidth)

  const handleResize = () => {
    resizeWindow.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })

  return { resizeWindow }
}