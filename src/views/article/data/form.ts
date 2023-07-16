import { FormModel as Model } from "@/types/global";

export interface FormModelInterface extends Model {
  number: string | undefined;
  title: string;
  category: Array<string>;
  createdAt: Array<string | number>;
  status: string | number | undefined;
  recommend: string | number | undefined;
}

export const FormModel : FormModelInterface = {
  number: '',
  title: '',
  category: [],
  createdAt: [],
  status: undefined,
  recommend: undefined,
};