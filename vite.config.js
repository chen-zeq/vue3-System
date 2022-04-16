import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import babel from "vite-babel-plugin";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    babel({
      extensions:['.vue'], 
      plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ]
    }),
    
  ],
  resolve:{
    extensions: ['.js', '.vue', '.json', ".scss"],
    alias: {
      '@': path.resolve(__dirname,'./src'),
      'vue': 'vue/dist/vue.esm-bundler.js', // 定义vue的别名，如果使用其他的插件，可能会用到别名
  },
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        // additionalData: '@import "./src/assets/style/global.less";',
      },
    },
  },
  server: {
    open: true
  }
})
