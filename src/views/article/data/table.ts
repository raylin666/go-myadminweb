import { SelectOptionData } from '@arco-design/web-vue';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import { ComputedRef, computed } from 'vue';
import { ComposerTranslation } from 'vue-i18n';

// 状态选项配置
export const getStatusOptions = (t: ComposerTranslation) : ComputedRef<SelectOptionData[]> => {
    return computed<SelectOptionData[]>(() => [
        {
          label: t('articleList.form.status.open'),
          value: 1,
        },
        {
          label: t('articleList.form.status.close'),
          value: 0,
        },
      ]);
};

// 推荐选项配置
export const getRecommendOptions = (t: ComposerTranslation) : ComputedRef<SelectOptionData[]> => {
    return computed<SelectOptionData[]>(() => [
        {
          label: t('articleList.form.recommend.yes'),
          value: 1,
        },
        {
          label: t('articleList.form.recommend.no'),
          value: 0,
        },
      ]);
};

// 表格数据列列表
export const ListColumns = (t: ComposerTranslation) : TableColumnData[] => [
    {
        title: t('articleList.columns.number'),
        dataIndex: 'id',
        fixed: 'left',
        width: 100,
    },
    {
        title: t('articleList.columns.title'),
        dataIndex: 'title',
        width: 240,
    },
    {
        title: t('articleList.columns.cover'),
        dataIndex: 'cover',
        slotName: 'cover',
    },
    {
        title: t('articleList.columns.category'),
        dataIndex: 'category',
        slotName: 'category',
        width: 320,
    },
    {
        title: t('articleList.columns.publisher'),
        dataIndex: 'publisher',
        slotName: 'publisher_user',
    },
    {
        title: t('articleList.columns.status'),
        dataIndex: 'status',
        slotName: 'status',
    },
    {
        title: t('articleList.columns.recommend'),
        dataIndex: 'recommend_flag',
        slotName: 'recommend_flag',
    },
    {
        title: t('articleList.columns.commented'),
        dataIndex: 'commented_flag',
        slotName: 'commented_flag',
    },
    {
        title: t('articleList.columns.timeAt'),
        dataIndex: 'time_at',
        slotName: 'time_at',
        width: 200,
    },
    {
        title: t('articleList.columns.sort'),
        dataIndex: 'sort',
    },
    {
        title: t('articleList.columns.viewCount'),
        dataIndex: 'view_count',
    },
    {
        title: t('articleList.columns.commentCount'),
        dataIndex: 'comment_count',
    },
    {
        title: t('articleList.columns.operations'),
        dataIndex: 'operations',
        slotName: 'operations',
        fixed: 'right',
        width: 200,
    },
];