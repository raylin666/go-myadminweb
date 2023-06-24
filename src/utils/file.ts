/**
 * 文件转换为 base64
 * @param file
 */
export function fileToBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    let fileResult = '' as string;
    reader.readAsDataURL(file);
    reader.onload = () => {
      fileResult = String(reader.result);
    };
    reader.onerror = (error: any) => {
      reject(error);
    };
    reader.onloadend = () => {
      resolve(fileResult);
    };
  });
}

/**
 * base64 转换为文件
 * @param urlData
 * @param fileName
 */
export function base64ToFile(urlData: any, fileName: string) {
  const arr = urlData.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bytes = atob(arr[1]); // 解码base64
  let n = bytes.length;
  const ia = new Uint8Array(n);
  // eslint-disable-next-line no-plusplus
  while (n--) {
    ia[n] = bytes.charCodeAt(n);
  }
  return new File([ia], fileName, { type: mime });
}
