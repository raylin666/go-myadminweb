<template>
  <a-modal 
    :visible="visible"
    width="50%"
    unmount-on-close
    :mask-closable="false"
    @cancel="emit('cancel')" 
    @ok="eventFormSubmitClick('form-submit')">
    <template #title> {{ t('chatbot.form.basic.update.title') }} </template>

    <div>
      <p></p>
      <a-space direction="vertical" size="large" :style="{ width: '100%' }">
        <a-form
          :model="propsForm.fields"
          :layout="propsForm.layoutMode"
          @submit="eventFormSubmit"
          @submit-failed="eventFormSubmitFailed"
          @submit-success="handleSubmitSuccess"
        >
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item
                field="name"
                :label="$t('chatbot.form.basic.name')"
                :rules="[
                  {
                    required: true,
                    message: $t('chatbot.form.basic.name.validate.message'),
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
                <a-input
                  v-model="propsForm.fields.name"
                  allow-clear
                  :placeholder="$t('chatbot.form.basic.name.placeholder')"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item
                field="pid"
                :label="$t('chatbot.form.basic.pid')"
                :rules="[
                  {
                    required: true,
                    message: $t('chatbot.form.basic.pid.validate.message'),
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
                <a-select
                  v-model="propsForm.fields.pid"
                  :options="categoryOptions"
                  :field-names="{ value: 'id', label: 'name' }"
                  allow-clear
                  :placeholder="$t('chatbot.form.basic.pid.placeholder')"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item
                field="icon"
                :label="$t('chatbot.form.basic.icon')"
                :rules="[
                  {
                    required: true,
                    message: $t('chatbot.form.basic.icon.validate.message'),
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
              <!-- 后续做成筛选查找 -->
                <a-input
                  v-model="propsForm.fields.icon"
                  allow-clear
                  :placeholder="$t('chatbot.form.basic.icon.placeholder')"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item
                field="describe"
                :label="$t('chatbot.form.basic.describe')"
                :rules="[
                  {
                    required: true,
                    message: $t('chatbot.form.basic.describe.validate.message'),
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
                <a-textarea
                  v-model="propsForm.fields.describe"
                  :placeholder="$t('chatbot.form.basic.describe.placeholder')"
                  :max-length="{ length: 250, errorOnly: true }"
                  allow-clear
                  show-word-limit
                  style="height: 92px;"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item
                field="question"
                :label="$t('chatbot.form.basic.question')"
              >
                <a-textarea
                  v-model="propsForm.fields.question"
                  :placeholder="$t('chatbot.form.basic.question.placeholder')"
                  :max-length="{ length: 250, errorOnly: true }"
                  allow-clear
                  show-word-limit
                  style="height: 92px;"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item
                field="sort"
                :label="$t('chatbot.form.basic.sort')"
                :rules="[
                  {
                    required: true,
                    message: $t('chatbot.form.basic.sort.validate.message'),
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
                <a-input-number
                  v-model="propsForm.fields.sort"
                  :placeholder="$t('chatbot.form.basic.sort.placeholder')"
                  :min="0"
                  :max="65535"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8"></a-col>
            <a-col :span="4">
              <a-form-item
                field="status"
                :label="$t('chatbot.form.basic.status')"
              >
                <a-switch
                  v-model="propsForm.fields.status"
                  type="round"
                  checked-color="#d700ca"
                >
                  <template #checked>ON</template>
                  <template #unchecked>OFF</template>
                  <template #checked-icon><icon-check/></template>
                  <template #unchecked-icon><icon-close/></template>
                </a-switch>
              </a-form-item>
            </a-col>
          </a-row>
          <a-button
            id="form-submit"
            html-type="submit"
            style="display: none"
          ></a-button>
        </a-form>
      </a-space>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
  import { PropType, reactive, onMounted, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { requestChatbotListSelect, requestChatbotInfo, requestChatbotUpdate } from '@/api/chatbot';
  import useFormProps from '@/hooks/form';
  import { FormModel } from '../data/form';

  /**
   * 定义调用该组件的父级组件中的传递属性
   */
  const props = defineProps({
    visible: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    id: {
      type: Number as PropType<number>,
      default: 0,
    },
  });

  /**
   * 定义调用该组件的父级组件中的传递方法
   *    cancel: 关闭抽屉
   *    formCallbackSuccess: 表单提交成功后回调处理函数
   */
  const emit = defineEmits(['cancel', 'formCallbackSuccess']);

  /**
   * 国际语言
   */
  const { t } = useI18n();

  /**
   * 表单组件
   */
  const {
    propsForm,
    eventFormResetFields,
    eventFormSubmitClick,
    eventFormSubmit,
    eventFormSubmitSuccess,
    eventFormSubmitFailed,
  } = useFormProps(FormModel);

  /**
   * 文章分类选项
   */
  const categoryOptions: any[] = reactive([{id: 0, name: '顶级分类'}]);
  onMounted(async () => {
    try {
      const { data } = await requestChatbotListSelect();
      if (data.ok) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < data.data.list.length; i++) {
          categoryOptions.push({
            id: data.data.list[i].id,
            name: data.data.list[i].name,
          });
        }
      }
    } catch (err) {
      // you can report use errorHandler or other
    }
  });

  watch(
    () => props.visible,
    async (value) => {
      if (value === true) {
        eventFormResetFields();
        // 请求详情接口
        const { data } = await requestChatbotInfo(props.id);
        if (data.ok) {
          propsForm.fields.name = data.data.name;
          propsForm.fields.icon = data.data.icon;
          propsForm.fields.describe = data.data.describe;
          propsForm.fields.question = data.data.question;
          propsForm.fields.status = data.data.status === 1;
          propsForm.fields.sort = data.data.sort;
          propsForm.fields.pid = 0;
          if (data.data.pid) {
            propsForm.fields.pid = data.data.pid;
          }
        }
      }
    }
  );

  /**
   * 表单提交成功逻辑处理
   */
  const handleSubmitSuccess = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  }) => {
    const requestFn = requestChatbotUpdate(props.id, {
      name: propsForm.fields.name,
      pid: propsForm.fields.pid,
      icon: propsForm.fields.icon,
      describe: propsForm.fields.describe,
      question: propsForm.fields.question,
      sort: propsForm.fields.sort,
      status: propsForm.fields.status ? 1 : 0,
    });

    eventFormSubmitSuccess(
      { errors, values }, 
      requestFn, 
      function () {
        // 重置表单
        eventFormResetFields();
        // 关闭弹窗
        emit('cancel');
        // 更新列表
        emit('formCallbackSuccess', props.id);
      },
      `场景分类 ${propsForm.fields.name} 更新成功`
    );
  };
</script>
