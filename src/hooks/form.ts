import { reactive } from "vue";
import { FormModel } from "@/types/global";
import { cloneDeep } from "lodash";

export default function useFormProps(fields: FormModel) {
  // 获取初始化表单模型数据
  const getInitFields = () : FormModel => {
    return cloneDeep(fields);
  };

  const propsForm = reactive({
    // 存储表单模型数据 - 对应 form 字段
    fields: <FormModel>getInitFields(),
  });

  // 重置搜索表单模型数据
  const eventFormResetSearchFields = () => {
    propsForm.fields = getInitFields();
  };

  // 搜索
  const eventFormSearch = () => {

  };

  return {
    propsForm,
    eventFormResetSearchFields,
    eventFormSearch,
  };
}