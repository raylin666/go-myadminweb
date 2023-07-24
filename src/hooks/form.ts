import { reactive } from "vue";
import { FormModel, HttpResponse } from "@/types/global";
import { cloneDeep } from "lodash";
import { ValidatedError } from "@arco-design/web-vue";
import { AxiosResponse } from "axios";
import { MessageError, MessageSuccess } from "@/utils/notification";

// 表单布局模式
type FormLayoutProps = "vertical" | "inline" | "horizontal" | undefined;

export default function useFormProps(fields: FormModel) {
  // 获取初始化表单模型数据
  const getInitFields = () : FormModel => {
    return cloneDeep(fields);
  };

  const propsForm = reactive({
    // 表单布局模式
    layoutMode: <FormLayoutProps>'vertical',
    // 存储表单模型数据 - 对应 form 字段
    fields: <FormModel>getInitFields(),
  });

  // 重置搜索表单模型数据
  const eventFormResetFields = () => {
    propsForm.fields = getInitFields();
  };

  // 搜索
  const eventFormSearch = () => {

  };

  // 表单点击提交处理
  const eventFormSubmitClick = (id: string | null | undefined) => {
    // 触发表单提交
    id = id ?? 'form-submit';
    const formSubmit = document.getElementById(id);
    if (formSubmit) {
      formSubmit.click();
    } else {
      MessageError(`请确认提交按钮的 document.getElementById('${id}') 属性值是否存在`);
    }
  };

  // 表单提交逻辑处理
  const eventFormSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    // console.log('values:', values, '\nerrors:', errors);
  };

  // 表单提交成功逻辑处理
  const eventFormSubmitSuccess = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  }, 
  api: Promise<AxiosResponse<HttpResponse, any>>,
  callback: () => void, 
  text: string) => {
    const { data } = await api;
    if (data.ok) {
      MessageSuccess(text);
      callback();
    }
  };

  // 表单提交失败逻辑处理
  const eventFormSubmitFailed = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  }) => {};

  return {
    propsForm,
    eventFormResetFields,
    eventFormSearch,
    eventFormSubmitClick,
    eventFormSubmit,
    eventFormSubmitSuccess,
    eventFormSubmitFailed,
  };
}