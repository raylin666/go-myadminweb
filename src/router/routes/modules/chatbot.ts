import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const CHATBOT: AppRouteRecordRaw = {
  path: '/ai',
  name: 'ai',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.ai',
    requiresAuth: true,
    icon: 'icon-bookmark',
    order: 2,
  },
  children: [
    {
      path: 'chatbot/list',
      name: 'ChatbotList',
      component: () => import('@/views/chatbot/list.vue'),
      meta: {
        locale: 'menu.chatbot.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default CHATBOT;
