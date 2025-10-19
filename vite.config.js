import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/stitchcounterv2/', // Replace 'stitchcounterv2' with your actual repo name
})
