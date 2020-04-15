// eslint-disable-next-line no-unused-vars
import { ctxType } from '../../lib/types';

export default async (ctx: ctxType) => {
  ctx.log.write('script/example/index.ts start--');
  await ctx.util.waitFor(1);
  ctx.log.write('script/example/index.ts done.');
};
