import axios from 'axios';

/**
 * Stream 流模式上传文件
 * @param stream
 * @param mime_type
 */
export default function requestUploadFile(stream: string, mimeType: string) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.put(`/upload/file/stream`, { stream, mimeType });
}
