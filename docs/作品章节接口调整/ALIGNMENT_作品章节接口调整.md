# 作品和作品章节数据接口调整方案

## 一、需求背景

后端接口数据结构已调整，当前前端代码中使用的字段与新接口类型定义不一致，需要对齐修改。

## 二、问题分析

### 2.1 章节相关字段变更

#### 新类型 `BaseWorkChapterDto` 中已移除的字段

| 字段名 | 当前代码使用位置 | 新类型状态 |
|--------|-----------------|-----------|
| `canExchange` | `form.ts`, `detail.ts`, `columns.ts` | ❌ 已移除 |
| `exchangePoints` | `form.ts`, `detail.ts` | ❌ 已移除 |

#### 新类型 `CreateWorkChapterDto` / `UpdateWorkChapterDto` 字段对比

| 字段名 | 旧需求 | 新需求 | 状态 |
|--------|--------|--------|------|
| `canExchange` | 必填 boolean | 不存在 | ❌ 需移除 |
| `exchangePoints` | 可选 number | 不存在 | ❌ 需移除 |
| `canComment` | 必填 boolean | 必填 boolean | ✅ 正常 |
| `canDownload` | 必填 boolean | 必填 boolean | ✅ 正常 |
| `price` | 必填 number | 必填 number | ✅ 正常 |
| `viewRule` | 必填 | 必填 | ✅ 正常 |
| `requiredViewLevelId` | 可选 | 可选 | ✅ 正常 |

### 2.2 作品相关字段变更

#### `BaseWorkDto` 字段分析

| 字段名 | 状态 |
|--------|------|
| `canExchange` | 需确认是否移除 |
| `exchangePoints` | 需确认是否移除 |
| `chapterExchangePoints` | 需确认是否移除 |

根据 `BaseWorkDto` 类型定义（work.d.ts 第248-328行），作品实体中也没有 `canExchange` 和 `exchangePoints` 字段。

### 2.3 章节内容接口参数变更

#### `ChapterContentListRequest`

```typescript
// 新定义
type ChapterContentListRequest = {
  id: number;  // 参数名为 id，不是 chapterId
}
```

#### `ChapterContentClearRequest`

```typescript
// 新定义
type ChapterContentClearRequest = IdDto;  // { id: number }
```

当前 `content-manager.vue` 使用 `{ chapterId }` 参数，需要改为 `{ id }`。

## 三、影响范围

### 3.1 需要修改的文件

| 文件 | 修改内容 |
|------|----------|
| `chapter/model/form.ts` | 移除 `canExchange`, `exchangePoints` 表单字段 |
| `chapter/model/detail.ts` | 移除 `canExchange`, `exchangePoints` 详情字段 |
| `chapter/model/columns.ts` | 移除 `canExchange` 列配置 |
| `chapter/content-manager.vue` | 修改 API 参数 `{ chapterId }` → `{ id }` |
| `comic-manager/core/model/shared.ts` | 移除作品表单中的 `canExchange`, `exchangePoints`, `chapterExchangePoints` 字段 |
| `comic-manager/core/model/detail.ts` | 移除作品详情中的相关字段 |

### 3.2 不需要修改的文件

- `chapter/index.vue` - 章节管理主页面，不涉及已移除字段
- API 调用层 - 接口路径未变，只是数据结构变化

## 四、修改方案

### 4.1 `chapter/model/form.ts` 修改

**移除以下表单字段：**

```typescript
// 移除 canExchange 字段（第134-145行）
{
  fieldName: 'canExchange',
  label: '允许兑换',
  component: 'RadioGroup',
  defaultValue: false,
  componentProps: {
    options: [
      { label: '否', value: false },
      { label: '是', value: true },
    ],
  },
},

// 移除 exchangePoints 字段（第179-194行）
{
  fieldName: 'exchangePoints',
  label: '兑换所需积分',
  component: 'InputNumber',
  defaultValue: 0,
  componentProps: {
    placeholder: '请输入兑换所需积分',
    min: 0,
  },
  dependencies: {
    show: ({ canExchange }) => {
      return canExchange === true;
    },
    triggerFields: ['canExchange'],
  },
},
```

**移除搜索表单中的 canExchange：**

```typescript
// 从 chapterSearchFormSchema 中移除
canExchange: {
  show: true,
},
```

### 4.2 `chapter/model/detail.ts` 修改

**移除权限设置卡片中的字段：**

```typescript
// 移除允许兑换字段
{
  label: '允许兑换',
  value: detail.canExchange,
  type: 'tag',
  tagType: detail.canExchange ? 'success' : 'info',
  tagText: detail.canExchange ? '是' : '否',
},
```

**移除价格设置卡片中的字段：**

```typescript
// 移除兑换所需积分字段
{
  label: '兑换所需积分',
  value: detail.exchangePoints || 0,
  type: 'text',
},
```

### 4.3 `chapter/model/columns.ts` 修改

**移除列配置：**

```typescript
// 移除 canExchange 列
canExchange: {
  width: 100,
  sort: 9,
  cellRender: {
    name: 'CellTag',
  },
},
```

### 4.4 `chapter/content-manager.vue` 修改

**修改 API 参数：**

```typescript
// loadContents 函数
async function loadContents() {
  if (!shareData.value?.chapterId) return;
  try {
    // 修改前
    const res = await comicContentListApi({
      chapterId: shareData.value.chapterId,
    });
    // 修改后
    const res = await chapterContentListApi({
      id: shareData.value.chapterId,
    });
    contentList.value = res || [];
  } catch (error) {
    console.error('加载章节内容失败:', error);
  }
}

// handleClearAll 函数
async function handleClearAll() {
  useConfirm('clear', async () => {
    // 修改前
    await comicContentClearApi({ chapterId: shareData.value!.chapterId });
    // 修改后
    await chapterContentClearApi({ id: shareData.value!.chapterId });
    useMessage.success('清空成功');
    await loadContents();
  });
}
```

**修改 API 导入：**

```typescript
// 修改前
import {
  comicContentClearApi,
  comicContentDeleteApi,
  comicContentListApi,
  comicContentMoveApi,
} from '#/api';

// 修改后
import {
  chapterContentClearApi,
  chapterContentDeleteApi,
  chapterContentListApi,
  chapterContentMoveApi,
} from '#/api';
```

### 4.5 作品管理相关文件修改

需要确认作品模块是否也有相同的字段需要移除：
- `canExchange`
- `exchangePoints`
- `chapterExchangePoints`

## 五、执行清单

- [ ] 1. 修改 `chapter/model/form.ts` - 移除 `canExchange`, `exchangePoints` 字段
- [ ] 2. 修改 `chapter/model/detail.ts` - 移除相关详情字段
- [ ] 3. 修改 `chapter/model/columns.ts` - 移除 `canExchange` 列
- [ ] 4. 修改 `chapter/content-manager.vue` - 更新 API 调用和参数
- [ ] 5. 检查并修改作品管理相关文件
- [ ] 6. 验证功能正常

## 六、待确认问题

1. **作品模块是否也需要同步移除 `canExchange`, `exchangePoints`, `chapterExchangePoints` 字段？**

   根据类型定义，`BaseWorkDto` 和 `CreateWorkDto` 中都没有这些字段，需要确认是否从作品表单中移除。

2. **章节内容 API 是使用 `comicContent*Api` 还是 `chapterContent*Api`？**

   当前 `content-manager.vue` 使用的是 `comicContent*Api`，需要确认是否切换到 `chapterContent*Api`。

---

**请确认以上问题后，我将开始执行修改。**
