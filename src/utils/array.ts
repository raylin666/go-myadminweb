import cloneDeep from 'lodash/cloneDeep';

/**
 * 数组交换
 * @param array
 * @param beforeIdx
 * @param newIdx
 * @param isDeep
 */
const exchangeArray = <T extends Array<any>>(
  array: T,
  beforeIdx: number,
  newIdx: number,
  isDeep = false
): T => {
  const newArray = isDeep ? cloneDeep(array) : array;
  if (beforeIdx > -1 && newIdx > -1) {
    // 先替换后面的，然后拿到替换的结果替换前面的
    newArray.splice(
      beforeIdx,
      1,
      newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
    );
  }
  return newArray;
};

// eslint-disable-next-line import/prefer-default-export
export { exchangeArray };
