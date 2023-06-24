import {
  NotificationSuccess,
  NotificationWarning,
  NotificationError,
} from '@/utils/notification';

// WebSocket 客户端
export default class WebSocketClient {
  // 是否连接中
  private conn: boolean;

  // 连接地址
  private url: string;

  // WebSocket 实例对象
  private socket: WebSocket | null;

  // 自定义注册监听事件
  private eventListeners: { [key: string]: ((data: any) => void)[] } = {};

  // 自定义事件类型
  private eventTypes: Array<string>;

  /**
   * 实例化 WebSocket
   * @param url 连接地址
   * @param eventTypes 自定义事件类型 (需要和后端返回的消息类型对应, 然后通过 on 方法绑定自定义事件)
   */
  constructor(url: string, eventTypes?: Array<string> | []) {
    this.conn = false;
    this.url = url;
    this.socket = null;
    this.eventTypes = eventTypes || [];
  }

  // 是否连接中
  public isConnect(): boolean {
    return this.conn;
  }

  // 连接 WebSocket 服务器
  public connect(): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.conn = true;
    } else {
      this.socket = new WebSocket(this.url);
      if (this.socket.readyState === WebSocket.OPEN) {
        this.conn = true;
      }

      // 连接监听
      this.socket.onopen = (event) => {
        this.conn = true;

        console.log('WebSocket onOpen', event);

        NotificationSuccess('连接 WebSocket 服务成功');
      };

      // 关闭监听
      this.socket.onclose = (event) => {
        this.conn = false;

        console.log('WebSocket onClose', event);

        NotificationWarning('已关闭 WebSocket 服务');
      };

      // 错误监听
      this.socket.onerror = (event) => {
        console.log('WebSocket onError', event);

        NotificationError('WebSocket 服务发生错误');
      };

      /**
       * 消息监听
       * 
       * 例如消息通知 (通过实例化 eventType 参数注册):
       * ws.on('notice', (event) => {
           console.log('notice', event);
        });

        消息示例:
          * 消息通知: {"messageType":"notice","data":{"type":"success","text":"\u8fde\u63a5 WebSocket \u670d\u52a1\u6210\u529f"}}
      */
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const messageType = String(data.messageType);
        if (data && this.eventTypes.includes(messageType)) {
          const listeners = this.eventListeners[messageType] || [];

          listeners.forEach((listener) => listener(data));
        }
      };
    }
  }

  // 断开 WebSocket 服务器的连接
  public disconnect(): void {
    this.conn = false;
    this.socket?.close();
    this.socket = null;
  }

  // 发送数据到 WebSocket 服务器
  public send(data: any): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.conn = true;
      const message = JSON.stringify(data);
      this.socket.send(message);
    } else {
      this.conn = false;
      console.error('WebSocket not connected.');
    }
  }

  // 添加事件监听器
  public on(eventType: string, listener: (data: any) => void): void {
    this.eventListeners[eventType] = this.eventListeners[eventType] || [];
    this.eventListeners[eventType].push(listener);
  }

  // 关闭事件监听器
  public off(eventType: string, listener: (data: any) => void): void {
    if (this.eventListeners[eventType]) {
      this.eventListeners[eventType] = this.eventListeners[eventType].filter(
        (l) => l !== listener
      );
    }
  }
}
