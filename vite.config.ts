import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  base: "/vue-chat-client/",
  resolve: {
    alias: {
      '@': '/src',
      components: '/src/components',
      navigation: '/src/components/navigation',
      forms: '/src/components/forms',
      ui: '/src/components/ui',
    }
  }
})
