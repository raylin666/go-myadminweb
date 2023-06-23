import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import useWebSocketStore from './modules/ws';

const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore, useWebSocketStore };
export default pinia;
