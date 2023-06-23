import { Notification } from '@arco-design/web-vue';

const defaultTitle = '温馨提示';

export function NotificationInfo(text: string, title = defaultTitle) {
  Notification.info({
    title,
    content: text,
  });
}

export function NotificationSuccess(text: string, title = defaultTitle) {
  Notification.success({
    title,
    content: text,
  });
}

export function NotificationWarning(text: string, title = defaultTitle) {
  Notification.warning({
    title,
    content: text,
  });
}

export function NotificationError(text: string, title = defaultTitle) {
  Notification.error({
    title,
    content: text,
  });
}
