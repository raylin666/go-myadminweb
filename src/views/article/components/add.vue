<template>
  <a-drawer
    width="86%"
    :visible="visible"
    unmount-on-close
    :mask-closable="false"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title> {{ t('article.form.basic.add.title') }} </template>

    <div>
      <p></p>
      <a-space direction="vertical" size="large" :style="{ width: '100%' }">
        <a-form
          :model="form"
          :layout="layout"
          @submit="handleSubmit"
          @submit-failed="handleSubmitFailed"
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
                  v-model="form.title"
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
                  v-model="form.summary"
                  :placeholder="$t('article.form.basic.summary.placeholder')"
                  :max-length="{ length: 250, errorOnly: true }"
                  allow-clear
                  show-word-limit
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
                  v-model="form.cover"
                  :file-list="file ? [file] : []"
                  :show-file-list="false"
                  :custom-request="uploadCoverCustomRequest"
                  @change="eventUploadCoverChange"
                  @progress="eventUploadCoverProgress"
                >
                  <template #upload-button>
                    <div
                      :class="`arco-upload-list-item${
                        file && file.status === 'error'
                          ? ' arco-upload-list-item-error'
                          : ''
                      }`"
                    >
                      <div
                        v-if="file && file.url"
                        class="arco-upload-list-picture custom-upload-avatar"
                      >
                        <img :src="file.url" :alt="file.url" />
                        <div class="arco-upload-list-picture-mask">
                          <IconEdit />
                        </div>
                        <a-progress
                          v-if="
                            file.status === 'uploading' && file.percent < 100
                          "
                          :percent="file.percent"
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
                <MdEditor v-model="form.content" />
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
                  v-model="form.category"
                  :options="categoryOptions"
                  :field-names="categoryFieldNames"
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
                  v-model="form.sort"
                  placeholder="请输入数字(正整数)"
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
                  v-model="form.keyword"
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
                  v-model="form.status"
                  type="round"
                  checked-color="#d700ca"
                >
                  <template #checked>ON</template>
                  <template #unchecked>OFF</template>
                </a-switch>
              </a-form-item>
            </a-col>
            <a-col :span="2">
              <a-form-item
                field="recommend_flag"
                :label="$t('article.form.basic.recommend_flag')"
              >
                <a-switch v-model="form.recommend_flag" type="round">
                  <template #checked>ON</template>
                  <template #unchecked>OFF</template>
                </a-switch>
              </a-form-item>
            </a-col>
            <a-col :span="2">
              <a-form-item
                field="commented_flag"
                :label="$t('article.form.basic.commented_flag')"
              >
                <a-switch
                  v-model="form.commented_flag"
                  type="round"
                  checked-color="#14C9C9"
                >
                  <template #checked>ON</template>
                  <template #unchecked>OFF</template>
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
                <a-input v-model="form.user_id" allow-clear disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                field="author"
                :label="$t('article.form.basic.author')"
              >
                <a-input
                  v-model="form.author"
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
                <a-input v-model="form.source" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                field="source_url"
                :label="$t('article.form.basic.source_url')"
              >
                <a-input v-model="form.source_url" allow-clear />
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
                  v-model="form.attachment_path"
                  :limit="5"
                  draggable
                  action="/"
                />
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
  import { RequestOption } from '@arco-design/web-vue/es/upload/interfaces';
  import { requestUploadFileStream } from '@/api/upload';
  import { fileToBase64 } from '@/utils/file';
  import { MessageSuccess } from '@/utils/notification';
  import { requestArticleCategoryListSelect, requestArticleAdd } from '@/api/article';
  import { useUserStore } from '@/store';
  import { onMounted } from 'vue';

  /**
   * 国际语言
   */
  const { t } = useI18n();

  /**
   * 表单布局模式
   */
  const layout = ref('vertical');

  /**
   * 用户存储
   */
  const userStore = useUserStore();

  /**
   * 表单字段
   */
  const form = reactive({
    title: '',
    summary: '',
    cover: '',
    recommend_flag: false,
    commented_flag: true,
    status: false,
    sort: 0,
    author: userStore.real_username,
    category: [],
    keyword: [],
    attachment_path: [],
    content: '',
    source: '本站',
    source_url: '',
    user_id: `${userStore.id}`,
  });

  /**
   * 图片上传组件
   */
  const file = ref();
  const uploadCoverCustomRequest = (option: RequestOption) => {
    const fileType = option.fileItem.file?.type.toString();
    fileToBase64(option.fileItem.file).then((stream: any) => {
      stream = stream.split(',');
      requestUploadFileStream(stream[1], String(fileType))
        .then((res: any) => {
          form.cover = res.data.url;
          file.value = {
            ...option.fileItem.file,
            url: res.data.url,
          };

          MessageSuccess('文件上传成功');
        })
        .catch(() => {})
        .finally(() => {});
    });
  };
  const eventUploadCoverChange = (_: any, currentFile: any) => {
    file.value = {
      ...currentFile,
      url: URL.createObjectURL(currentFile.file),
    };
  };
  const eventUploadCoverProgress = (currentFile: any) => {
    file.value = currentFile;
  };

  /**
   * 文章分类选项
   */
  const categoryFieldNames = { value: 'id', label: 'name' };
  const categoryOptions: any[] = reactive([]);
  onMounted(async () => {
    try {
      const listSelect = await requestArticleCategoryListSelect();
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < listSelect.data.list.length; i++) {
        categoryOptions.push({
          id: listSelect.data.list[i].id,
          name: listSelect.data.list[i].name,
        });
      }
    } catch (err) {
      // you can report use errorHandler or other
    }
  });

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
   */
  const emit = defineEmits(['cancel']);
  const handleCancel = () => {
    // 关闭抽屉
    emit('cancel');
  };

  /**
   * 组件逻辑处理
   */
  const handleOk = () => {
    // 触发表单提交
    const formSubmit = document.getElementById('form-submit');
    if (formSubmit) {
      formSubmit.click();
    }
  };

  // 表单提交逻辑处理
  const handleSubmitFailed = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  }) => {};

  const handleSubmitSuccess = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  }) => {
    let status = 0;
    if (form.status) {
      status = 1;
    }

    await requestArticleAdd({
      title: form.title,
      author: form.author ? form.author : '',
      summary: form.summary,
      cover: form.cover,
      sort: form.sort,
      recommend_flag: form.recommend_flag,
      commented_flag: form.commented_flag,
      status,
      source: form.source,
      source_url: form.source_url,
      content: form.content,
      keyword: form.keyword,
      attachment_path: form.attachment_path,
      category: form.category,
    });
  };

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    // console.log('values:', values, '\nerrors:', errors);
  };
</script>
