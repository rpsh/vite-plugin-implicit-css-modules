import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginImplicitCssModules from '../src/index';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      ...vitePluginImplicitCssModules(),
      enforce: 'pre',
    },
    vue()
  ],
  css: {
    modules: {
      generateScopedName: '[local]___[hash:base64:5]',
      localsConvention: 'camelCase',
    },
  },
})
