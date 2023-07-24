import axios from 'axios';
import qs from 'query-string';
import { HttpResponse, TRequestParams } from '@/types/global';
import { ChatbotAddOrUpdateParams, ChatbotAddOrUpdateResponse, ChatbotListParams, ChatbotListResponse, ChatbotListSelectResponse } from '@/types/chatbot';

/**
 * 场景分类列表
 * @param params
 */
export function requestChatbotList(params: ChatbotListParams | TRequestParams) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.get<HttpResponse<ChatbotListResponse>>('/chatbot/list', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

/**
 * 场景分类选择列表
 */
export function requestChatbotListSelect() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.get<HttpResponse<ChatbotListSelectResponse>>('/chatbot/list/select');
}

/**
 * 新增场景分类
 * @param params
 */
export function requestChatbotAdd(params: ChatbotAddOrUpdateParams) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.post<HttpResponse<ChatbotAddOrUpdateResponse>>(`/chatbot/add`, params);
}

/**
 * 更新场景分类字段属性
 * @param id
 * @param field
 * @param value
 */
export function requestChatbotUpdateField(
  id: string | number,
  field: string,
  value: string
) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.patch<HttpResponse>(`/chatbot/update/${id}/${field}`, { value });
}

/**
 * 场景分类删除
 * @param id
 */
export function requestChatbotDelete(id: string | number) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.delete(`/chatbot/delete/${id}`);
}
