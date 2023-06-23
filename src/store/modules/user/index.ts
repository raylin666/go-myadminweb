import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
  LoginRequest,
} from '@/api/account';
import {
  NotificationSuccess,
  NotificationWarning,
  NotificationError,
} from '@/utils/notification';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';
import useAppStore from '../app';
import useWebSocketStore from '../ws';
import { WS_EVENT_NOTICE } from '@/utils/ws_event';

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
      const res = await getUserInfo();

      this.setInfo(res.data);
    },

    // Login
    async login(loginForm: LoginRequest) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);

        // WebSocket
        const wsStore = useWebSocketStore();
        wsStore.new(
          `${import.meta.env.VITE_WEBSOKCET_SERVER_URL}?token=${res.data.token}`
        );
        wsStore.connect();
        // 注册消息通知
        wsStore.on(WS_EVENT_NOTICE, (event: any) => {
          if (!event.data) return null;

          switch (event.data.type) {
            case 'success':
              NotificationSuccess(event.data.text);
              break;
            case 'warning':
              NotificationWarning(event.data.text);
              break;
            case 'error':
              NotificationError(event.data.text);
              break;
            default:
          }

          return null;
        });
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
