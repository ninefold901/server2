/*eslint-disable-next-line no-unused-vars*/
import { ctxType } from './lib/types/index';
import W from './lib/W';

function start(app: any) {
  const w = new W(app);

  w.get('/api/test_get', (ctx: ctxType) => {
    return ctx.controller.example.testGet(ctx);
  });

  w.post('/api/test_post', (ctx: ctxType) => {
    return ctx.controller.example.testPost(ctx);
  });
}

export default start;
