import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@astrojs/vue'
import node from '@astrojs/node';
export default defineConfig({
  plugins: [tailwindcss()],
  viewTransitions: true,

  vite: {
      plugins: [tailwindcss()]
	},

  integrations: [vue()],

  adapter: node({
    mode: 'standalone'
  })
})