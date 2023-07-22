import axios from 'axios';
import qs from 'query-string';
import {
  ArticleList,
  ArticleListParams,
  ArticleListResponse,
  ArticleCategoryList,
  ArticleCategoryListResponse,
  ArticleCategoryListSelectResponse,
  ArticleAddParams,
  ArticleAddResponse,
} from '@/types/article';
import { HttpResponse, TRequestParams } from '@/types/global';

/**
 * 文章列表
 * @param params
 */
export function requestArticleList(params: ArticleListParams | TRequestParams) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.get<HttpResponse<ArticleListResponse>>('/article/list', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

/**
 * 新增文章
 * @param params
 */
export function requestArticleAdd(params: ArticleAddParams) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.post<HttpResponse<ArticleAddResponse>>(`/article/add`, params);
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
  return axios.patch<HttpResponse>(`/article/update/${id}/${field}`, { value });
}

/**
 * 文章删除
 * @param id
 */
export function requestArticleDelete(id: string | number) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.delete(`/article/delete/${id}`);
}

/**
 * 文章批量删除
 * @param id
 */
export function requestArticleBatchDelete(ids: number[]) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.post(`/article/batch_delete`, { ids });
}

/**
 * 文章分类列表
 */
export function requestArticleCategoryList() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.get<ArticleCategoryListResponse>('/article/category/list');
}

/**
 * 文章分类选择列表
 */
export function requestArticleCategoryListSelect() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.get<HttpResponse<ArticleCategoryListSelectResponse>>('/article/category/list/select');
}

