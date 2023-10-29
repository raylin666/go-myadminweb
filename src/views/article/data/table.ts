import { SelectOptionData } from '@arco-design/web-vue';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import { ComputedRef, computed } from 'vue';
import { ComposerTranslation } from 'vue-i18n';

// 状态选项配置
export const getStatusOptions = (
  t: ComposerTranslation
): ComputedRef<SelectOptionData[]> => {
  return computed<SelectOptionData[]>(() => [
    {
      label: t('article.list.form.status.open'),
      value: 1,
    },
    {
      label: t('article.list.form.status.close'),
      value: 0,
    },
  ]);
};

// 推荐选项配置
export const getRecommendOptions = (
  t: ComposerTranslation
): ComputedRef<SelectOptionData[]> => {
  return computed<SelectOptionData[]>(() => [
    {
      label: t('article.list.form.recommend.yes'),
      value: 1,
    },
    {
      label: t('article.list.form.recommend.no'),
      value: 0,
    },
  ]);
};

// 表格数据列列表
export const ListColumns = (t: ComposerTranslation): TableColumnData[] => [
  {
    title: t('article.list.columns.number'),
    dataIndex: 'id',
    fixed: 'left',
    width: 100,
  },
  {
    title: t('article.list.columns.title'),
    dataIndex: 'title',
    width: 240,
  },
  {
    title: t('article.list.columns.cover'),
    dataIndex: 'cover',
    slotName: 'cover',
    width: 120,
  },
  {
    title: t('article.list.columns.category'),
    dataIndex: 'category',
    slotName: 'category',
    width: 320,
  },
  {
    title: t('article.list.columns.publisher'),
    dataIndex: 'publisher',
    slotName: 'publisher_user',
  },
  {
    title: t('article.list.columns.status'),
    dataIndex: 'status',
    slotName: 'status',
    width: 100,
  },
  {
    title: t('article.list.columns.recommend'),
    dataIndex: 'recommend_flag',
    slotName: 'recommend_flag',
    width: 100,
  },
  {
    title: t('article.list.columns.commented'),
    dataIndex: 'commented_flag',
    slotName: 'commented_flag',
    width: 100,
  },
  {
    title: t('article.list.columns.timeAt'),
    dataIndex: 'time_at',
    slotName: 'time_at',
    width: 200,
  },
  {
    title: t('article.list.columns.sort'),
    dataIndex: 'sort',
    width: 80,
  },
  {
    title: t('article.list.columns.viewCount'),
    dataIndex: 'view_count',
    width: 80,
  },
  {
    title: t('article.list.columns.commentCount'),
    dataIndex: 'comment_count',
    width: 80,
  },
  {
    title: t('article.list.columns.operations'),
    dataIndex: 'operations',
    slotName: 'operations',
    fixed: 'right',
    width: 200,
  },
];
