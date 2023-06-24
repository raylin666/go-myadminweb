import axios from 'axios';
import qs from 'query-string';

export interface ArticleList {
  id: number;
  title: string;
  author: string;
  cover: string;
  sort: number;
  user_id: string;
  publisher_username: string;
  status: 0 | 1;
  recommend_flag: boolean;
  commented_flag: boolean;
  created_at: string;
  updated_at: string;
  view_count: number;
  comment_count: number;
  collection_count: number;
  zan_count: number;
  share_count: number;
  last_commented_at: string;
  source: string;
  source_url: string;
  keyword: Array<string | number>;
  category: string;
}

export interface ArticleListParams extends Partial<ArticleList> {
  page: number;
  size: number;
}

export interface ArticleListRes {
  list: ArticleList[];
  total: number;
  current_page: number;
  last_page: number;
  size: number;
  prev_page_url: string | null;
  next_page_url: string | null;
}

/**
 * 文章列表
 * @param params
 */
export function requestArticleList(params: ArticleListParams) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.get<ArticleListRes>('/knowledge/article/list', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

/**
 * 更新文章字段属性
 * @param id
 * @param field
 * @param value
 */
export function requestArticleUpdateField(
  id: string | number,
  field: string,
  value: string
) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.patch(`/knowledge/article/update/${id}/${field}`, {
    value,
  });
}

/**
 * 文章删除
 * @param id
 */
export function requestArticleDelete(id: string | number) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.delete(`/knowledge/article/delete/${id}`);
}

export interface ArticleCategoryList {
  id: string;
  pid: string;
  name: string;
  sort: number;
  status: number;
  created_at: number;
  updated_at: number;
  article_count: number;
}

export interface ArticleCategoryListRes {
  list: ArticleCategoryList[];
  count: number;
}

/**
 * 文章分类列表
 */
export function requestArticleCategoryList() {
  return axios.get<ArticleCategoryListRes>(
    '/article.api/article/category/list?status=1'
  );
}

export interface ArticleAddParams {
  title: string;
  author: string;
  summary: string;
  cover: string;
  sort: number;
  recommend_flag: boolean;
  commented_flag: boolean;
  status: number;
  view_count: number;
  comment_count: number;
  share_count: number;
  source: string;
  source_url: string;
  content: string;
  keyword: any;
  attachment_path: any;
  category: any;
}

export interface ArticleAddRes {
  id: string;
}

/**
 * 新增文章
 * @param params
 */
export function requestArticleAdd(params: ArticleAddParams) {
  return axios.put<ArticleAddRes>(`/article.api/article/add`, params);
}
