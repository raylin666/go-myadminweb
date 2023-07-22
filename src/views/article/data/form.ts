import { useUserStore } from "@/store";
import { FormModel as Model } from "@/types/global";

const userStore = useUserStore();

export interface SearchFormModelInterface extends Model {
  number: string | undefined;
  title: string;
  category: Array<string>;
  createdAt: Array<string | number>;
  status: string | number | undefined;
  recommend: string | number | undefined;
}

export const searchFormModel : SearchFormModelInterface = {
  number: '',
  title: '',
  category: [],
  createdAt: [],
  status: undefined,
  recommend: undefined,
};

export interface FormModelInterface extends Model {
  title: string,
  summary: string,
  cover: string,
  recommend_flag: boolean | number,
  commented_flag: boolean | number,
  status: boolean | number,
  sort: number,
  author: string,
  category: Array<string | number>,
  keyword: Array<string | number>,
  attachment_path: Array<string>,
  content: string,
  source: string,
  source_url: string,
  user_id: string | number,
};

export const FormModel: FormModelInterface = {
  title: '',
  summary: '',
  cover: '',
  recommend_flag: false,
  commented_flag: true,
  status: false,
  sort: 0,
  author: `${userStore.real_username}`,
  category: [],
  keyword: [],
  attachment_path: [],
  content: '',
  source: '本站',
  source_url: '',
  user_id: `${userStore.id}`,
};