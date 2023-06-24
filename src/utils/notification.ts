import { RenderContent } from '@arco-design/web-vue/es/_utils/types';
import { Notification, Message } from '@arco-design/web-vue';
import { h } from 'vue';
import { IconFaceSmileFill } from '@arco-design/web-vue/es/icon';

const defaultTitle = '温馨提示';

export function NotificationInfo(content: RenderContent, title = defaultTitle) {
  Notification.info({ title, content });
}

export function NotificationSuccess(
  content: RenderContent,
  title = defaultTitle
) {
  Notification.success({ title, content });
}

export function NotificationWarning(
  content: RenderContent,
  title = defaultTitle
) {
  Notification.warning({ title, content });
}

export function NotificationError(
  content: RenderContent,
  title = defaultTitle
) {
  Notification.error({ title, content });
}

export function MessageInfo(content: RenderContent) {
  Message.info({ content });
}

export function MessageSuccess(content: RenderContent) {
  Message.success({ content });
}

export function MessageWarning(content: RenderContent) {
  Message.warning({
    content,
    icon: () => h(IconFaceSmileFill),
  });
}

export function MessageError(content: RenderContent) {
  Message.error({ content });
}
