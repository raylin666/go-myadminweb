<template>
  <div class="container">
    <AddArticleDrawerPage
      :visible="visibleAddDrawer"
      @cancel="closeAddDrawer"
    />

    <Breadcrumb :items="['menu.article', 'menu.article.list']" />
    <a-card class="general-card" :title="$t('menu.article.list')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="number"
                  :label="$t('articleList.form.number')"
                >
                  <a-input
                    v-model="formModel.number"
                    :placeholder="$t('articleList.form.number.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="title"
                  :label="$t('articleList.form.title')"
                >
                  <a-input
                    v-model="formModel.title"
                    :placeholder="$t('articleList.form.title.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="category"
                  :label="$t('articleList.form.category')"
                >
                  <a-select
                    v-model="formModel.category"
                    :placeholder="$t('search.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="created_at"
                  :label="$t('articleList.form.createdAt')"
                >
                  <a-range-picker
                    v-model="formModel.createdAt"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="status"
                  :label="$t('articleList.form.status')"
                >
                  <a-select
                    v-model="formModel.status"
                    :options="statusOptions"
                    :placeholder="$t('search.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="recommend"
                  :label="$t('articleList.form.recommend')"
                >
                  <a-select
                    v-model="formModel.recommend"
                    :options="recommendOptions"
                    :placeholder="$t('search.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="eventSearchForm">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('search.form.search') }}
            </a-button>
            <a-button @click="eventResetSearchForm">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('search.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="openAddDrawer">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('articleList.create') }}
            </a-button>
            <a-button
              type="primary"
              status="danger"
              @click="eventConfirmPopDeleteBatchModal"
            >
              <template #icon>
                <icon-minus />
              </template>
              {{ $t('action.operation.delete') }}
            </a-button>
            <a-modal
              v-model:visible="visibleConfirmPopDeleteBatchModal"
              @ok="apiDeleteBatchHandle"
            >
              <template #title
                ><icon-exclamation-circle
                  size="20"
                  style="color: orange"
                />&nbsp;&nbsp;
                <span style="font-size: 16px; color: orange"
                  >温馨提示</span
                ></template
              >
              <div
                style="font-weight: 200; font-size: medium; text-align: center"
                >您必须要谨慎作出选择, 确认要删除所选的
                {{ tableRowSelectedKeys.length }} 篇文章吗 ?</div
              >
            </a-modal>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-tooltip :content="$t('table.actions.refresh')">
            <div class="action-icon" @click="eventSearchForm"
              ><icon-refresh size="18"
            /></div>
          </a-tooltip>
          <a-dropdown @select="eventTableDataSelectDensity">
            <a-tooltip :content="$t('table.actions.density')">
              <div class="action-icon"><icon-line-height size="18" /></div>
            </a-tooltip>
            <template #content>
              <a-doption
                v-for="item in densityListOptions"
                :key="item.value"
                :value="item.value"
                :class="{ active: item.value === tableSize }"
              >
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
          <a-tooltip :content="$t('table.actions.columnSetting')">
            <a-popover
              trigger="click"
              position="bl"
              @popup-visible-change="eventTablePopupVisibleChange"
            >
              <div class="action-icon"><icon-settings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div
                    v-for="(item, index) in showColumns"
                    :key="item.dataIndex"
                    class="setting"
                  >
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox
                        v-model="item.checked"
                        @change="eventTableColumnChange($event, item, index)"
                      >
                      </a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title === '#' ? '序列号' : item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="cloneColumns"
        :data="tableRenderData"
        :bordered="false"
        :size="tableSize"
        :stripe="true"
        :row-selection="tableRowSelection"
        :selected-keys="tableRowSelectedKeys"
        :scroll="{ x: 2000 }"
        @page-change="eventTablePageChange"
        @select-all="eventTableRowSelectedAll"
        @select="eventTableRowSelected"
      >
        <template #cover="{ record }">
          <a-avatar :size="54" shape="square">
            <img :alt="record.cover" :src="record.cover" />
          </a-avatar>
        </template>
        <template #publisher_user="{ record }">
          {{ record.author }} (ID: {{ record.user_id }})
        </template>
        <template #time_at="{ record }">
          <span style="color: #0960bd">{{ record.created_at }}</span>
          <br />
          <span style="color: orchid">{{ record.updated_at }}</span>
        </template>
        <template #category="{ record }">
          <a-tag
            v-for="(item, index) in record.category"
            :key="index"
            bordered
            :color="categoryColor"
            style="margin-right: 5px"
          >
            <template #icon>
              <icon-tag />
            </template>
            {{ item.name }}
          </a-tag>
        </template>
        <template #status="{ record }">
          <a-switch
            :default-checked="visibleTableAttributeStatusChecked(record.status)"
            checked-color="#16c516"
            unchecked-color="red"
            type="round"
            @change="eventTableAttributeStatusChange(record.id, record.status)"
          >
            <template #checked>已启用</template>
            <template #unchecked>已禁用</template>
          </a-switch>
        </template>
        <template #recommend_flag="{ record }">
          <a-switch
            :default-checked="
              visibleTableAttributeRecommendChecked(record.recommend_flag)
            "
            checked-color="#16c516"
            unchecked-color="red"
            type="round"
            @change="
              eventTableAttributeRecommendChange(
                record.id,
                record.recommend_flag
              )
            "
          >
            <template #checked>已推荐</template>
            <template #unchecked>未推荐</template>
          </a-switch>
        </template>
        <template #commented_flag="{ record }">
          <a-switch
            :default-checked="
              visibleTableAttributeCommentedChecked(record.commented_flag)
            "
            checked-color="#16c516"
            unchecked-color="red"
            type="round"
            @change="
              eventTableAttributeCommentedChange(
                record.id,
                record.commented_flag
              )
            "
          >
            <template #checked>已启用</template>
            <template #unchecked>已禁用</template>
          </a-switch>
        </template>
        <template #operations="{ record }">
          <a-button v-permission="['admin']" type="primary" size="mini">
            {{ $t('articleList.columns.operations.info') }}
          </a-button>
          &nbsp;
          <a-button v-permission="['admin']" status="warning" size="mini">
            {{ $t('articleList.columns.operations.edit') }}
          </a-button>
          &nbsp;
          <a-popconfirm
            :content="confirmPopDeleteModal(record.title)"
            type="warning"
            position="left"
            @ok="apiDeleteHandle(record.id, record.title)"
          >
            <a-button
              v-permission="['admin']"
              type="primary"
              status="danger"
              size="mini"
            >
              {{ $t('articleList.columns.operations.delete') }}
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import {
    requestArticleList,
    requestArticleDelete,
    requestArticleUpdateField,
    ArticleList,
    ArticleListParams,
  } from '@/api/article';
  import { Pagination } from '@/types/global';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';
  import {
    MessageSuccess,
    MessageWarning,
    MessageError,
    NotificationError,
    NotificationSuccess,
  } from '@/utils/notification';
  import { exchangeArray } from '@/utils/array';
  import AddArticleDrawerPage from './components/add.vue';

  /**
   * 加载状态设置
   */
  const { loading, setLoading } = useLoading(true);

  /**
   * 国际语言
   */
  const { t } = useI18n();

  /**
   * 新增文章抽屉
   */
  const visibleAddDrawer = ref(false);
  // 开启新增文章抽屉
  const openAddDrawer = () => {
    visibleAddDrawer.value = true;
  };
  // 关闭新增文章抽屉
  const closeAddDrawer = () => {
    visibleAddDrawer.value = false;
  };

  /**
   * 分页处理
   */
  // 分页配置
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  // 表格分页发生改变时触发
  const eventTablePageChange = (current: number) => {
    basePagination.current = current;
    apiListHandle({
      page: current,
      size: basePagination.pageSize,
    });
  };

  /**
   * 基础属性设置
   */
  // 状态选项配置
  const statusOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('articleList.form.status.open'),
      value: 1,
    },
    {
      label: t('articleList.form.status.close'),
      value: 0,
    },
  ]);
  // 推荐选项配置
  const recommendOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('articleList.form.recommend.yes'),
      value: 1,
    },
    {
      label: t('articleList.form.recommend.no'),
      value: 0,
    },
  ]);
  // 密集选项配置
  const densityListOptions = computed(() => [
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
  // 表格大小设置
  type TableSizeProps = 'mini' | 'small' | 'medium' | 'large';
  const tableSize = ref<TableSizeProps>('medium');
  // 表格列描述 类型为: TableColumnData[]
  type TableColumn = TableColumnData & { checked?: true };
  const cloneColumns = ref<TableColumn[]>([]);
  const showColumns = ref<TableColumn[]>([]);
  // 表格分类字段 Tag 颜色选项
  const tableColumnTagColors = [
    'orangered',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'arcoblue',
    'purple',
    'pinkpurple',
    'magenta',
    'gray',
  ];
  const categoryColor =
    tableColumnTagColors[
      Math.floor(Math.random() * tableColumnTagColors.length + 1) - 1
    ];

  /**
   * 表格数据筛选设置
   */
  // 处理密集选项相关事件
  const eventTableDataSelectDensity = (
    val: string | number | Record<string, any> | undefined,
    e: Event
  ) => {
    tableSize.value = val as TableSizeProps;
  };
  // 处理表格选项/列设置 改变相关逻辑
  const eventTableColumnChange = (
    checked: boolean | (string | boolean | number)[],
    column: TableColumn,
    index: number
  ) => {
    if (!checked) {
      cloneColumns.value = showColumns.value.filter(
        (item) => item.dataIndex !== column.dataIndex
      );
    } else {
      cloneColumns.value.splice(index, 0, column);
    }
  };
  const eventTablePopupVisibleChange = (val: boolean) => {
    if (val) {
      nextTick(() => {
        const el = document.getElementById('tableSetting') as HTMLElement;
        const sortable = new Sortable(el, {
          onEnd(e: any) {
            const { oldIndex, newIndex } = e;
            exchangeArray(cloneColumns.value, oldIndex, newIndex);
            exchangeArray(showColumns.value, oldIndex, newIndex);
          },
        });
      });
    }
  };

  /**
   * 表格行选择
   */
  // 表格选择行设置
  const tableRowSelection = reactive({
    type: 'checkbox', // 行选择器的类型 checkbox | radio
    showCheckedAll: true, // 是否显示全选选择器
    onlyCurrent: false, // 是否仅展示当前页的 keys（切换分页时清空 keys）
  });
  // 表格选择行全选的Keys
  const tableRowSelectedKeys = ref<number[]>([]);
  // 表格选择行全选事件
  const eventTableRowSelectedAll = () => {
    if (tableRowSelectedKeys.value.length >= tableRenderData.value.length) {
      tableRowSelectedKeys.value = [];
    } else {
      tableRenderData.value.forEach((item, index) => {
        tableRowSelectedKeys.value.push(item.id);
      });

      // eslint-disable-next-line func-names
      tableRowSelectedKeys.value = tableRowSelectedKeys.value.filter(function (
        x,
        index,
        self
      ) {
        return self.indexOf(x) === index;
      });
    }
  };
  // 表格选择单行事件
  const eventTableRowSelected = (
    rowKeys: string | number[],
    rowKey: string | number,
    record: ArticleList
  ) => {
    if (tableRowSelectedKeys.value.indexOf(record.id) === -1) {
      tableRowSelectedKeys.value.push(record.id);
    } else {
      tableRowSelectedKeys.value = tableRowSelectedKeys.value.filter(
        (item) => item !== record.id
      );
    }
  };

  /**
   * 表格字段
   */
  // 表格列字段设定
  const columns = computed<TableColumnData[]>(() => [
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
      width: 200,
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
  ]);

  /**
   * 搜索表单相关设置
   */
  // 表单模型数据初始化 - 对应 form 字段
  const generateFormModel = () => {
    return {
      number: '',
      title: '',
      category: [],
      createdAt: [],
      status: undefined,
      recommend: undefined,
    };
  };
  const formModel = ref(generateFormModel());
  // 搜索处理
  const eventSearchForm = () => {
    apiListHandle({
      page: basePagination.current,
      size: basePagination.pageSize,
      ...formModel.value,
    } as unknown as ArticleListParams);
  };
  // 重置搜索表单
  const eventResetSearchForm = () => {
    formModel.value = generateFormModel();
  };

  /**
   * 渲染列表数据
   */
  // 表格字段内容数据渲染
  const tableRenderData = ref<ArticleList[]>([]);
  // 请求表格列表数据
  const apiListHandle = async (
    params: ArticleListParams = {
      page: basePagination.current,
      size: basePagination.pageSize,
    }
  ) => {
    setLoading(true);
    try {
      const { data } = await requestArticleList(params);
      tableRenderData.value = data.list;
      pagination.current = params.page;
      pagination.total = data.total;
      pagination.pageSize = data.size;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  apiListHandle();

  /**
   * 弹窗 删除/批量删除 文章模态框
   */
  // 删除文章弹窗确认
  const confirmPopDeleteModal = (title: string) => {
    return `确认要删除 ${title} 这篇文章吗?`;
  };
  // 请求文章删除接口
  const apiDeleteHandle = (id: string | number, title: string) => {
    setLoading(true);
    try {
      requestArticleDelete(id);

      setTimeout(() => {
        NotificationSuccess(`${title} 文章已完成删除`);
        apiListHandle({
          page: basePagination.current,
          size: basePagination.pageSize,
          ...formModel.value,
        } as unknown as ArticleListParams);
      }, 600);
    } catch (err) {
      // you can report use errorHandler or other
      NotificationError(`${title} 文章删除失败`);
    } finally {
      setLoading(false);
    }
  };
  // 点击批量删除文章
  const visibleConfirmPopDeleteBatchModal = ref(false);
  const eventConfirmPopDeleteBatchModal = () => {
    if (tableRowSelectedKeys.value.length === 0) {
      MessageWarning('请先选择需要批量删除的文章');
    } else {
      visibleConfirmPopDeleteBatchModal.value = true;
    }
  };
  // 处理批量删除逻辑
  const apiDeleteBatchHandle = () => {};

  /**
   * 表格属性更新处理
   */
  // 表格状态改变事件
  const visibleTableAttributeStatusChecked = (val: number) => {
    return val === 1;
  };
  const eventTableAttributeStatusChange = (id: string, value: number) => {
    value = value === 1 ? 0 : 1;
    apiUpdateFieldHandle(id, 'status', value.toString());
  };
  // 表格推荐改变事件
  const visibleTableAttributeRecommendChecked = (val: number) => {
    return val === 1;
  };
  const eventTableAttributeRecommendChange = (id: string, value: boolean) => {
    value = !value;
    apiUpdateFieldHandle(id, 'recommend_flag', value.toString());
  };
  // 表格可评论改变事件
  const visibleTableAttributeCommentedChecked = (val: number) => {
    return val === 1;
  };
  const eventTableAttributeCommentedChange = (id: string, value: boolean) => {
    value = !value;
    apiUpdateFieldHandle(id, 'commented_flag', value.toString());
  };

  /**
   * 处理文章属性更新
   * @param id
   * @param field
   * @param value
   */
  const apiUpdateFieldHandle = async (
    id: string | number,
    field: string,
    value: string
  ) => {
    setLoading(true);
    try {
      const { data } = await requestArticleUpdateField(id, field, value);
      if (data) {
        MessageSuccess('文章属性更新成功');
      } else {
        MessageError('文章属性更新失败');
      }
    } catch (err) {
      // you can report use errorHandler or other
      MessageError('文章属性更新失败');
    } finally {
      setLoading(false);
    }
  };

  // 监听处理
  watch(
    () => columns.value,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    { deep: true, immediate: true }
  );
</script>

<script lang="ts">
  export default {
    name: 'ArticleList',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
