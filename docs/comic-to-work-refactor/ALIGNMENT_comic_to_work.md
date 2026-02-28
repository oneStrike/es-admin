# Comic 接口迁移至 Work 模块 - 需求对齐文档

## 1. 原始需求

用户表示：`comic` 接口相关的现在已经废弃了，需要改成 `work` 模块的接口。同时字段和现在视图中所使用的也进行了很多的调整。

## 2. 现状分析

### 2.1 当前 API 文件结构

#### 旧接口 (即将废弃)
| 文件路径 | 状态 | 说明 |
|---------|------|------|
| `api/core/work/comic.ts` | 废弃 | 漫画管理 API，使用 `/api/admin/work/comic/*` 路径 |
| `api/core/work/comicChapter.ts` | 废弃 | 漫画章节 API，使用 `/api/admin/work/comic-chapter/*` 路径 |
| `api/types/work/comic.d.ts` | 废弃 | 漫画类型定义 |
| `api/types/work/comicChapter.d.ts` | 废弃 | 漫画章节类型定义 |

#### 新接口 (推荐使用)
| 文件路径 | 状态 | 说明 |
|---------|------|------|
| `api/core/work/work.ts` | ✅ 已完善 | 作品管理 API，使用 `/api/admin/work/*` 路径 |
| `api/core/work/chapter.ts` | ✅ 已完善 | 作品章节 API，使用 `/api/admin/work/chapter/*` 路径 |
| `api/types/work/work.d.ts` | ✅ 已完善 | 作品类型定义 |
| `api/types/work/chapter.d.ts` | ✅ 已完善 | 作品章节类型定义 |

### 2.2 API 路径对比

#### 作品管理接口
| 功能 | 旧路径 (comic) | 新路径 (work) | 状态 |
|------|---------------|--------------|------|
| 创建 | `/api/admin/work/comic/create` | `/api/admin/work/create` | ✅ 已对应 |
| 分页查询 | `/api/admin/work/comic/page` | `/api/admin/work/page` | ✅ 已对应 |
| 详情 | `/api/admin/work/comic/detail` | `/api/admin/work/detail` | ✅ 已对应 |
| 更新 | `/api/admin/work/comic/update` | `/api/admin/work/update` | ✅ 已对应 |
| 更新状态 | `/api/admin/work/comic/update-status` | `/api/admin/work/update-status` | ✅ 已对应 |
| 更新推荐 | `/api/admin/work/comic/update-recommended` | `/api/admin/work/update-recommended` | ✅ 已对应 |
| 更新热门 | `/api/admin/work/comic/update-hot` | `/api/admin/work/update-hot` | ✅ 已对应 |
| 更新新作 | `/api/admin/work/comic/update-new` | `/api/admin/work/update-new` | ✅ 已对应 |
| 删除 | `/api/admin/work/comic/delete` | `/api/admin/work/delete` | ✅ 已对应 |

#### 章节管理接口
| 功能 | 旧路径 (comicChapter) | 新路径 (chapter) | 状态 |
|------|----------------------|-----------------|------|
| 创建 | `/api/admin/work/comic-chapter/create` | `/api/admin/work/chapter/create` | ✅ 已对应 |
| 分页查询 | `/api/admin/work/comic-chapter/page` | `/api/admin/work/chapter/page` | ✅ 已对应 |
| 详情 | `/api/admin/work/comic-chapter/detail` | `/api/admin/work/chapter/detail` | ✅ 已对应 |
| 更新 | `/api/admin/work/comic-chapter/update` | `/api/admin/work/chapter/update` | ✅ 已对应 |
| 删除 | `/api/admin/work/comic-chapter/delete` | `/api/admin/work/chapter/delete` | ✅ 已对应 |
| 排序交换 | `/api/admin/work/comic-chapter/swap-sort-order` | `/api/admin/work/chapter/swap-sort-order` | ✅ 已对应 |

### 2.3 类型定义对比

#### 作品类型核心差异

| 字段 | 旧类型 (视图使用) | 新类型 (BaseWorkDto) | 变化说明 |
|------|------------------|---------------------|---------|
| 作者关联 | `comicAuthors` | `authors` | ⚠️ 字段名变更 |
| 分类关联 | `comicCategories` | `categories` | ⚠️ 字段名变更 |
| 标签关联 | `comicTags` | `tags` | ⚠️ 字段名变更 |
| 备注字段 | `remark` | `remark` | ✅ 保留 |

#### 新接口已完善的功能
- ✅ `WorkDetailResponse = BaseWorkDto` - 详情返回单个对象
- ✅ `WorkCreateRequest = CreateWorkDto` - 创建接口已添加
- ✅ `remark` 字段在 `BaseWorkDto` 和 `CreateWorkDto` 中保留

