<template>
  <a-drawer
    width="100%"
    :visible="visible"
    :id="id"
    unmount-on-close
    :mask-closable="true"
    hide-cancel
    @cancel="emit('cancel')"
    :footer="false"
  >
    <template #title> {{ t('article.form.basic.info.title') }} </template>

    <div>
      <p></p>
      <a-space direction="vertical" size="large" :style="{ width: '100%' }">
        <a-form :model="propsForm.fields" :layout="propsForm.layoutMode">
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item
                field="title"
                disabled
                :label="$t('article.form.basic.title')"
              >
                <a-input v-model="propsForm.fields.title" allow-clear />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="21">
              <a-form-item
                field="summary"
                disabled
                :label="$t('article.form.basic.summary')"
              >
                <a-textarea
                  v-model="propsForm.fields.summary"
                  :max-length="{ length: 250, errorOnly: true }"
                  allow-clear
                  show-word-limit
                  style="height: 92px"
                />
              </a-form-item>
            </a-col>
            <a-col :span="3">
              <a-form-item
                field="cover"
                disabled
                :label="$t('article.form.basic.cover')"
              >
                <a-upload
                  v-model="propsForm.fields.cover"
                  :file-list="coverFile ? [coverFile] : []"
                  :show-file-list="false"
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
                        <a-image
                          width="160"
                          :alt="coverFile.url"
                          :src="coverFile.url"
                        ></a-image>
                        <a-progress
                          v-if="
                            coverFile.status === 'uploading' &&
                            coverFile.percent < 100
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
            <a-col :span="12">
              <a-form-item
                field="category"
                disabled
                :label="$t('article.form.basic.category')"
              >
                <a-input-tag
                  v-model="propsForm.fields.category"
                  allow-clear
                  :max-tag-count="5"
                  :unique-value="true"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                field="sort"
                disabled
                :label="$t('article.form.basic.sort')"
              >
                <a-input-number
                  v-model="propsForm.fields.sort"
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
                disabled
                :label="$t('article.form.basic.keyword')"
              >
                <a-input-tag
                  v-model="propsForm.fields.keyword"
                  allow-clear
                  :max-tag-count="5"
                  :unique-value="true"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6"></a-col>
            <a-col :span="2">
              <a-form-item
                field="status"
                disabled
                :label="$t('article.form.basic.status')"
              >
                <a-switch
                  v-model="propsForm.fields.status"
                  type="round"
                  checked-color="#d700ca"
                >
                  <template #checked>ON</template>
                  <template #unchecked>OFF</template>
                  <template #checked-icon><icon-check /></template>
                  <template #unchecked-icon><icon-close /></template>
                </a-switch>
              </a-form-item>
            </a-col>
            <a-col :span="2">
              <a-form-item
                field="recommend_flag"
                disabled
                :label="$t('article.form.basic.recommend_flag')"
              >
                <a-switch
                  v-model="propsForm.fields.recommend_flag"
                  type="round"
                >
                  <template #checked>ON</template>
                  <template #unchecked>OFF</template>
                  <template #checked-icon><icon-check /></template>
                  <template #unchecked-icon><icon-close /></template>
                </a-switch>
              </a-form-item>
            </a-col>
            <a-col :span="2">
              <a-form-item
                field="commented_flag"
                disabled
                :label="$t('article.form.basic.commented_flag')"
              >
                <a-switch
                  v-model="propsForm.fields.commented_flag"
                  type="round"
                  checked-color="#14C9C9"
                >
                  <template #checked>ON</template>
                  <template #unchecked>OFF</template>
                  <template #checked-icon><icon-check /></template>
                  <template #unchecked-icon><icon-close /></template>
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
                <a-input v-model="propsForm.fields.user_id" disabled />
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
                field="comment_count"
                :label="$t('article.form.basic.comment_count')"
              >
                <a-input v-model="propsForm.fields.comment_count" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                field="last_commented_at"
                :label="$t('article.form.basic.last_commented_at')"
              >
                <a-input
                  v-model="propsForm.fields.last_commented_at"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item
                field="view_count"
                :label="$t('article.form.basic.view_count')"
              >
                <a-input v-model="propsForm.fields.view_count" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                field="collection_count"
                :label="$t('article.form.basic.collection_count')"
              >
                <a-input v-model="propsForm.fields.collection_count" disabled />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item
                field="zan_count"
                :label="$t('article.form.basic.zan_count')"
              >
                <a-input v-model="propsForm.fields.zan_count" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                field="share_count"
                :label="$t('article.form.basic.share_count')"
              >
                <a-input v-model="propsForm.fields.share_count" disabled />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item
                field="created_at"
                :label="$t('article.form.basic.created_at')"
              >
                <a-input v-model="propsForm.fields.created_at" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                field="updated_at"
                :label="$t('article.form.basic.updated_at')"
              >
                <a-input v-model="propsForm.fields.updated_at" disabled />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item
                field="source"
                disabled
                :label="$t('article.form.basic.source')"
              >
                <a-input v-model="propsForm.fields.source" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                field="source_url"
                disabled
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
                disabled
                :label="$t('article.form.basic.attachment_path')"
              >
                <a-image-preview-group infinite>
                  <a-space
                    v-for="(url, index) in propsForm.fields.attachment_path"
                    :key="index"
                  >
                    <a-image
                      :src="url"
                      width="100"
                      height="100"
                      style="margin-right: 20px"
                    />
                  </a-space>
                </a-image-preview-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-divider orientation="center">{{
                t('article.form.basic.content.preview')
              }}</a-divider>
              <MdPreview v-model="propsForm.fields.content" />
            </a-col>
          </a-row>
        </a-form>
      </a-space>
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import IconPlus from '@arco-design/web-vue/es/icon/icon-plus';
  import MdPreview from '@/components/editor/preview.vue';
  import { requestArticleInfo } from '@/api/article';
  import useFormProps from '@/hooks/form';
  import { FormModel } from '../data/form';
  import { watch } from 'vue';

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
   */
  const emit = defineEmits(['cancel']);

  /**
   * 国际语言
   */
  const { t } = useI18n();

  /**
   * 表单组件
   */
  const { propsForm, eventFormResetFields } = useFormProps(FormModel);

  const coverFile = ref();

  watch(
    () => props.visible,
    async (value) => {
      if (value === true) {
        eventFormResetFields();
        // 请求详情接口
        const { data } = await requestArticleInfo(props.id);
        if (data.ok) {
          propsForm.fields.title = data.data.title;
          propsForm.fields.user_id = data.data.user_id.toString();
          propsForm.fields.author = data.data.author;
          propsForm.fields.cover = data.data.cover;
          propsForm.fields.summary = data.data.summary;
          propsForm.fields.status = data.data.status === 1;
          propsForm.fields.sort = data.data.sort;
          propsForm.fields.content = data.data.content;
          data.data.category.forEach((item) => {
            propsForm.fields.category.push(item.name);
          });
          if (data.data.commented_flag) {
            propsForm.fields.commented_flag = true;
          } else {
            propsForm.fields.commented_flag = false;
          }
          if (data.data.recommend_flag) {
            propsForm.fields.recommend_flag = true;
          } else {
            propsForm.fields.recommend_flag = false;
          }
          propsForm.fields.view_count = data.data.view_count.toString();
          propsForm.fields.comment_count = data.data.comment_count.toString();
          propsForm.fields.collection_count =
            data.data.collection_count.toString();
          propsForm.fields.zan_count = data.data.zan_count.toString();
          propsForm.fields.share_count = data.data.share_count.toString();
          propsForm.fields.last_commented_at = data.data.last_commented_at
            ? data.data.last_commented_at
            : '';
          propsForm.fields.created_at = data.data.created_at;
          propsForm.fields.updated_at = data.data.updated_at;
          propsForm.fields.source = data.data.source;
          propsForm.fields.source_url = data.data.source_url;
          propsForm.fields.keyword = data.data.keyword;
          propsForm.fields.attachment_path = data.data.attachment_path;

          coverFile.value = { url: propsForm.fields.cover };
        }
      }
    }
  );
</script>

<style lang="less" scoped>
  :deep(.arco-upload-picture-card) {
    width: 160px;
  }
  :deep(.arco-upload-list-picture) {
    width: 160px;
  }
</style>
