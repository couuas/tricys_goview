# tricys_goview

`tricys_goview` 是面向 TRICYS 平台的大屏可视化前端仓库。

本仓库基于 GoView 项目进行定制开发，并继续沿用 MIT License 发布。

## Upstream 与分支策略

- `main`：当前仓库的主开发分支，用于承载 TRICYS 的持续定制与集成开发。
- `upstream/master-fetch`：仅作为 GoView 旧上游分支的跟踪参考，不在该分支上直接开展当前仓库开发。

建议的远程配置如下：

```bash
git remote add -t master-fetch upstream https://gitee.com/dromara/go-view.git
git fetch upstream master-fetch
```

## 原项目说明与致谢

本仓库包含基于 GoView 修改而来的代码与资源。

- 原项目名称：GoView
- GoView 官网：https://mtruning.club/
- GoView 开源地址：https://gitee.com/dromara/go-view
- 原项目许可证：MIT License

感谢 GoView 原作者及贡献者提供的开源基础能力，使本仓库能够在其之上继续进行适配、集成与扩展。

根据 MIT License 的要求：

- 本仓库保留原项目的 MIT License 文本。
- 原项目的版权声明与许可声明继续适用于其对应代码部分。
- 本仓库中的新增修改与集成代码同样按 MIT License 发布，具体以 [LICENSE](LICENSE) 为准。

更明确的归属与致谢说明见 [NOTICE](NOTICE)。

## 本仓库相对 GoView 的主要调整

- 面向 TRICYS 平台的接口前缀与运行时上下文注入。
- 与 `tricys_visual` 的 iframe 集成和消息通信。
- 与 `tricys_backend` 的 `/api/v2/goview` 兼容接口适配。
- 面向仿真结果展示的定制组件扩展，例如 3D 模型加载能力。

## 本地开发

要求：

- Node.js >= 16.14

安装依赖：

```bash
pnpm install
```

或：

```bash
npm install
```

启动开发环境：

```bash
pnpm dev
```

构建：

```bash
pnpm build
```

## 许可证

本仓库以 MIT License 发布，详见 [LICENSE](LICENSE)。

如果你分发本仓库的全部或部分代码，请一并保留原有版权声明与 MIT 许可文本。
