import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';

import localeMonitor from '@/views/dashboard/monitor/locale/zh-CN';

import localeSearchTable from '@/views/list/search-table/locale/zh-CN';
import localeCardList from '@/views/list/card/locale/zh-CN';

import localeStepForm from '@/views/form/step/locale/zh-CN';
import localeGroupForm from '@/views/form/group/locale/zh-CN';

import localeBasicProfile from '@/views/profile/basic/locale/zh-CN';

import localeDataAnalysis from '@/views/visualization/data-analysis/locale/zh-CN';
import localeMultiDAnalysis from '@/views/visualization/multi-dimension-data-analysis/locale/zh-CN';

import localeSuccess from '@/views/result/success/locale/zh-CN';
import localeError from '@/views/result/error/locale/zh-CN';

import locale403 from '@/views/exception/403/locale/zh-CN';
import locale404 from '@/views/exception/404/locale/zh-CN';
import locale500 from '@/views/exception/500/locale/zh-CN';

import localeUserInfo from '@/views/user/info/locale/zh-CN';
import localeUserSetting from '@/views/user/setting/locale/zh-CN';

import localeSettings from './zh-CN/settings';

import localeArticle from '@/views/article/locale/zh-CN';
import localeChatbot from '@/views/chatbot/locale/zh-CN';

export default {
  // 公共基础
  'basic.home.name': 'Micro Server API',
  'basic.home.title': '微服务中后台管理系统',
  // 搜索相关
  'search.form.search': '查询',
  'search.form.reset': '重置',
  'search.form.selectDefault': '全部',
  'action.operation.create': '新建',
  'action.operation.delete': '批量删除',
  'table.size.mini': '迷你',
  'table.size.small': '偏小',
  'table.size.medium': '中等',
  'table.size.large': '偏大',
  'table.actions.refresh': '刷新',
  'table.actions.density': '密度',
  'table.actions.columnSetting': '列设置',
  // 菜单相关
  'menu.dashboard': '仪表盘',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.article': '文章管理',
  'menu.article.list': '文章列表',
  'menu.article.category.list': '分类列表',
  'menu.ai': 'AI 场景管理',
  'menu.chatbot.list': '场景分类列表',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,

  ...localeMonitor,
  ...localeSearchTable,
  ...localeCardList,
  ...localeStepForm,
  ...localeGroupForm,
  ...localeBasicProfile,
  ...localeDataAnalysis,
  ...localeMultiDAnalysis,
  ...localeSuccess,
  ...localeError,
  ...locale403,
  ...locale404,
  ...locale500,
  ...localeUserInfo,
  ...localeUserSetting,
  ...localeArticle,
  ...localeChatbot,
};
