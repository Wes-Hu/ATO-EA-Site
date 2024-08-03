import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'date-fns',
        'react-ui-scrollspy',
        'emailjs-com',
        '@supabase/supabase-js',
        'react-input-mask',
        'react-parallax',
        'framer-motion'
      ],
      output: {
        globals: {
          'framer-motion': 'framerMotion'
        }
      }
    }
  }
})
