# 硅谷甄选

[视频地址]: https://www.bilibili.com/video/BV1Xh411V7b5?p=1&amp;vd_source=2ccb7e5a1b69378347d040ab14ab1fea

**技术栈：Vue3+TS+Element Plus**

## 搭建后台管理系统

### 项目初始化

今天来带大家从0开始搭建一个vue3版本的后台管理系统。一个项目要有统一的规范，需要使用eslint+stylelint+prettier来对我们的代码质量做检测和修复，需要使用husky来做commit拦截，需要使用commitlint来统一提交规范，需要使用preinstall来统一包管理工具。

下面我们就用这一套规范来初始化我们的项目，集成一个规范的模版。

#### 2.1.1环境准备

- node v16.14.2 
- pnpm 8.0.0

接口文档：

服务器域名：http://sph-api.atguigu.cn

swagger文档：

http://39.98123.211:8510/swagger-ui.html

http://139.198.104.58:8212/swagger-ui.html#/