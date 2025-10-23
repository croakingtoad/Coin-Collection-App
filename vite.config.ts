import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_PORT || '1337'),
    host: '0.0.0.0', // Allow access via IP address
    strictPort: true, // Fail if port is already in use
  },
})
