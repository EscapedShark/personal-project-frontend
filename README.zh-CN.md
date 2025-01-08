# 个人项目管理系统 (Frontend)

一个基于 React + TypeScript 的现代化项目管理系统前端实现。

## 技术栈

- **核心框架：** React 18.3.1
- **类型系统：** TypeScript 5.6.3
- **状态管理：** Redux Toolkit 2.5.0
- **路由系统：** React Router DOM 7.1.1
- **UI 组件库：** Ant Design 5.22.6
- **构建工具：** Vite 6.0.6
- **HTTP 客户端：** Axios 1.7.9

## 特性

- 🚀 基于 Vite 的快速开发体验
- 💪 TypeScript 提供类型安全
- 📱 响应式设计，支持多端适配
- 🎨 基于 Ant Design 的美观界面
- 🔐 完整的用户认证流程
- 📊 可视化的项目数据展示

## 快速开始

### 环境要求

- Node.js 16.0 或更高版本
- npm 7.0 或更高版本

### 安装

```bash
# 克隆项目
git clone [项目地址]

# 进入项目目录
cd project-name

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器
npm run dev
```

### 构建

```bash
# 构建生产版本
npm run build
```

## 项目结构

```
src/
├── components/     # 可复用组件/未创建
├── layouts/        # 布局组件
├── pages/          # 页面组件
│   ├── auth/       # 认证相关页面
│   ├── projects/   # 项目管理页面
│   ├── tasks/      # 任务管理页面
│   └── profile/    # 用户信息页面
├── services/       # API 服务/未创建
├── store/          # Redux store/未创建
├── types/          # TypeScript 类型定义/未创建
└── utils/          # 工具函数/未创建
```

## 主要功能

- 用户认证
  - 登录/注册
  - 个人信息管理
- 项目管理
  - 项目列表查看
  - 项目详情管理
  - 项目进度跟踪
- 任务管理
  - 看板式任务管理
  - 任务分配
  - 进度更新

## 开发指南

### 代码规范

本项目使用 ESLint 进行代码规范检查，配置包括：
- eslint 9.17.0
- typescript-eslint 8.18.2
- eslint-plugin-react-hooks 5.1.0
- eslint-plugin-react-refresh 0.4.16

### 依赖说明

- @ant-design/icons: UI 图标库
- @reduxjs/toolkit: Redux 状态管理工具
- react-redux: Redux 的 React 绑定
- axios: HTTP 请求客户端
- antd: UI 组件库

## 命令说明

```bash
# 开发环境启动
npm run dev

# 生产环境构建
npm run build

# 代码规范检查
npm run lint

```

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88



## License

GPL
