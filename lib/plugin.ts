// auto generated //
import Db from '../plugin/Db';
import Example from '../plugin/Example';
import Log from '../plugin/Log';
import Req from '../plugin/Req';
import Util from '../plugin/Util';
export type pluginType = {
db: Db,
example: Example,
log: Log,
req: Req,
util: Util,
};
export const list: pluginType = {
db: new Db(),
example: new Example(),
log: new Log(),
req: new Req(),
util: new Util(),
};