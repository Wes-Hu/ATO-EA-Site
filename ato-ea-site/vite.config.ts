import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'date-fns',
        'react-ui-scrollspy',
        'emailjs-com',
        'react-input-mask',
        'react-parallax'
      ]
    }
  }
})
