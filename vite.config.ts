import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/

export default defineConfig(({command,mode}) => {
  // 获取各个环境下的定义的变量
  // 参数一 mode:指定环境  参数二：环境文件根目录
  let env = loadEnv(mode,process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve', // 保证开发阶段可以使用mock接口
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src") // 相对路径别名的配置，使用@ 替代src
      }
    },
    // scss全局变量的配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    // 代理跨域
    server:{
      proxy:{
        [env.VITE_APP_BASE_API]:{
          // 获取数据的服务器地址设置
          target:env.VITE_SERVE,
          // 需要代理跨域
          changeOrigin:true,
          // 路径重写
          rewrite:(path)=>path.replace(/^\/api/,''),
        }
      }
    }

    

  }
})