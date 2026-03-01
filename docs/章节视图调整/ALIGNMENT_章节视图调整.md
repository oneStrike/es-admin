# 章节视图调整 - 对齐文档

## 原始需求
参考作品管理视图，调整作品章节视图，严格按照接口文档来实现。

## 项目分析

### 现有项目结构
```
apps/web-ele/src/views/content-manager/comic-manager/
├── core/                          # 作品管理（参考目标）
│   ├── index.vue                  # 主视图
│   └── model/
│       ├── columns.ts             # 表格列配置
│       ├── detail.ts              # 详情卡片配置
│       └── shared.ts              # 表单和搜索配置
└── chapter/                       # 章节管理（需要调整）
    ├── index.vue                  # 主视图
    ├── content-manager.vue        # 内容管理
    └── model/
        ├── columns.ts             # 表格列配置（需调整）
        ├── detail.ts              # 详情配置（需调整）
        └── form.ts                # 表单配置（需调整）
```

### 技术栈
- Vue 3 + TypeScript
- Vben Admin 框架
- Element Plus 组件库
- Vxe Table 表格组件

## 现有实现对比

### 1. 作品管理 (core) 特点
- **表格列**: 使用 `formSchemaTransform.toTableColumns` 从表单配置自动生成
- **字典值**: 使用 `useDict` 获取出版社、地区、语言、年龄分级等字典值
- **状态切换**: 支持 isPublished、isHot、isNew、isRecommended 的独立切换
- **详情展示**: 使用分组卡片（Card）形式展示详情，包含多个分组
- **列排序**: 通过 `sort` 属性控制列的显示顺序

### 2. 章节管理 (chapter) 现状
- **表格列**: 直接从表单配置转换，缺少精细化控制
- **字典值**: 未使用字典值转换
- **状态切换**: 仅支持 isPublished 切换
- **详情展示**: 已有分组卡片，但结构可以优化
- **表单配置**: 使用 Divider 分组，字段配置完整

## 接口文档分析

### 章节相关类型 (chapter.d.ts)

#### ChapterPageResponse
接口返回结构为分页数据，list 为 IdDto 数组，但实际返回数据包含更多字段。

#### CreateWorkChapterDto / UpdateWorkChapterDto 字段
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 章节标题 |
| subtitle | string | 否 | 章节副标题 |
| sortOrder | number | 是 | 章节序号 |
| cover | string | 否 | 章节封面 |
| description | string | 否 | 章节描述 |
| viewRule | number | 是 | 查看规则（-1=继承, 0=所有人, 1=登录用户, 2=会员, 3=积分购买） |
| isPreview | boolean | 是 | 是否为试读章节 |
| canComment | boolean | 是 | 是否允许评论 |
| canDownload | boolean | 是 | 是否允许下载 |
| canExchange | boolean | 是 | 是否允许兑换 |
| requiredViewLevelId | number | 否 | 阅读所需会员等级ID |
| price | number | 是 | 章节价格（0=免费） |
| exchangePoints | number | 是 | 章节兑换积分 |
| isPublished | boolean | 是 | 发布状态 |
| publishAt | string | 否 | 发布时间 |
| content | string | 否 | 内容存储路径 |
| remark | string | 否 | 备注 |
| workId | number | 是 | 作品ID |
| workType | number | 是 | 作品类型（1=漫画, 2=小说） |

## 需求理解

### 需要调整的内容

1. **表格列优化**
   - 参考作品管理，优化列的展示顺序和宽度
   - 添加 viewRule 字典值转换（所有人、登录用户、会员、积分购买）
   - 添加 isPreview 列显示
   - 优化拖拽排序列的展示

2. **表单配置检查**
   - 确保与接口文档字段一致
   - 检查字段类型和默认值
   - 确认依赖关系配置正确

3. **详情展示优化**
   - 保持现有的分组结构
   - 确保字段与接口一致
   - 优化字段展示格式

4. **代码风格统一**
   - 使用与作品管理一致的代码模式
   - 统一类型导入方式
   - 统一组件使用方式

## 边界确认

### 任务范围
- ✅ 章节视图的表格列调整
- ✅ 章节表单配置优化
- ✅ 章节详情展示优化
- ✅ 与接口文档对齐

### 不包含的内容
- ❌ 接口 API 的修改
- ❌ 后端接口调整
- ❌ 新增功能模块
- ❌ 其他视图调整

## 疑问澄清

### 已确认
1. **接口类型**: 使用 `chapter.d.ts` 和 `comicChapter.d.ts` 中的类型定义
2. **viewRule 字典**: 已在 `form.ts` 中定义 `readRule` 数组
3. **代码模式**: 参考 `core/index.vue` 的实现模式

### 无歧义
需求明确：参考作品管理视图的结构和代码风格，调整章节管理视图，确保与接口文档一致。
