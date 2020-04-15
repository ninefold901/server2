/*eslint-disable no-unused-vars*/
import { ctxType } from './index';

class ServiceBase {
  ctx: ctxType
  _genLog(funName: string, msg: string) {
    return `[service] - ${funName}: ${msg}`;
  }
}

export default ServiceBase;