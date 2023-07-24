import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { AxiosResponse } from 'axios';
import { HttpResponse, Pagination, TRequestParams, TResponse } from '@/types/global';
import { DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE } from '@/types/constant';
import { TableColumnData, TableData, TableRowSelection } from '@arco-design/web-vue';
import { cloneDeep } from 'lodash';
import { ComposerTranslation } from 'vue-i18n';
import { MessageSuccess, MessageWarning, NotificationSuccess } from '@/utils/notification';
import Sortable from 'sortablejs';
import { exchangeArray } from '@/utils/array';

// API 请求列表数据函数
type ApiListFn = (params: TRequestParams) => Promise<AxiosResponse<HttpResponse<TResponse>, any>>;

// 表格大小设置
type TableSizeProps = 'mini' | 'small' | 'medium' | 'large';

// 表格列字段描述
type TableColumn = TableColumnData & { checked?: true };

// 获取密集选项配置
export const getDensityListOptions = (t: ComposerTranslation) => {
  return computed(() => [
    {
      name: t('table.size.mini'),
      value: 'mini',
    },
    {
      name: t('table.size.small'),
      value: 'small',
    },
    {
      name: t('table.size.medium'),
      value: 'medium',
    },
    {
      name: t('table.size.large'),
      value: 'large',
    },
  ]);
};

