import axios from 'axios';
import qs from 'query-string';
import {
  ArticleListParams,
  ArticleListResponse,
  ArticleCategoryListResponse,
  ArticleCategoryListSelectResponse,
  ArticleAddOrUpdateParams,
  ArticleAddOrUpdateResponse,
  ArticleInfoResponse,
  ArticleCategoryParams,
  ArticleCategoryAddOrUpdateParams,
  ArticleCategoryAddOrUpdateResponse,
  ArticleCategoryInfoResponse,
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
 * 文章详情
 * @param id
 */
export function requestArticleInfo(id: string | number) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.get<HttpResponse<ArticleInfoResponse>>(`/article/info/${id}`);
}

/**
 * 新增文章
 * @param params
 */
export function requestArticleAdd(params: ArticleAddOrUpdateParams) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.post<HttpResponse<ArticleAddOrUpdateResponse>>(`/article/add`, params);
}

/**
 * 更新文章
 * @param params
 */
export function requestArticleUpdate(id: string | number, params: ArticleAddOrUpdateParams) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.put<HttpResponse<ArticleAddOrUpdateResponse>>(`/article/update/${id}`, params);
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
export function requestArticleCategoryList(params: ArticleCategoryParams | TRequestParams) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.get<HttpResponse<ArticleCategoryListResponse>>('/article/category/list', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

/**
 * 文章分类选择列表
 */
export function requestArticleCategoryListSelect() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.get<HttpResponse<ArticleCategoryListSelectResponse>>('/article/category/list/select');
}

/**
 * 文章分类详情
 * @param id
 */
export function requestArticleCategoryInfo(id: string | number) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.get<HttpResponse<ArticleCategoryInfoResponse>>(`/article/category/info/${id}`);
}

/**
 * 新增文章分类
 * @param params
 */
export function requestArticleCategoryAdd(params: ArticleCategoryAddOrUpdateParams) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.post<HttpResponse<ArticleCategoryAddOrUpdateResponse>>(`/article/category/add`, params);
}

/**
 * 更新文章分类
 * @param params
 */
export function requestArticleCategoryUpdate(id: string | number, params: ArticleCategoryAddOrUpdateParams) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.put<HttpResponse<ArticleCategoryAddOrUpdateResponse>>(`/article/category/update/${id}`, params);
}

/**
 * 更新文章分类字段属性
 * @param id
 * @param field
 * @param value
 */
export function requestArticleCategoryUpdateField(
  id: string | number,
  field: string,
  value: string
) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.patch<HttpResponse>(`/article/category/update/${id}/${field}`, { value });
}

/**
 * 文章分类删除
 * @param id
 */
export function requestArticleCategoryDelete(id: string | number) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.delete(`/article/category/delete/${id}`);
}

