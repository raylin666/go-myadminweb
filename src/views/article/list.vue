<template>
  <div class="container">
    <AddArticleDrawerPage
      :visible="propsTable.visible.add"
      @cancel="() => (propsTable.visible.add = false)"
      @form-callback-success="formCallbackSuccess"
    />
    <UpdateArticleDrawerPage
      :visible="propsTable.visible.update"
      :id="id"
      @cancel="() => (propsTable.visible.update = false)"
      @form-callback-success="formCallbackSuccess"
    />
    <InfoArticleDrawerPage
      :visible="propsTable.visible.info"
      :id="id"
      @cancel="() => (propsTable.visible.info = false)"
    />

    <Breadcrumb :items="['menu.article', 'menu.article.list']" />
    <a-card class="general-card" :title="$t('menu.article.list')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="propsForm.fields"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="number"
                  :label="$t('article.list.form.number')"
                >
                  <a-input
                    v-model="propsForm.fields.number"
                    :placeholder="$t('article.list.form.number.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="title"
                  :label="$t('article.list.form.title')"
                >
                  <a-input
                    v-model="propsForm.fields.title"
                    :placeholder="$t('article.list.form.title.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="category"
                  :label="$t('article.list.form.category')"
                >
                  <a-select
                    v-model="propsForm.fields.category"
                    :placeholder="$t('search.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="created_at"
                  :label="$t('article.list.form.createdAt')"
                >
                  <a-range-picker
                    v-model="propsForm.fields.createdAt"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="status"
                  :label="$t('article.list.form.status')"
                >
                  <a-select
                    v-model="propsForm.fields.status"
                    :options="statusOptions"
                    :placeholder="$t('search.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="recommend"
                  :label="$t('article.list.form.recommend')"
                >
                  <a-select
                    v-model="propsForm.fields.recommend"
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
            <a-button type="primary" @click="eventFormSearch">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('search.form.search') }}
            </a-button>
            <a-button @click="eventFormResetFields">
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
            <a-button
              type="primary"
              @click="() => (propsTable.visible.add = true)"
            >
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('article.list.create') }}
            </a-button>
            <a-button
              type="primary"
              status="danger"
              @click="eventTableSelectDeletePopConfirm"
            >
              <template #icon>
                <icon-minus />
              </template>
              {{ $t('action.operation.delete') }}
            </a-button>
            <a-modal
              v-model:visible="propsTable.visible.rowSelectDelete"
              @ok="
                deleteTableDataSelectBatchLine(
                  requestArticleBatchDelete(propsTable.tableRowSelectedKeys)
                )
              "
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
                {{ propsTable.tableRowSelectedKeys.length }} 篇文章吗 ?</div
              >
            </a-modal>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-tooltip :content="$t('table.actions.refresh')">
            <div class="action-icon" @click="eventTableRefreshDataList"
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
                :class="{ active: item.value === propsTable.tableSize }"
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
                    v-for="(item, index) in propsTable.rowColumns"
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
        :loading="propsTable.loading"
        :pagination="propsTable.pagination"
        :columns="propsTable.columns"
        :data="propsTable.list"
        :size="propsTable.tableSize"
        :bordered="{ wrapper: true, headerCell: true }"
        :stripe="true"
        :row-selection="propsTable.tableRowSelection"
        :selected-keys="propsTable.tableRowSelectedKeys"
        :scroll="{ x: 2000 }"
        @page-change="eventTablePageChange"
        @select-all="eventTableRowSelectedAll"
        @select="eventTableRowSelected"
      >
        <template #cover="{ record }">
          <a-image
            width="90"
            :alt="record.cover"
            :src="record.cover"
            style="cursor: pointer"
          ></a-image>
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
            :color="item.color"
            style="margin-right: 5px; margin-bottom: 5px; border: 0"
          >
            <template #icon>
              <icon-tag style="color: #ffffff" />
            </template>
            {{ item.name }}
          </a-tag>
        </template>
        <template #status="{ record, rowIndex }">
          <a-switch
            :v-model="propsTable.list[rowIndex].status"
            :default-checked="visibleTableAttributeStatusChecked(record)"
            checked-color="#16c516"
            unchecked-color="red"
            type="round"
            @change="eventTableAttributeStatusChange(record, rowIndex)"
          >
            <template #checked>已启用</template>
            <template #unchecked>已禁用</template>
            <template #checked-icon><icon-check /></template>
            <template #unchecked-icon><icon-close /></template>
          </a-switch>
        </template>
        <template #recommend_flag="{ record, rowIndex }">
          <a-switch
            :v-model="propsTable.list[rowIndex].recommend_flag"
            :default-checked="visibleTableAttributeRecommendChecked(record)"
            checked-color="#16c516"
            unchecked-color="red"
            type="round"
            @change="eventTableAttributeRecommendChange(record, rowIndex)"
          >
            <template #checked>已推荐</template>
            <template #unchecked>未推荐</template>
            <template #checked-icon><icon-check /></template>
            <template #unchecked-icon><icon-close /></template>
          </a-switch>
        </template>
        <template #commented_flag="{ record, rowIndex }">
          <a-switch
            :default-checked="visibleTableAttributeCommentedChecked(record)"
            checked-color="#16c516"
            unchecked-color="red"
            type="round"
            @change="eventTableAttributeCommentedChange(record, rowIndex)"
          >
            <template #checked>已启用</template>
            <template #unchecked>已禁用</template>
            <template #checked-icon><icon-check /></template>
            <template #unchecked-icon><icon-close /></template>
          </a-switch>
        </template>
        <template #operations="{ record }">
          <a-button
            v-permission="['admin']"
            type="primary"
            size="mini"
            @click="infoAction(record.id)"
          >
            {{ $t('article.list.columns.operations.info') }}
          </a-button>
          &nbsp;
          <a-button
            v-permission="['admin']"
            status="warning"
            size="mini"
            @click="updateAction(record.id)"
          >
            {{ $t('article.list.columns.operations.edit') }}
          </a-button>
          &nbsp;
          <a-popconfirm
            :content="eventTableDeletePopConfirm(`[${record.title}] 这篇文章`)"
            type="warning"
            position="left"
            @ok="
              deleteTableDataLine(requestArticleDelete(record.id), record.title)
            "
          >
            <a-button
              v-permission="['admin']"
              type="primary"
              status="danger"
              size="mini"
            >
              {{ $t('article.list.columns.operations.delete') }}
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import {
    requestArticleList,
    requestArticleDelete,
    requestArticleBatchDelete,
    requestArticleUpdateField,
  } from '@/api/article';
  import { TRequestParams } from '@/types/global';
  import AddArticleDrawerPage from './components/add.vue';
  import UpdateArticleDrawerPage from './components/update.vue';
  import InfoArticleDrawerPage from './components/info.vue';
  import { ArticleListParams } from '@/types/article';
  import useFormProps from '@/hooks/form';
  import { useTableProps, getDensityListOptions } from '@/hooks/table';
  import {
    ListColumns,
    getStatusOptions,
    getRecommendOptions,
  } from './data/table';
  import { searchFormModel } from './data/form';

  /**
   * 国际语言
   */
  const { t } = useI18n();

  /**
   * 表格组件
   */
  // 列表接口请求函数
  const apiDataListFn = (params: ArticleListParams | TRequestParams) => {
    return requestArticleList(params);
  };

  const {
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
  } = useTableProps(apiDataListFn);

  // 表格列字段设定
  setTableColumns(ListColumns(t));

  // 获取密集选项配置
  const densityListOptions = getDensityListOptions(t);
  // 获取状态选项配置
  const statusOptions = getStatusOptions(t);
  // 获取推荐选项配置
  const recommendOptions = getRecommendOptions(t);

  /**
   * 表格属性更新处理
   */
  // 表格状态改变事件
  const visibleTableAttributeStatusChecked = (record: any) => {
    visibleTableAttributeChecked(record.status);
    return record.status === 1;
  };
  const eventTableAttributeStatusChange = (record: any, rowIndex: any) => {
    const value = record.status === 1 ? 0 : 1;
    const callback = function () {
      propsTable.list[rowIndex].status = value;
    };
    updateTableFieldAttribute(
      requestArticleUpdateField(record.id, 'status', value.toString()),
      '文章状态',
      callback
    );
  };
  // 表格推荐改变事件
  const visibleTableAttributeRecommendChecked = (record: any) => {
    visibleTableAttributeChecked(record.recommend_flag);
    return record.recommend_flag === 1;
  };
  const eventTableAttributeRecommendChange = (record: any, rowIndex: any) => {
    const value = record.recommend_flag === 1 ? 0 : 1;
    const callback = function () {
      propsTable.list[rowIndex].recommend_flag = value;
    };
    updateTableFieldAttribute(
      requestArticleUpdateField(record.id, 'recommend_flag', value.toString()),
      '文章推荐',
      callback
    );
  };
  // 表格可评论改变事件
  const visibleTableAttributeCommentedChecked = (record: any) => {
    visibleTableAttributeChecked(record.commented_flag);
    return record.commented_flag === 1;
  };
  const eventTableAttributeCommentedChange = (record: any, rowIndex: any) => {
    const value = record.commented_flag === 1 ? 0 : 1;
    const callback = function () {
      propsTable.list[rowIndex].commented_flag = value;
    };
    updateTableFieldAttribute(
      requestArticleUpdateField(record.id, 'commented_flag', value.toString()),
      '文章评论',
      callback
    );
  };

  /**
   * 表单组件
   */
  const { propsForm, eventFormResetFields, eventFormSearch } =
    useFormProps(searchFormModel);

  // 新增/修改 表单提交成功后的回调处理
  const formCallbackSuccess = (id: string | number) => {
    getTableDataList();
  };

  // 当前点击获取的业务ID
  const id = ref(0);
  const infoAction = (businessId: number) => {
    propsTable.visible.info = true;
    id.value = businessId;
  };
  const updateAction = (businessId: number) => {
    propsTable.visible.update = true;
    id.value = businessId;
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
