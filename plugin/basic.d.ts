export var __esModule: boolean;
export namespace pluginList {
    export const db: Db;
    export const example: Example;
    export const log: Log;
    export const req: Req;
    export const util: Util;
}
export type pluginType = {
    db: Db;
    example: Example;
    log: Log;
    req: Req;
    util: Util;
  };
declare class Db {
    log: Log;
    util: Util;
    dbConfig: any;
    isLoaded: boolean;
    sequelize: import("sequelize/types").Sequelize;
    initModel(): void;
    checkModelLoaded(): boolean;
    getModel(modelName: any): any;
}
declare class Example {
    log: Log;
    test(): void;
}
type logConfigType = {
    fname?: string;
};
declare class Log {
    logPath: any;
    _getArchiveName(stat: any, name: any): any;
    _tidyFile(): void;
    write(msg: any, config?: logConfigType): void;
    writeObj(obj: any, config?: logConfigType): void;
    writeArr(arr: any, config?: logConfigType): void;
    throw(msg: any, config?: logConfigType): void;
}
declare class Req {
    log: Log;
    /**
     * 普通单纯的node-fetch库
     * @param url 请求地址
     * @param opt 请求选项
     */
    fetch(url: any, opt: any): any;
    /**
     * 包含基本状态展示、常用数据转换和错误处理的fetch方法
     * @param url 请求地址
     * @param opt 请求选项
     */
    fetch2(url: any, opt: any): any;
    axios(url: any, opt: any): any;
}
declare class Util {
    log: Log;
    _genLog(funName: any, msg: any): string;
    waitForSec(sec: any): Promise<any>;
    waitFor(cnt: any): Promise<any>;
    genRandomStr(cnt: any): string;
    retryDo(cb: any, retryTimes?: number, intervalTime?: number): any;
    pipeAll(arr: Promise<any>[], queryCount: number, intervalTime?: number): any;
}
export {};
