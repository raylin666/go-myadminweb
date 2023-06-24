import { defineStore } from 'pinia';
import {
  NotificationSuccess,
  NotificationWarning,
  NotificationError,
} from '@/utils/notification';
import WebSocketClient from '@/ws';
import { WS_EVENT_NOTICE, WS_EVENT_SEND_MESSAGE } from '@/utils/ws_event';

const useWebSocketStore = defineStore('websocket', {
  state: () => ({
    socket: null as WebSocketClient | null, // 可空类型
    eventTypes: [WS_EVENT_NOTICE, WS_EVENT_SEND_MESSAGE],
  }),
  actions: {
    newConnect(url: string) {
      this.socket = new WebSocketClient(url, this.eventTypes);
      this.connect();
      
      /**
       * 事件注册 START
       */
      // 注册消息通知
      this.on(WS_EVENT_NOTICE, (event: any) => {
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
      /**
       * 事件注册 END
       */
    },

    isConnect(): boolean {
      return this.socket?.isConnect() === true;
    },

    connect() {
      return this.socket?.connect();
    },

    disconnect() {
      return this.socket?.disconnect();
    },

    send(data: any) {
      return this.socket?.send(data);
    },

    on(eventType: string, listener: (data: any) => void) {
      return this.socket?.on(eventType, listener);
    },

    off(eventType: string, listener: (data: any) => void) {
      return this.socket?.off(eventType, listener);
    },
  },
});

export default useWebSocketStore;
