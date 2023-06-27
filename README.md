# 硅谷甄选

[视频地址]: https://www.bilibili.com/video/BV1Xh411V7b5?p=1&amp;vd_source=2ccb7e5a1b69378347d040ab14ab1fea

**技术栈：Vue3+TS+Element Plus**

## 搭建后台管理系统

### 2.1项目初始化

#### 2.1.1项目配置

##### eslint配置

安装

```
pnpm i eslint -D
```

生成配置文件：eslint.cjs

```
npx eslint --init
```

### 2.1.2 项目集成

#### element plus 集成

安装element plus

 ``pnpm i element-plus``



安装 element 图标库 element icon

​	 ``pnpm i @element-plus/icons-vue``

导入：

```vue
<script lang="ts" setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
</script>
```

#### src别名修改

```tsx
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      "@":path.resolve("./src") // 相对路径别名的配置，使用@ 替代src
    }
  }
})

```

```json
// tsconfig.json
"compilerOptions": {
  	...
    "baseUrl": "./", // 解析非相对模块的基础地址，默认是当前目录
    "paths": {  // 路径映射，相对baseUrl
      "@/*":["src/*"]
    }
```

#### 环境变量的配置

开发环境（development）

开发使用的环境

测试环境（testing）

测试同时干活的环境

生产环境（production）

正式提供对外服务的



项目根目录分别添加 开发 测试 生产 环境的文件：

```
.env.development
.env.test
.env.production
```



#### SVG图标的配置

安装SVG依赖插件

```
pnpm install vite-plugin-svg-icons
```

在 vite.config.ts中配置插件

```
 pnpm install vite-plugin-svg-icons
```

修改vite.config.ts文件

```ts
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [
    createSvgIconsPlugin({
      iconDirs:[path.resolve(process.cwd(),'src/assets/icons')],
      symbolId:'icon-[dir]-[name]',
    }),
    vue()
  ],
 ......
})
```

若报错：Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'fast-glob'

```
 pnpm install fast-glob -D
```



使用：

1. assets文件下新建icons文件并创建svg文件

2. 将复制到的svg代码复制到svg文件中

   ```svg
   // assets/icons/test.svg
   <svg t="1687877325223" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1806" width="200" height="200"><path d="M516.32 285.28A98.56 98.56 0 1 0 614.88 384a98.56 98.56 0 0 0-98.56-98.72z m0 164.96A66.56 66.56 0.......></path></svg>
   ```

3. 在组件中使用

   ```vue
   <template>
     <div>
       svg测试
       <svg>
         <use xlink:href="#icon-project"></use>
       </svg>
     </div>
   </template>
   ```

   

