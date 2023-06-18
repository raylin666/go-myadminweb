import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export function login(data: LoginRequest) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.post<LoginResponse>('/account/login', data);
}

export function logout() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.post<LoginResponse>('/account/logout');
}

export function getUserInfo() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.get<UserState>('/account/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
