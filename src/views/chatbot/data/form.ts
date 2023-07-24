import { FormModel as Model } from "@/types/global";

export interface SearchFormModelInterface extends Model {
  number: string | undefined;
  name: string;
  pid: number | undefined;
  status: string | number | undefined;
}

export const searchFormModel : SearchFormModelInterface = {
  number: '',
  name: '',
  pid: undefined,
  status: undefined,
};

export interface FormModelInterface extends Model {
  name: string,
  pid: number,
  icon: string,
  describe: string,
  question: string,
  status: boolean | number,
  sort: number,
};

export const FormModel: FormModelInterface = {
  name: '',
  pid: 0,
  icon: '',
  describe: '',
  question: '',
  status: false,
  sort: 0,
};