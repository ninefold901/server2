/* eslint-disable no-constant-condition */
// eslint-disable-next-line no-unused-vars
import { ctxType } from '../lib/types';
import W from '../lib/W';

import example from './example';

function main() {
  const w = new W();

  w.execute(async (ctx: ctxType) => {
    await example(ctx);
  });
}

main();