export function useTableProps(api: ApiListFn) {
  // 基础属性
  const propsTable = reactive({
    // 加载状态
    loading: <boolean>false,
    // 表格大小
    tableSize: <TableSizeProps>'medium',
    // 表格的列描述信息
    columns: <TableColumn[]>[],
    // 表格的列描述信息 - 和 columns 不同的是: 该字段用来仅展示表格数据筛选字段
    rowColumns: <TableColumn[]>[],
    // 表格源数据, 包括列表和分页数据等
    data: <HttpResponse<TResponse>>{},
    // 表格列表数据
    list: <Array<any>>[],
    // 表格选择行设置
    tableRowSelection: <TableRowSelection>{
      type: 'checkbox',     // 行选择器的类型 checkbox | radio
      showCheckedAll: true, // 是否显示全选选择器
      onlyCurrent: false,   // 是否仅展示当前页的 keys（切换分页时清空 keys）
    },
    // 表格多行选择的 Keys
    tableRowSelectedKeys: <number[]>[],
    // 开关状态
    visible: {
      // 表格多行选择删除开关, 控制 Model 确认弹窗
      rowSelectDelete: <boolean>false,
      // 新增数据开关
      add: <boolean>false,
      // 更新数据开关
      update: <boolean>false,
      // 详情数据开关
      info: <boolean>false,
    },
    // 分页
    pagination: <Pagination>{
      current: DEFAULT_PAGE_NUM,
      pageSize: DEFAULT_PAGE_SIZE,
      total: 0,
    },
  });

  // 表格列字段设定
  const tableColumns = ref();
  const setTableColumns = (columns: TableColumnData[]) => {
    tableColumns.value = computed<TableColumnData[]>(() => columns);
  };
  // 监听表格列数据变化, 将数据复制到 propsTable.columns 字段
  watch(
    () => tableColumns.value,
    (value) => {
      if (value) {
        // propsTable.columns 用来展示列表数据
        propsTable.columns = cloneDeep(value);
        propsTable.columns.forEach((item, index) => {
          item.checked = true;
        });

        propsTable.rowColumns = cloneDeep(propsTable.columns);
      }
    },
    { deep: true, immediate: true }
  );

  // 获取列表数据
  const getTableDataList = async () => {
    propsTable.loading = true;
    try {
      const { data } = await api({
        page: propsTable.pagination.current,
        size: propsTable.pagination.pageSize,
      });

      propsTable.data = data;
      propsTable.pagination.current = data.data.current_page ? data.data.current_page : DEFAULT_PAGE_NUM;
      propsTable.pagination.pageSize = data.data.size ? data.data.size : DEFAULT_PAGE_SIZE;
      // 列表数据 propsTable.data.data.list
      if (propsTable.data.data.list) {
        propsTable.list = propsTable.data.data.list;
      }

      propsTable.pagination.total = data.data.total ? data.data.total : propsTable.list.length;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      propsTable.loading = false;
    }
  };

  // 组件加载列表数据
  onMounted(() => getTableDataList());

  // 表格字段属性值
  const visibleTableAttributeChecked = (value: number) => {
    return value === 1;
  };

  // 表格字段属性更新
  const updateTableFieldAttribute = async (updateFieldApi: Promise<AxiosResponse<HttpResponse, any>>, fieldName: string, callback: () => void) => {
    propsTable.loading = true;
    try {
      if (fieldName === '') {
        fieldName = '数据属性';
      }

      const { data } = await updateFieldApi;
      if (data.ok) {
        MessageSuccess(`${fieldName} - 更新成功`);
        callback();
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      propsTable.loading = false;
    }
  };

  // 表格行数据删除
  const deleteTableDataLine = async (deleteApi: Promise<AxiosResponse<HttpResponse, any>>, title: string) => {
    propsTable.loading = true;
    try {
      const { data } = await deleteApi;
      if (data.ok) {
        // 当列表数据只剩一条(该删除后为0)并且当前页码大于1时, 则获取上一页数据
        if ((propsTable.list.length === 1) && (propsTable.pagination.current > 1)) {
          propsTable.pagination.current -= 1;
        }

        getTableDataList();

        NotificationSuccess(`${title} 已完成删除`);
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      propsTable.loading = false;
    }
  };

  // 表格选择行批量数据删除
  const deleteTableDataSelectBatchLine = async (deleteApi: Promise<AxiosResponse<HttpResponse, any>>) => {
    propsTable.loading = true;
    try {
      const { data } = await deleteApi;
      if (data.ok) {
        // 当列表数据都被删除并且当前页码大于1时, 则获取上一页数据
        const selectCount = propsTable.tableRowSelectedKeys.length;
        if (((propsTable.list.length - selectCount) === 1) && (propsTable.pagination.current > 1)) {
          propsTable.pagination.current -= 1;
        }

        getTableDataList();

        NotificationSuccess(`已选择的 ${selectCount} 条数据已完成删除`);
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      propsTable.loading = false;
    }
  };

  // 事件 - 表格分页发生改变时更新列表数据
  const eventTablePageChange = (current: number) => {
    propsTable.pagination.current = current;
    getTableDataList();
  };

  // 事件 - 刷新列表数据
  const eventTableRefreshDataList = () => {
    getTableDataList();
  };

  // 事件 - 处理密集选项
  const eventTableDataSelectDensity = (
    val: string | number | Record<string, any> | undefined,
    e: Event
  ) => {
    propsTable.tableSize = val as TableSizeProps;
  };

  /**
   * 表格数据筛选设置
   */
  // 事件 - 处理表格选项/列设置 改变相关逻辑
  const eventTableColumnChange = (
    checked: boolean | (string | boolean | number)[],
    column: TableColumn,
    index: number
  ) => {
    if (checked) {
      propsTable.columns.splice(index, 0, column);
    } else {
      const rowColumns = cloneDeep(propsTable.rowColumns);
      const columns = rowColumns.filter(
        (item) => item.dataIndex !== column.dataIndex
      );

      propsTable.columns.splice(0, propsTable.columns.length, ...columns);
    }
  };
  const eventTablePopupVisibleChange = (val: boolean) => {
    if (val) {
      nextTick(() => {
        const el = document.getElementById('tableSetting') as HTMLElement;
        const sortable = new Sortable(el, {
          onEnd(e: any) {
            const { oldIndex, newIndex } = e;
            exchangeArray(propsTable.columns, oldIndex, newIndex);
            exchangeArray(propsTable.rowColumns, oldIndex, newIndex);
          },
        });
      });
    }
  };

  // 事件 - 表格选择单行事件
  const eventTableRowSelected = (
    rowKeys: (string | number)[],
    rowKey: string | number,
    record: TableData
  ) => {
    if (propsTable.tableRowSelectedKeys.indexOf(record.id) === -1) {
      propsTable.tableRowSelectedKeys.push(record.id);
    } else {
      propsTable.tableRowSelectedKeys = propsTable.tableRowSelectedKeys.filter(
        (item) => item !== record.id
      );
    }
  };

  // 事件 - 表格选择行全选/反选
  const eventTableRowSelectedAll = () => {
    if (propsTable.tableRowSelectedKeys.length >= propsTable.list.length) {
      propsTable.tableRowSelectedKeys = [];
    } else {
      propsTable.list.forEach((item, index) => {
        if (Reflect.has(item, 'id')) {
          propsTable.tableRowSelectedKeys.push(Reflect.get(item, 'id'));
        }
      });

      // eslint-disable-next-line func-names
      propsTable.tableRowSelectedKeys = propsTable.tableRowSelectedKeys.filter(function (
        x,
        index,
        self
      ) {
        return self.indexOf(x) === index;
      });
    }
  };

  // 事件 - 点击删除操作弹窗确认提示
  const eventTableDeletePopConfirm = (content: string) => {
    return `确认要删除 ${content}吗?`;
  };

  // 事件 - 点击批量选择删除操作弹窗确认提示
  const eventTableSelectDeletePopConfirm = () => {
    if (propsTable.tableRowSelectedKeys.length === 0) {
      MessageWarning('请选择需要批量删除的数据源');
    } else {
      propsTable.visible.rowSelectDelete = true;
    }
  };

  return {
    propsTable,
    getTableDataList,
    setTableColumns,
    eventTablePageChange,
    eventTableRefreshDataList,
    eventTableDataSelectDensity,
    eventTableColumnChange,
    eventTableDeletePopConfirm,
    eventTablePopupVisibleChange,
    eventTableRowSelected,
    eventTableRowSelectedAll,
    eventTableSelectDeletePopConfirm,
    visibleTableAttributeChecked,
    updateTableFieldAttribute,
    deleteTableDataLine,
    deleteTableDataSelectBatchLine,
  };
}