#### BaseWorkDto 完整字段
```typescript
type BaseWorkDto = {
  id: number;
  name: string;
  alias?: string | null;
  cover: string;
  description: string;
  type: 1 | 2;                     // 作品类型（1=漫画, 2=小说）
  serialStatus: 0 | 1 | 2 | 3 | 4;
  
  // 关联数据 (字段名已变更)
  authors: WorkAuthorRelationDto[];      // 原 comicAuthors
  categories: WorkCategoryRelationDto[]; // 原 comicCategories
  tags: WorkTagRelationDto[];            // 原 comicTags
  
  // 状态标记
  isPublished: boolean;
  isRecommended: boolean;
  isHot: boolean;
  isNew: boolean;
  
  // 元数据
  publisher?: string | null;
  region: string;
  language: string;
  ageRating?: string | null;
  originalSource?: string | null;
  copyright?: string | null;
  disclaimer?: string | null;
  remark?: string | null;  // ✅ 保留
  
  // 权限设置
  viewRule: -1 | 0 | 1 | 2 | 3;
  canComment: boolean;
  canDownload: boolean;
  canExchange: boolean;
  requiredViewLevelId?: number | null;
  
  // 价格设置
  price: number;
  chapterPrice: number;
  exchangePoints: number;
  chapterExchangePoints: number;
  purchaseCount: number;
  
  // 推荐设置
  recommendWeight?: number | null;
  
  // 统计数据
  viewCount: number;
  favoriteCount: number;
  likeCount: number;
  downloadCount: number;
  popularity: number;
  rating?: number | null;
  ratingCount: number;
  
  // 时间信息
  createdAt: string;
  updatedAt: string;
  lastUpdated?: string | null;
  publishAt?: string | null;
};
```

#### 章节类型核心差异

| 字段 | 旧类型 | 新类型 (CreateWorkChapterDto) | 变化说明 |
|------|-------|------------------------------|---------|
| 作品ID | `comicId` | `workId` | ⚠️ 字段名变更 |
| 作品类型 | 无 | `workType` | ⚠️ 新增必填字段 |

### 2.4 视图层使用情况

#### 漫画管理核心视图
**文件**: `views/content-manager/comic-manager/core/index.vue`

需要改动的地方:
1. ~~使用 `BaseComicDto` 类型（已不存在）~~ → 使用 `BaseWorkDto`
2. API 函数名: `comicXxxApi` → `workXxxApi`
3. 字段访问: `record.comicAuthors` → `record.authors`
4. 字段访问: `record.comicCategories` → `record.categories`
5. 字段访问: `record.comicTags` → `record.tags`
6. 章节管理传递: `comicId` → `workId`

#### 漫画章节视图
**文件**: `views/content-manager/comic-manager/chapter/index.vue`

需要改动的地方:
1. API 函数名: `comicChapterXxxApi` → `chapterXxxApi`
2. 参数传递: `comicId` → `workId`
3. 新增参数: `workType: 1` (漫画固定为1)

## 3. 已确认事项

根据最新接口文档，以下问题已解决：

| 问题 | 状态 | 说明 |
|-----|------|------|
| WorkDetailResponse 结构 | ✅ 已解决 | 现在返回 `BaseWorkDto` 单个对象 |
| 创建接口缺失 | ✅ 已解决 | `workCreateApi` 已添加 |
| remark 字段 | ✅ 已解决 | 新接口保留该字段 |
| workType 参数 | ✅ 已确认 | 漫画固定传 `1` |

## 4. 技术方案

### 4.1 改造策略

采用**直接替换方案**，原因：
1. 新接口已完全对齐旧接口功能
2. 字段映射清晰明确
3. 改动范围可控

### 4.2 字段映射清单

| 旧字段/函数 | 新字段/函数 | 影响文件 |
|------------|------------|---------|
| `BaseComicDto` | `BaseWorkDto` | 视图文件 |
| `comicPageApi` | `workPageApi` | index.vue |
| `comicDetailApi` | `workDetailApi` | index.vue |
| `comicCreateApi` | `workCreateApi` | index.vue |
| `comicUpdateApi` | `workUpdateApi` | index.vue |
| `comicDeleteApi` | `workDeleteApi` | index.vue |
| `comicAuthors` | `authors` | columns.ts, detail.ts, index.vue |
| `comicCategories` | `categories` | columns.ts, detail.ts, index.vue |
| `comicTags` | `tags` | columns.ts, detail.ts, index.vue |
| `comicId` | `workId` | chapter/index.vue |
| `comicChapterXxxApi` | `chapterXxxApi` | chapter/index.vue |

## 5. 验收标准

### 5.1 功能验收
- [ ] 作品列表正确显示
- [ ] 作品详情正确显示（作者、分类、标签）
- [ ] 作品创建功能正常
- [ ] 作品编辑功能正常
- [ ] 作品删除功能正常
- [ ] 各状态切换正常（发布、推荐、热门、新作）
- [ ] 章节列表正确显示
- [ ] 章节创建功能正常
- [ ] 章节编辑功能正常
- [ ] 章节删除功能正常
- [ ] 章节拖拽排序正常

### 5.2 代码质量
- [ ] 无 TypeScript 编译错误
- [ ] 无 ESLint 警告
- [ ] 无运行时错误
