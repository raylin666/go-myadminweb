import axios from 'axios';
import { UserState } from '@/store/modules/user/types';
import { LoginRequest, LoginResponse } from '@/types/account';
import { HttpResponse } from '@/types/global';

export function login(data: LoginRequest) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.post<HttpResponse<LoginResponse>>('/account/login', data);
}

export function logout() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.post<HttpResponse>('/account/logout');
}

export function getUserInfo() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.get<HttpResponse<UserState>>('/account/info');
}
