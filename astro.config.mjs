import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@astrojs/vue';
export default defineConfig({
  plugins: [tailwindcss()],

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [vue()],
})