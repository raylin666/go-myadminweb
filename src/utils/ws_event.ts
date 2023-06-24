/**
 * WebSocket 自定义事件
 */
// 消息通知
// {"messageType":"notice","data":{"type":"success","text":"\u8fde\u63a5 WebSocket \u670d\u52a1\u6210\u529f"}}
const WS_EVENT_NOTICE = 'notice';
// 发送消息
const WS_EVENT_SEND_MESSAGE = 'sendMessage';

export { WS_EVENT_NOTICE, WS_EVENT_SEND_MESSAGE };
