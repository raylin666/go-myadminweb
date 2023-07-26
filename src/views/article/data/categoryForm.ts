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
  cover: string,
  color: string,
  status: boolean | number,
  sort: number,
};

export const FormModel: FormModelInterface = {
  name: '',
  pid: 0,
  cover: '',
  color: '',
  status: false,
  sort: 0,
};