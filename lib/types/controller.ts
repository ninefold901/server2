/*eslint-disable no-unused-vars*/
import { ctxType } from './index';

enum errnoEnum {
  SUCCESS = 0,
  VALIDATE_ERROR = 1,
  INTERNAL_ERROR = 2,
};

class ControllerBase {
  _genLog(funName: string, msg: string) {
    return `[controller] - ${funName}: ${msg}`;
  }

  _assert(ctx: ctxType, judge: boolean, msg: string) {
    if (!judge) {
      ctx.response = {
        errno: errnoEnum.VALIDATE_ERROR,
        msg,
        data: null,
      };
      throw new Error('controller_assert');
    }
  }

  _resolve(ctx: ctxType, data: any) {
    ctx.response = {
      errno: errnoEnum.SUCCESS,
      msg: 'success',
      data,
    };
  }

  _reject(ctx: ctxType, msg: string) {
    ctx.response = {
      errno: errnoEnum.INTERNAL_ERROR,
      msg: 'internal error',
      data: msg,
    };
  }

  ctrl(ctx: ctxType, cb: Function) {
    return new Promise(async resolve => {
      try {
        await cb(this._assert, this._resolve);
      } catch (error) {
        if (error.message !== 'controller_assert') {
          this._reject(ctx, error.message);
        }
      }
      resolve();
    });
  }
}

export default ControllerBase;