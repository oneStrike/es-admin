# 业务 model 与类型规范

适用范围：`apps/web-ele/src/**` 内业务 model、shared 定义、类型推导、payload 构造与领域类型边界。

## Model 归属

- 业务模块必须自己维护自己的 `model` 文件。
- 跨模块共用的内容只能放在同域 `shared` 目录中。
- `shared` 目录只能包含无业务归属的基础 helper、分页查询映射、通用格式化或通用状态枚举。
- 禁止把多个业务模块的 schema、columns、detail、payload、options 合并进一个集中式大 model 文件。
- 禁止新增“兼容导出层”把旧集中入口继续暴露给业务模块。

## 类型推导

- 页面列表行类型必须优先从生成 API 响应中推导，例如 `NonNullable<XxxPageResponse['list']>[number]`。
- 不要手写一份与 DTO 重复的行类型。
- 创建、更新、查询、确认等提交 payload 必须由生成 API 请求类型约束。
- 对象字面量处优先使用 `satisfies XxxRequest` 校验。
- 函数返回类型默认交给 TypeScript 推导，除非公共 API 边界、递归结构或泛型约束确实需要显式返回类型。

## `any` 与开放对象

- 表单值、详情记录和业务行记录禁止使用 `Record<string, any>` 或宽泛 `any` 作为领域类型。
- 如确实是通用基础组件边界，使用 `Record<string, unknown>`。
- 从开放对象进入具体业务 payload 前，必须显式白名单转换。
- 生成 DTO 中的宽松索引签名只代表后端生成契约，不得在业务 model 中继续扩散。
- 业务代码应从生成类型中选取、派生、约束，而不是复制 DTO 字段或放宽成 `any`。

## 与 schema / UI 的关系

- model 层应承载同一业务字段的 label、枚举选项、格式化、显示/筛选语义。
- 页面、弹窗、表格 slot 中不应各自维护一套相同字段定义。
- model 中的请求构造函数应只传后端契约允许的字段。
- model 中的兼容字段映射、特殊默认值和刻意省略字段，应按 [注释规范](./05-comments.md) 写明原因。
