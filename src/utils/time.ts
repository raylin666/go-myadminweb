import { formatDate } from '@vueuse/core';

/**
 * 时间戳转换为日期
 * @param timestamp
 */
// eslint-disable-next-line import/prefer-default-export
export function timestampFormatDate(timestamp: number) {
  const date = new Date();
  date.setTime(timestamp * 1000);
  return formatDate(date, 'YYYY-MM-DD HH:mm:ss');
}
