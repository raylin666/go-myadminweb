<template>
  <a-modal 
    :visible="visible"
    width="50%"
    unmount-on-close
    :mask-closable="false"
    @cancel="emit('cancel')" 
    @ok="eventFormSubmitClick('form-submit')">
    <template #title> {{ t('article.category.form.basic.add.title') }} </template>

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
                :label="$t('article.category.form.basic.name')"
                :rules="[
                  {
                    required: true,
                    message: $t('article.category.form.basic.name.validate.message'),
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
                <a-input
                  v-model="propsForm.fields.name"
                  allow-clear
                  :placeholder="$t('article.category.form.basic.name.placeholder')"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item
                field="pid"
                :label="$t('article.category.form.basic.pid')"
                :rules="[
                  {
                    required: true,
                    message: $t('article.category.form.basic.pid.validate.message'),
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
                <a-select
                  v-model="propsForm.fields.pid"
                  :options="categoryOptions"
                  :field-names="{ value: 'id', label: 'name' }"
                  allow-clear
                  :placeholder="$t('article.category.form.basic.pid.placeholder')"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item
                field="color"
                :label="$t('article.category.form.basic.color')"
                :rules="[
                  {
                    required: true,
                    message: $t('article.category.form.basic.color.validate.message'),
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
              <!-- 后续做成筛选查找 -->
                <a-input
                  v-model="propsForm.fields.color"
                  allow-clear
                  :placeholder="$t('article.category.form.basic.color.placeholder')"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item
                field="cover"
                :label="$t('article.category.form.basic.cover')"
                :rules="[
                  {
                    required: true,
                    message: $t('article.category.form.basic.cover.validate.message'),
                  },
                ]"
                :validate-trigger="['change']"
              >
                <a-upload
                  v-model="propsForm.fields.cover"
                  :file-list="coverFile ? [coverFile] : []"
                  :show-file-list="false"
                  :custom-request="uploadCoverFileStream"
                  @change="uploadCoverChange"
                  @progress="uploadCoverProgress"
                >
                  <template #upload-button>
                    <div
                      :class="`arco-upload-list-item${
                        coverFile && coverFile.status === 'error'
                          ? ' arco-upload-list-item-error'
                          : ''
                      }`"
                    >
                      <div
                        v-if="coverFile && coverFile.url"
                        class="arco-upload-list-picture custom-upload-avatar"
                        style="margin-left: 13px;"
                      >
                        <img :src="coverFile.url" :alt="coverFile.url" />
                        <div class="arco-upload-list-picture-mask">
                          <IconEdit />
                        </div>
                        <a-progress
                          v-if="
                            coverFile.status === 'uploading' && coverFile.percent < 100
                          "
                          :percent="coverFile.percent"
                          type="circle"
                          size="mini"
                          :style="{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translateX(-50%) translateY(-50%)',
                          }"
                        />
                      </div>
                      <div v-else class="arco-upload-picture-card" style="margin-left: 13px;">
                        <div class="arco-upload-picture-card-text">
                          <IconPlus />
                          <div style="margin-top: 10px; font-weight: 300"
                            >点击上传</div
                          >
                        </div>
                      </div>
                    </div>
                  </template>
                </a-upload>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item
                field="sort"
                :label="$t('article.category.form.basic.sort')"
                :rules="[
                  {
                    required: true,
                    message: $t('article.category.form.basic.sort.validate.message'),
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
                <a-input-number
                  v-model="propsForm.fields.sort"
                  :placeholder="$t('article.category.form.basic.sort.placeholder')"
                  :min="0"
                  :max="65535"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8"></a-col>
            <a-col :span="4">
              <a-form-item
                field="status"
                :label="$t('article.category.form.basic.status')"
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
  import { ref, PropType, reactive, onMounted, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { requestArticleCategoryListSelect, requestArticleCategoryAdd } from '@/api/article';
  import useFormProps from '@/hooks/form';
  import { FormModel } from '../data/form';
  import Upload from '@/class/upload';
  import { RequestOption } from '@arco-design/web-vue';
  import { MessageSuccess } from '@/utils/notification';

  /**
   * 定义调用该组件的父级组件中的传递属性
   */
  defineProps({
    visible: {
      type: Boolean as PropType<boolean>,
      default: false,
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
      const { data } = await requestArticleCategoryListSelect();
      if (data.ok) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < data.data.list.length; i++) {
          // 暂不支持子分类
          // categoryOptions.push({
          //   id: data.data.list[i].id,
          //   name: data.data.list[i].name,
          // });
        }
      }
    } catch (err) {
      // you can report use errorHandler or other
    }
  });

  /**
   * 图片上传组件
   */
  // 封面上传
  const uploadCoverInS = new Upload();
  const coverFile = ref();
  const uploadCoverName = 'cover';
  const uploadCoverFileStream = (option: RequestOption) => {
    const isUploadSuccess = ref(false);
    uploadCoverInS.uploadFileStream(uploadCoverName, option);
    // 定时器
    const timer = setInterval(function () {
      const file = uploadCoverInS.getFile(uploadCoverName);
      if (file && Reflect.has(file, 'url')) {
        isUploadSuccess.value = true;
        coverFile.value = file;
        propsForm.fields.cover = file.url;
        MessageSuccess('文件上传成功');
      }
    }, 1000);
    watch(
      () => isUploadSuccess.value,
      (value) => {
        if (value === true) {
          clearInterval(timer);
        }
      }
    );
  };
  const uploadCoverChange = (_: any, currentFile: any) => {
    uploadCoverInS.uploadChange(uploadCoverName, _, currentFile);
    coverFile.value = uploadCoverInS.getFile(uploadCoverName);
  };
  const uploadCoverProgress = (currentFile: any) => {
    uploadCoverInS.uploadProgress(uploadCoverName, currentFile);
    coverFile.value = uploadCoverInS.getFile(uploadCoverName);
  };

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
    const requestFn = requestArticleCategoryAdd({
      name: propsForm.fields.name,
      pid: propsForm.fields.pid,
      cover: propsForm.fields.cover,
      color: propsForm.fields.color,
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
        emit('formCallbackSuccess', 0);
      },
      `文章分类 ${propsForm.fields.name} 创建成功`
    );
  };
</script>
