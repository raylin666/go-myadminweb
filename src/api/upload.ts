import axios from 'axios';

/**
 * Stream 流模式上传文件
 * @param stream
 * @param mime_type
 */
export function requestUploadFileStream(stream: string, mimeType: string) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.post(`/upload/file/stream`, { stream, mimeType });
}

/**
 * 文件资源模式上传
 * @param stream
 * @param mime_type
 */
export function requestUploadFileResource() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.post(`/upload/file/stream`, { });
}
