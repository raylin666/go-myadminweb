<template>
  <div class="container">
    <AddArticleDrawerPage
      :visible="propsTable.visible.AddDrawer"
      @cancel="() => propsTable.visible.AddDrawer = false"
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
                  :label="$t('articleList.form.number')"
                >
                  <a-input
                    v-model="propsForm.fields.number"
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
                    v-model="propsForm.fields.title"
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
                    v-model="propsForm.fields.category"
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
                    v-model="propsForm.fields.createdAt"
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
                    v-model="propsForm.fields.status"
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
            <a-button @click="eventFormResetSearchFields">
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
            <a-button type="primary" @click="() => propsTable.visible.AddDrawer = true">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('articleList.create') }}
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
              @ok="deleteTableDataSelectBatchLine(requestArticleBatchDelete(propsTable.tableRowSelectedKeys))"
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
        :bordered="false"
        :stripe="true"
        :row-selection="propsTable.tableRowSelection"
        :selected-keys="propsTable.tableRowSelectedKeys"
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
            :color="getRandColor"
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
            :content="eventTableDeletePopConfirm(`${record.title} 这篇文章`)"
            type="warning"
            position="left"
            @ok="deleteTableDataLine(requestArticleDelete(record.id), record.title)"
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
  import { ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import {
    requestArticleList,
    requestArticleDelete,
    requestArticleBatchDelete,
    requestArticleUpdateField,
  } from '@/api/article';
  import { TRequestParams } from '@/types/global';
  import AddArticleDrawerPage from './components/add.vue';
  import getRandColor from '@/utils/color';
  import { ArticleListParams } from '@/types/article';
  import useFormProps from '@/hooks/form';
  import { useTableProps, getDensityListOptions } from '@/hooks/table';
  import { ListColumns, getStatusOptions, getRecommendOptions } from './data/table';
  import { FormModel, FormModelInterface } from './data/form'

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
    visibleTableAttributeChecked,
    updateTableFieldAttribute,
    deleteTableDataLine,
    eventTableSelectDeletePopConfirm,
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
  const visibleTableAttributeStatusChecked = (value: number) => visibleTableAttributeChecked(value);
  const eventTableAttributeStatusChange = (id: string, value: number) => {
    value = value === 1 ? 0 : 1;
    updateTableFieldAttribute(requestArticleUpdateField(id, 'status', value.toString()), '文章状态');
  };
  // 表格推荐改变事件
  const visibleTableAttributeRecommendChecked = (value: number) => visibleTableAttributeChecked(value);
  const eventTableAttributeRecommendChange = (id: string, value: number) => {
    value = value === 1 ? 0 : 1;
    updateTableFieldAttribute(requestArticleUpdateField(id, 'recommend_flag', value.toString()), '文章推荐');
  };
  // 表格可评论改变事件
  const visibleTableAttributeCommentedChecked = (value: number) => visibleTableAttributeChecked(value);
  const eventTableAttributeCommentedChange = (id: string, value: number) => {
    value = value === 1 ? 0 : 1;
    updateTableFieldAttribute(requestArticleUpdateField(id, 'commented_flag', value.toString()), '文章评论');
  };

  /**
   * 表单组件
   */
  const {
    propsForm,
    eventFormResetSearchFields,
    eventFormSearch,
  } = useFormProps(FormModel);
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
