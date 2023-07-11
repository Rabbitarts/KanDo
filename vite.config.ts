import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components'),
			'@sidebar': path.resolve(__dirname, './src/components/layout/sidebar'),
			'@screens': path.resolve(__dirname, './src/components/screens'),
			'@supabase-client': path.resolve(__dirname, './src/supabase'),
			'@image': path.resolve(__dirname, './src/assets/image'),
			'@types': path.resolve(__dirname, './src/types')
		}
	}
})
