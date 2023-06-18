import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';
import debug from '@/utils/env';

export interface HttpResponse<T = unknown> {
  ok: boolean;
  code: number;
  message: string;
  data: T;
}

// 请求拦截器 (在请求之前进行的配置)
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);

// 响应拦截器 (在响应之后对数据进行处理)
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    // 调试模式打印请求响应数据
    if (debug) {
      console.log(response);
    }

    return response.data;
  },
  (error) => {
    // 调试模式打印请求响应数据
    if (debug) {
      console.log(error.response);
    }

    // error.response.data 为错误响应信息
    const response = error.response.data;

    Message.error({
      content: response.message || '接口请求错误',
      duration: 5 * 1000,
    });

    // 101001: 无效身份; 201002: 账号不存在; 201003: 账号已冻结; 201005: 账号已在其他区域登录; --- 重新登录
    if (
      [101001, 201002, 201003, 201005].includes(response.code) &&
      error.response.config.url !== 'account/info'
    ) {
      Modal.error({
        title: '确认登出',
        content: '已登出，您可以取消以留在此页面，也可以重新登录',
        okText: '重新登录',
        async onOk() {
          const userStore = useUserStore();

          await userStore.logout();
          window.location.reload();
        },
      });
    }

    return Promise.reject(error);
  }
);
