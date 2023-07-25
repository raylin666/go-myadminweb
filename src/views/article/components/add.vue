<template>
  <a-drawer
    width="100%"
    :visible="visible"
    unmount-on-close
    :mask-closable="false"
    @ok="eventFormSubmitClick('form-submit')"
    @cancel="emit('cancel')"
  >
    <template #title> {{ t('article.form.basic.add.title') }} </template>

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
                field="title"
                :label="$t('article.form.basic.title')"
                :rules="[
                  {
                    required: true,
                    message: $t('article.form.basic.title.validate.message'),
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
                <a-input
                  v-model="propsForm.fields.title"
                  allow-clear
                  :placeholder="$t('article.form.basic.title.placeholder')"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="22">
              <a-form-item
                field="summary"
                :label="$t('article.form.basic.summary')"
                :rules="[
                  {
                    required: true,
                    message: $t('article.form.basic.summary.validate.message'),
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
                <a-textarea
                  v-model="propsForm.fields.summary"
                  :placeholder="$t('article.form.basic.summary.placeholder')"
                  :max-length="{ length: 250, errorOnly: true }"
                  allow-clear
                  show-word-limit
                  style="height: 92px;"
                />
              </a-form-item>
            </a-col>
            <a-col :span="2">
              <a-form-item
                field="cover"
                :label="$t('article.form.basic.cover')"
                :rules="[
                  {
                    required: true,
                    message: $t('article.form.basic.cover.validate.message'),
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
                      <div v-else class="arco-upload-picture-card">
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
            <a-col :span="24">
              <a-form-item
                field="content"
                :label="$t('article.form.basic.content')"
                :rules="[
                  {
                    required: true,
                    message: $t('article.form.basic.content.validate.message'),
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
                <MdEditor v-model="propsForm.fields.content" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item
                field="category"
                :label="$t('article.form.basic.category')"
                :rules="[
                  {
                    required: true,
                    message: $t('article.form.basic.category.validate.message'),
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
                <a-select
                  v-model="propsForm.fields.category"
                  :options="categoryOptions"
                  :field-names="{ value: 'id', label: 'name' }"
                  multiple
                  :limit="5"
                  allow-clear
                  :placeholder="$t('article.form.basic.category.placeholder')"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                field="sort"
                :label="$t('article.form.basic.sort')"
                :rules="[
                  {
                    required: true,
                    message: $t('article.form.basic.sort.validate.message'),
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
                <a-input-number
                  v-model="propsForm.fields.sort"
                  :placeholder="$t('article.form.basic.sort.placeholder')"
                  :min="0"
                  :max="65535"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item
                field="keyword"
                :label="$t('article.form.basic.keyword')"
              >
                <a-input-tag
                  v-model="propsForm.fields.keyword"
                  allow-clear
                  :max-tag-count="5"
                  :unique-value="true"
                  :placeholder="$t('article.form.basic.keyword.placeholder')"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6"></a-col>
            <a-col :span="2">
              <a-form-item
                field="status"
                :label="$t('article.form.basic.status')"
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
            <a-col :span="2">
              <a-form-item
                field="recommend_flag"
                :label="$t('article.form.basic.recommend_flag')"
              >
                <a-switch v-model="propsForm.fields.recommend_flag" type="round">
                  <template #checked>ON</template>
                  <template #unchecked>OFF</template>
                  <template #checked-icon><icon-check/></template>
                  <template #unchecked-icon><icon-close/></template>
                </a-switch>
              </a-form-item>
            </a-col>
            <a-col :span="2">
              <a-form-item
                field="commented_flag"
                :label="$t('article.form.basic.commented_flag')"
              >
                <a-switch
                  v-model="propsForm.fields.commented_flag"
                  type="round"
                  checked-color="#14C9C9"
                >
                  <template #checked>ON</template>
                  <template #unchecked>OFF</template>
                  <template #checked-icon><icon-check/></template>
                  <template #unchecked-icon><icon-close/></template>
                </a-switch>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item
                field="user_id"
                :label="$t('article.form.basic.user_id')"
              >
                <a-input v-model="propsForm.fields.user_id" allow-clear disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                field="author"
                :label="$t('article.form.basic.author')"
              >
                <a-input
                  v-model="propsForm.fields.author"
                  allow-clear
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item
                field="source"
                :label="$t('article.form.basic.source')"
              >
                <a-input v-model="propsForm.fields.source" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                field="source_url"
                :label="$t('article.form.basic.source_url')"
              >
                <a-input v-model="propsForm.fields.source_url" allow-clear />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item
                field="attachment_path"
                :label="$t('article.form.basic.attachment_path')"
              >
                <a-upload
                  v-model="propsForm.fields.attachment_path"
                  :file-list="attachmentPathFile ? attachmentPathFile : []"
                  :limit="5"
                  list-type="picture"
                  draggable
                  :custom-request="uploadAttachmentPathFileStream"
                  :on-before-remove="uploadAttachmentPathFileRemove"
                  @change="uploadAttachmentPathChange"
                  @progress="uploadAttachmentPathProgress"
                >
                </a-upload>
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
  </a-drawer>
</template>

<script lang="ts" setup>
  import { PropType, ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import IconEdit from '@arco-design/web-vue/es/icon/icon-edit';
  import IconPlus from '@arco-design/web-vue/es/icon/icon-plus';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import MdEditor from '@/components/editor/index.vue';
  import { FileItem, RequestOption } from '@arco-design/web-vue/es/upload/interfaces';
  import { MessageSuccess } from '@/utils/notification';
  import { requestArticleCategoryListSelect, requestArticleAdd } from '@/api/article';
  import { useUserStore } from '@/store';
  import { onMounted } from 'vue';
  import useFormProps from '@/hooks/form';
  import { FormModel } from '../data/form';
  import Upload from '@/class/upload';
  import { watch } from 'vue';
  import { cloneDeep } from 'lodash';

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
   * 用户存储
   */
  const userStore = useUserStore();

  /**
   * 文章分类选项
   */
  const categoryOptions: any[] = reactive([]);
  onMounted(async () => {
    try {
      const { data } = await requestArticleCategoryListSelect();
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

  // 附件上传
  const uploadAttachmentPathInS = new Upload();
  const attachmentPathFile = ref([]);
  const uploadAttachmentPathName = 'attachmentPath';
  const uploadAttachmentPathFileStream = (option: RequestOption) => {
    const isUploadSuccess = ref(false);
    uploadAttachmentPathInS.uploadFileStream(uploadAttachmentPathName, option);
    // 定时器
    const timer = setInterval(function () {
      const file = uploadAttachmentPathInS.getFile(uploadAttachmentPathName);
      if (file && Reflect.has(file, 'url')) {
        isUploadSuccess.value = true;
        attachmentPathFile.value.push({ uid: file.uid, name: file.name, url: file.url });
        propsForm.fields.attachment_path.push(file.url);
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
  const uploadAttachmentPathChange = (_: any, currentFile: any) => {
    uploadAttachmentPathInS.uploadChange(uploadAttachmentPathName, _, currentFile);
  };
  const uploadAttachmentPathProgress = (currentFile: any) => {
    uploadAttachmentPathInS.uploadProgress(uploadAttachmentPathName, currentFile);
  };
  const uploadAttachmentPathFileRemove = (fileItem: FileItem) => {
    const newArray : string[] = [];
    const newLocalArray : [] = [];
    propsForm.fields.attachment_path.forEach((url: any) => {
      if (url !== fileItem.url) {
        newArray.push(url);
      }
    });
    propsForm.fields.attachment_path = newArray;

    const cloneAttachmentPathFile = cloneDeep(attachmentPathFile.value);
    cloneAttachmentPathFile.forEach((item: any) => {
      if (item.url !== fileItem.url) {
        newLocalArray.push(item);
      }
    });
    attachmentPathFile.value = newLocalArray;
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
    const requestFn = requestArticleAdd({
      user_id: userStore.id,
      title: propsForm.fields.title,
      author: propsForm.fields.author ? propsForm.fields.author : '',
      summary: propsForm.fields.summary,
      cover: propsForm.fields.cover,
      sort: propsForm.fields.sort,
      recommend_flag: propsForm.fields.recommend_flag,
      commented_flag: propsForm.fields.commented_flag,
      status: propsForm.fields.status ? 1 : 0,
      source: propsForm.fields.source,
      source_url: propsForm.fields.source_url,
      content: propsForm.fields.content,
      keyword: propsForm.fields.keyword,
      attachment_path: propsForm.fields.attachment_path,
      category: propsForm.fields.category,
    });

    eventFormSubmitSuccess(
      { errors, values }, 
      requestFn, 
      function () {
        // 重置表单
        eventFormResetFields();
        coverFile.value = null;
        attachmentPathFile.value = [];
        // 关闭抽屉
        emit('cancel');
        // 更新列表
        emit('formCallbackSuccess', 0);
      },
      `文章 ${propsForm.fields.title} 创建成功`
    );
  };
</script>
