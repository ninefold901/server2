/*eslint-disable-next-line no-unused-vars*/
import { ctxType } from '../lib/types';
import ControllerBase from '../lib/types/controller';

class Example extends ControllerBase {
  testGet(ctx: ctxType) {
    return new Promise(async resolve => {
      const rst = await ctx.service.example.test('get');
      ctx.response = {
        errno: 0,
        msg: 'success',
        data: rst,
      };
      resolve();
    });
  }

  testPost(ctx: ctxType) {
    return new Promise(async resolve => {
      const rst = await ctx.service.example.test('post');
      ctx.response = {
        errno: 0,
        msg: 'success',
        data: rst,
      };
      resolve();
    });
  }

  testCtrl(ctx: ctxType) {
    return this.ctrl(ctx, async (assert: Function, resolve: Function) => {
      const { name } = ctx.request.body;
      assert(ctx, name, 'no name.');

      const rst = await ctx.service.example.test('post');
      resolve(ctx, rst);
    });
  }
}

export default Example;
