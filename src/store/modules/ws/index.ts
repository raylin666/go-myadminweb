import { defineStore } from 'pinia';
import WebSocketClient from '@/ws';
import { WS_EVENT_NOTICE, WS_EVENT_SEND_MESSAGE } from '@/utils/ws_event';

const useWebSocketStore = defineStore('websocket', {
  state: () => ({
    socket: null as WebSocketClient | null, // 可空类型
    eventTypes: [WS_EVENT_NOTICE, WS_EVENT_SEND_MESSAGE],
  }),
  actions: {
    new(url: string) {
      this.socket = new WebSocketClient(url, this.eventTypes);
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
