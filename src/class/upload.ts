import { requestUploadFileStream } from "@/api/upload";
import { fileToBase64 } from "@/utils/file";
import { RequestOption } from "@arco-design/web-vue";
import { reactive } from "vue";

export default class Upload {
  // 本地文件资源
  localFiles: { [key: string]: any } = reactive({});

  // 已上传文件资源
  files: { [key: string]: any } = reactive({});

  // 上传文件流资源
  uploadFileStream(name: string, option: RequestOption) {
    // const fileType = option.fileItem.file?.type.toString();
    fileToBase64(option.fileItem.file).then(async (stream: any) => {
      let extension = '';
      const nameArr = option.fileItem.file?.name.split('.');
      if (nameArr?.length) {
        extension = nameArr[nameArr.length - 1];
      }
      stream = stream.split(',');

      await requestUploadFileStream(stream[1], extension)
        .then((response: any) => {
          if (response.data.ok) {
            this.setFile(name, {
              name: option.fileItem.name,
              uid: option.fileItem.uid,
              percent: option.fileItem.percent,
              status: option.fileItem.status,
              localUrl: option.fileItem.url,
              url: response.data.data.url,
            });
          }
        })
    });
  }

  // 监听上传改变更新资源
  uploadChange(name: string, _: any, currentFile: any) {
    this.setLocalFile(name, {
      ...currentFile,
      url: URL.createObjectURL(currentFile.file),
    });
  }

  // 监听上传进度
  uploadProgress(name: string, currentFile: any) {
    this.setLocalFile(name, currentFile);
  }

  setLocalFile(name: string, receiver: any) {
    Reflect.set(this.localFiles, name, receiver);
  }

  getLocalFile(name: string) {
    return Reflect.get(this.localFiles, name);
  }

  setFile(name: string, receiver: any) {
    Reflect.set(this.files, name, receiver);
  }

  getFile(name: string) {
    return Reflect.get(this.files, name);
  }

  // 获取所有已上传的文件
  getFiles() {
    return this.files;
  }

  // 获取所有本地的文件
  getLocalFiles() {
    return this.localFiles;
  }
}
