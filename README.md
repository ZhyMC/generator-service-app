# generator-service-app 

> 这是Wyatt风格的服务应用开发模板


## 特性

1. 支持构建 Docker 镜像
2. 预置的支持初始化配置文件的 CLI 工具
3. 默认支持 mocha 测试框架
4. 默认支持 nyc 覆盖率测试工具
5. 自动初始化 git 仓库
6. 支持 changelog 的 commit 规范
7. 携带了 master 和 dev 两个基础 git 分支
8. 默认的 MIT 开源协议
9. 默认的服务应用代码
10. 支持 TypeScript 
11. 支持 Jenkins 多分支流水线
12. 为 CI/CD 工具服务
13. 扩展性高, 与环境无关

## 安装


要运行本生成器，你首先需要全局安装依赖 yeoman
```bash
npm install -g yo
```

然后安装本项目的包
```bash
npm install -g generator-service-app
```

## 生成

要使用生成器初始化一个新的项目，执行
```bash
yo generator-service-app
```

