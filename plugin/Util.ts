import assert from 'assert';
import Log from './Log';

class Util {
  log: Log;
  constructor() {
    this.log = new Log();
    // this.log.write('[plugin]Util loaded.');
  }

  _genLog(funName: string, msg: string) {
    return `[util] - ${funName}: ${msg}`;
  }

  waitForSec(sec: number) {
    assert(sec > 0, this._genLog('waitForSec', 'sec should > 0'));
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, sec * 1000);
    });
  }

  waitFor(cnt: number) {
    assert(cnt > 0, this._genLog('waitFor', 'cnt should > 0'));
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, cnt);
    });
  }

  genRandomStr(cnt: number) {
    const alph = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const rst = [];
    for (let i = 0; i < cnt; ++i) {
      const rnd = Math.floor(Math.random() * alph.length);
      rst.push(alph[rnd]);
    }
    return rst.join('');
  }

  async retryDo(
    cb: Function,
    retryTimes: number = 3,
    intervalTime: number = 0
  ) {
    let cnt = 0;
    // eslint-disable-next-line no-constant-condition
    while (1) {
      try {
        const rst = await cb();
        return rst;
      } catch (e) {
        cnt++;
        if (cnt >= retryTimes) {
          throw e;
        }
        if (intervalTime > 0) {
          await this.waitFor(intervalTime);
        }
        this.log.write(
          this._genLog('retryDo', `retry for the ${cnt} time(s)...`)
        );
      }
    }
    throw new Error(this._genLog('retryDo', 'you should not go here'));
  }

  async pipeAll(
    arr: Function[],
    queryCount: number,
    intervalTime: number = 1000
  ) {
    if (queryCount <= 0) {
      this.log.throw(this._genLog('pipeAll', 'query count should > 0.'));
    }
    const list = [...arr];
    const result: any[] = [];
    while (list.length > 0) {
      this.log.write(`piping... ${list.length} left...`);
      const tmp = list.splice(0, queryCount);
      await Promise.all(tmp).then((res) => {
        result.push(...res);
      });
      await this.waitFor(intervalTime);
    }
    return result;
  }
}

export default Util;
