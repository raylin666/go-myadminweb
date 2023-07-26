import { SelectOptionData } from '@arco-design/web-vue';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import { ComputedRef, computed } from 'vue';
import { ComposerTranslation } from 'vue-i18n';

// 状态选项配置
export const getStatusOptions = (t: ComposerTranslation) : ComputedRef<SelectOptionData[]> => {
    return computed<SelectOptionData[]>(() => [
        {
          label: t('article.category.form.status.open'),
          value: 1,
        },
        {
          label: t('article.category.form.status.close'),
          value: 0,
        },
      ]);
};

// 表格数据列列表
export const ListColumns = (t: ComposerTranslation) : TableColumnData[] => [
    {
        title: t('article.category.columns.number'),
        dataIndex: 'id',
        fixed: 'left',
        width: 100,
    },
    {
        title: t('article.category.columns.name'),
        dataIndex: 'name',
        fixed: 'left',
        width: 160,
    },
    {
        title: t('article.category.columns.pid'),
        dataIndex: 'pid',
        slotName: 'pid',
        width: 100,
    },
    {
        title: t('article.category.columns.color'),
        dataIndex: 'color',
        slotName: 'color',
        width: 80,
    },
    {
        title: t('article.category.columns.cover'),
        dataIndex: 'cover',
        slotName: 'cover',
        width: 80,
    },
    {
        title: t('article.category.columns.status'),
        dataIndex: 'status',
        slotName: 'status',
        width: 100,
    },
    {
        title: t('article.category.columns.articleCount'),
        dataIndex: 'article_count',
        slotName: 'article_count',
        width: 100,
    },
    {
        title: t('article.category.columns.timeAt'),
        dataIndex: 'time_at',
        slotName: 'time_at',
        width: 200,
    },
    {
        title: t('article.category.columns.sort'),
        dataIndex: 'sort',
        width: 80,
    },
    {
        title: t('article.category.columns.operations'),
        dataIndex: 'operations',
        slotName: 'operations',
        fixed: 'right',
        width: 120,
    },
];