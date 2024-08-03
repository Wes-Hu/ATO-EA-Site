import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['framer-motion', 'date-fns', 'react-input-mask', 'emailjs-com', 'react-ui-scrollspy']
    }
  }
})
