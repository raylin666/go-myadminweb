import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const ARTICLE: AppRouteRecordRaw = {
  path: '/article',
  name: 'article',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.article',
    requiresAuth: true,
    icon: 'icon-bookmark',
    order: 1,
  },
  children: [
    {
      path: 'list',
      name: 'ArticleList',
      component: () => import('@/views/article/list.vue'),
      meta: {
        locale: 'menu.article.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'category/list',
      name: 'ArticleCategoryList',
      component: () => import('@/views/article/categoryList.vue'),
      meta: {
        locale: 'menu.article.category.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default ARTICLE;
