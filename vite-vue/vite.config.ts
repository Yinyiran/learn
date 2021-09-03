import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // ViteComponents({
    //   customComponentResolvers: [
    //     AntDesignVueResolver(),
    //     (name) => {
    //       if (name.match(/^A[A-Z]/)) { // Ant Design Vue
    //         const importName = name.slice(1)
    //         const dirName = kebabCase(importName) // e.g. date-picker
    //         return {
    //           importName,
    //           path: 'ant-design-vue/es',
    //           sideEffects: `ant-design-vue/es/${dirName}/style`,
    //         }
    //       }
    //     }
    //   ]
    // }) 
  ]
})
