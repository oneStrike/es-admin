import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'ContentManager',
    path: '/content-manager',
    meta: {
      title: '内容管理',
      order: 2,
      icon: 'majesticons:book-open-line',
    },
    children: [
      {
        name: 'ComicManager',
        path: '/content-manager/comic-manager',
        component: () =>
          import('#/views/content-manager/comic-manager/core/index.vue'),
        meta: {
          title: '漫画',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'NovelManager',
        path: '/content-manager/novel-manager',
        component: () =>
          import('#/views/content-manager/novel-manager/core/index.vue'),
        meta: {
          title: '小说',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'AuthorManager',
        path: '/content-manager/author-manager',
        component: () =>
          import('#/views/content-manager/author-manager/index.vue'),
        meta: {
          title: '作者管理',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'CategoryManager',
        path: '/content-manager/category-manager',
        component: () =>
          import('#/views/content-manager/category-manager/index.vue'),
        meta: {
          title: '分类管理',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'TagManager',
        path: '/content-manager/tag-manager',
        component: () =>
          import('#/views/content-manager/tag-manager/index.vue'),
        meta: {
          title: '标签管理',
          icon: 'codex:dot-circle',
        },
      },
      {
        name: 'ContentEmojiManager',
        path: '/content-manager/emoji-manager',
        component: () =>
          import('#/views/content-manager/emoji-manager/index.vue'),
        meta: {
          title: '表情管理',
          icon: 'codex:dot-circle',
        },
      },
    ],
  },
];

export default routes;
