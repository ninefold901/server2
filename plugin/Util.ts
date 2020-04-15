import * as assert from 'assert';

class Util {
  _genLog(funName: string, msg: string) {
    return `[util] - ${funName}: ${msg}`;
  }
  waitFor(sec: number) {
    assert(sec > 0, this._genLog('waitFor', 'sec should > 0'));
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, sec * 1000);
    });
  }
}

export default Util;
