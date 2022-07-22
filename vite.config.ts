import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { OUTPUT_DIR, brotliSize, chunkSizeWarningLimit, terserOptions, rollupOptions } from './build/constant'
import viteCompression from 'vite-plugin-compression'
import { viteMockServe } from 'vite-plugin-mock'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
import { visualizer } from "rollup-plugin-visualizer";
import viteImagemin from 'vite-plugin-imagemin'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

const plugins = [
  vue(),
  monacoEditorPlugin({
    languageWorkers: ['editorWorkerService', 'typescript', 'json', 'html']
  }),
]

const devPlugins = [
  viteMockServe({
    mockPath: '/src/api/mock',
    // 开发打包开关
    localEnabled: true,
    // 生产打包开关
    prodEnabled: true,
    // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
    supportTs: true,
    // 监视文件更改
    watchFiles: true
  }),
]
const proPlugins = [
  // 图片压缩
  viteImagemin({
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false,
    },
    optipng: {
      optimizationLevel: 7,
    },
    mozjpeg: {
      quality: 20,
    },
    pngquant: {
      quality: [0.8, 0.9],
      speed: 4,
    },
    svgo: {
      plugins: [
        {
          name: 'removeViewBox',
        },
        {
          name: 'removeEmptyAttrs',
          active: false,
        },
      ],
    },
  }),
  // 压缩
  viteCompression({
    verbose: true,
    disable: false,
    threshold: 10240,
    algorithm: 'gzip',
    ext: '.gz'
  }),
  // 打包分析
  visualizer({
    open: true
  })
]

export default defineConfig(({ mode }) => {  
  if(mode === 'development'){
    plugins.push(...devPlugins)
  }else{
    plugins.push(...proPlugins)

  }

  return {
    base: '/',
    // 路径重定向
    resolve: {
      alias: [
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/'
        },
        {
          find: '@',
          replacement: pathResolve('src') + '/'
        }
      ],
      dedupe: ['vue']
    },
    // 全局 css 注册
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@import "src/styles/common/style.scss";`
        }
      }
    },
    plugins,
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR,
      terserOptions: terserOptions,
      rollupOptions: rollupOptions,
      brotliSize: brotliSize,
      chunkSizeWarningLimit: chunkSizeWarningLimit
    }
  }
})
