import { SelectOptionData } from '@arco-design/web-vue';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import { ComputedRef, computed } from 'vue';
import { ComposerTranslation } from 'vue-i18n';

// 状态选项配置
export const getStatusOptions = (t: ComposerTranslation) : ComputedRef<SelectOptionData[]> => {
    return computed<SelectOptionData[]>(() => [
        {
          label: t('chatbot.form.status.open'),
          value: 1,
        },
        {
          label: t('chatbot.form.status.close'),
          value: 0,
        },
      ]);
};

// 表格数据列列表
export const ListColumns = (t: ComposerTranslation) : TableColumnData[] => [
    {
        title: t('chatbot.columns.number'),
        dataIndex: 'id',
        fixed: 'left',
        width: 100,
    },
    {
        title: t('chatbot.columns.name'),
        dataIndex: 'name',
        fixed: 'left',
        width: 160,
    },
    {
        title: t('chatbot.columns.pid'),
        dataIndex: 'pid',
        width: 100,
    },
    {
        title: t('chatbot.columns.icon'),
        dataIndex: 'icon',
        slotName: 'icon',
        width: 100,
    },
    {
        title: t('chatbot.columns.describe'),
        dataIndex: 'describe',
    },
    {
        title: t('articleList.columns.status'),
        dataIndex: 'status',
        slotName: 'status',
        width: 100,
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
        width: 80,
    },
    {
        title: t('articleList.columns.operations'),
        dataIndex: 'operations',
        slotName: 'operations',
        fixed: 'right',
        width: 200,
    },
];