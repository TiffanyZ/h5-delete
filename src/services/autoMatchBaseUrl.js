import {THS_PREFIX, OLD_PREFIX, ADD_PATH} from '../constant';

/**
 * 根据前缀，自动匹配基础的url
 * 根据项目所需，自己扩展
 * @param prefix
 * @returns {string}
 */
export default function autoMatchBaseUrl(prefix) {
  let baseUrl = '';
  switch (prefix) {
    case THS_PREFIX:
      prefix = 'ths';
      baseUrl = window.LOCAL_CONFIG.API_THS;
      break;
    case OLD_PREFIX:
      prefix = 'old';
      baseUrl = window.LOCAL_CONFIG.API_ORIGIN + ADD_PATH;
      break;
    default:
      baseUrl = window.LOCAL_CONFIG.API_HOME + ADD_PATH;
  }

  return `${baseUrl}`;
}
