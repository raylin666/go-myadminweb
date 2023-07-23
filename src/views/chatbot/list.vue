<template>
  <div class="container">
    <AddArticleDrawerPage
      :visible="propsTable.visible.AddDrawer"
      @cancel="() => propsTable.visible.AddDrawer = false"
      @form-callback-success="formCallbackSuccess"
    />
    <UpdateArticleDrawerPage
      :visible="propsTable.visible.UpdateDrawer"
      :id="id"
      @cancel="() => propsTable.visible.UpdateDrawer = false"
      @form-callback-success="formCallbackSuccess"
    />
    <InfoArticleDrawerPage
      :visible="propsTable.visible.InfoDrawer"
      :id="id"
      @cancel="() => propsTable.visible.InfoDrawer = false"
    />

    <Breadcrumb :items="['menu.ai', 'menu.chatbot.list']" />
    <a-card class="general-card" :title="$t('menu.chatbot.list')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="propsForm.fields"
            :label-col-props="{ span: 3 }"
            :wrapper-col-props="{ span: 21 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item
                  field="number"
                  :label="$t('chatbot.form.number')"
                >
                  <a-input
                    v-model="propsForm.fields.number"
                    :placeholder="$t('chatbot.form.number.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  field="name"
                  :label="$t('chatbot.form.name')"
                >
                  <a-input
                    v-model="propsForm.fields.name"
                    :placeholder="$t('chatbot.form.name.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  field="pid"
                  :label="$t('chatbot.form.pid')"
                >
                  <a-select
                    v-model="propsForm.fields.pid"
                    :placeholder="$t('search.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  field="status"
                  :label="$t('chatbot.form.status')"
                >
                  <a-select
                    v-model="propsForm.fields.status"
                    :options="statusOptions"
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
            <a-button type="primary" @click="() => propsTable.visible.AddDrawer = true">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('chatbot.create') }}
            </a-button>
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
        :bordered="{ 'wrapper': true, 'headerCell': true }"
        :stripe="true"
        v-model:expandedKeys="expandedKeys"
        :hide-expand-button-on-empty="false"
        :scroll="{ x: 2000 }"
        @page-change="eventTablePageChange"
        @select="eventTableRowSelected"
      >
        <template #time_at="{ record }">
          <span style="color: #0960bd">{{ record.created_at }}</span>
          <br />
          <span style="color: orchid">{{ record.updated_at }}</span>
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
            <template #checked-icon><icon-check/></template>
            <template #unchecked-icon><icon-close/></template>
          </a-switch>
        </template>
        <template #operations="{ record }">
          <a-button v-permission="['admin']" type="primary" size="mini" @click="infoAction(record.id)">
            {{ $t('chatbot.columns.operations.info') }}
          </a-button>
          &nbsp;
          <a-button v-permission="['admin']" status="warning" size="mini" @click="updateAction(record.id)">
            {{ $t('chatbot.columns.operations.edit') }}
          </a-button>
          &nbsp;
          <a-popconfirm
            :content="eventTableDeletePopConfirm(`[${record.title}] 场景分类`)"
            type="warning"
            position="left"
            @ok="deleteTableDataLine(requestChatbotDelete(record.id), record.title)"
          >
            <a-button
              v-permission="['admin']"
              type="primary"
              status="danger"
              size="mini"
            >
              {{ $t('chatbot.columns.operations.delete') }}
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import {
    requestChatbotList,
    requestChatbotUpdateField,
    requestChatbotDelete,
  } from '@/api/chatbot';
  import { TRequestParams } from '@/types/global';
  import AddArticleDrawerPage from './components/add.vue';
  import UpdateArticleDrawerPage from './components/update.vue';
  import InfoArticleDrawerPage from './components/info.vue';
  import { ChatbotListParams } from '@/types/chatbot';
  import useFormProps from '@/hooks/form';
  import { useTableProps, getDensityListOptions } from '@/hooks/table';
  import { ListColumns, getStatusOptions } from './data/table';
  import { searchFormModel } from './data/form'

  /**
   * 国际语言
   */
   const { t } = useI18n();

  /**
   * 表格组件
   */
  // 列表接口请求函数
  const apiDataListFn = (params: ChatbotListParams | TRequestParams) => {
    return requestChatbotList(params);
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
    visibleTableAttributeChecked,
    updateTableFieldAttribute,
    deleteTableDataLine,
  } = useTableProps(apiDataListFn);

  // 表格列字段设定
  setTableColumns(ListColumns(t));

  // 获取密集选项配置
  const densityListOptions = getDensityListOptions(t);
  // 获取状态选项配置
  const statusOptions = getStatusOptions(t);

  // 树形数据展开所有
  const expandedKeys = ref([]);
  watch(
    () => propsTable.list,
    (list) => {
      list.forEach((item: any) => {
        expandedKeys.value.push(item.id);
      });
    }
  );

  /**
   * 表格属性更新处理
   */
  // 表格状态改变事件
  const visibleTableAttributeStatusChecked = (record: any) => {
    visibleTableAttributeChecked(record.status)
    return record.status === 1;
  };
  const eventTableAttributeStatusChange = (record: any, rowIndex: any) => {
    const value = record.status === 1 ? 0 : 1;
    const callback = function () {
      propsTable.list[rowIndex].status = value;
    };
    updateTableFieldAttribute(requestChatbotUpdateField(record.id, 'status', value.toString()), '分类状态', callback);
  };

  /**
   * 表单组件
   */
  const {
    propsForm,
    eventFormResetFields,
    eventFormSearch,
  } = useFormProps(searchFormModel);

  // 新增/修改 表单提交成功后的回调处理
  const formCallbackSuccess = (id: string | number) => {
    getTableDataList();
  };

  // 当前点击获取的业务ID
  const id = ref(0);
  const infoAction = (articleId: number) => {
    propsTable.visible.InfoDrawer = true;
    id.value = articleId;
  };
  const updateAction = (articleId: number) => {
    propsTable.visible.UpdateDrawer = true;
    id.value = articleId;
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
