import * as fs from 'fs';
import * as path from 'path';
import * as moment from 'moment';

class Log {
  logPath: string;
  constructor() {
    this.logPath = path.resolve(__dirname, '../log/app-log.log');
  }

  _getArchiveName(stat: any, name: string) {
    let arr = name.split('.');
    arr.splice(-1, 0, `${moment(stat.birthtime).format('YYYYMMDD')}`);
    return arr.join('.');
  }

  _tidyFile() {
    try {
      const stat = fs.statSync(this.logPath);
      if (!moment(stat.birthtime).isSame(moment(), 'day')) {
        fs.renameSync(this.logPath, this._getArchiveName(stat, this.logPath));
      }
    } catch (e) {
      console.log(`[plugin error]tidy file:\n${e.message}`);
      return;
    }
  }

  write(msg: string) {
    this._tidyFile();

    const now = moment().format('YYYYMMDD-HH:mm:ss');
    const str = `###${now}### ${msg}`;
    console.log(str);
    fs.writeFileSync(this.logPath, `${str}\n`, { flag: 'a' });
  }

  writeObj(obj: object) {
    const msg = JSON.stringify(obj);
    this.write(msg);
  }
}

export default Log;
