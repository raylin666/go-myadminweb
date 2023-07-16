import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
} from '@/api/account';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';
import useAppStore from '../app';
import useWebSocketStore from '../ws';
import { LoginRequest } from '@/types/account';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: 0,
    username: undefined,
    avatar: undefined,
    birthday_at: undefined,
    created_at: undefined,
    email: undefined,
    first_login_at: undefined,
    last_login_at: undefined,
    last_login_ip: undefined,
    phone: undefined,
    phone_area: undefined,
    real_username: undefined,
    sex: 0,
    status: 0,
    role: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const { data } = await getUserInfo();
      this.setInfo(data.data);
    },

    // Login
    async login(loginForm: LoginRequest) {
      try {
        const { data } = await userLogin(loginForm);
        setToken(data.data.token);

        // WebSocket
        const wsStore = useWebSocketStore();
        wsStore.newConnect(
          `${import.meta.env.VITE_WEBSOKCET_SERVER_URL}?token=${data.data.token}`
        );
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();

      // WebSocket
      const wsStore = useWebSocketStore();
      wsStore.disconnect();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
