import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] })
    ],
    optimizeDeps: {
      force: true
    },
    server: {
      proxy: {
        '/api-proxy': {
          target: env.VITE_API_BASE_URL || 'https://mustafa-badran.com/app2',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api-proxy/, '')
        }
      }
    }
  }
})
