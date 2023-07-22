import { HttpResponse } from '@/types/global';
import { FileResponse, FileStreamResponse } from '@/types/upload';
import axios from 'axios';

/**
 * Stream 流模式上传文件
 * @param stream
 */
export function requestUploadFileStream(stream: string, extension: string) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.post<HttpResponse<FileStreamResponse>>(`/upload/file/stream`, { stream, extension });
}

/**
 * 文件资源模式上传.
 */
export function requestUploadFileResource() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.post<HttpResponse<FileResponse>>(`/upload/file`, { });
}
