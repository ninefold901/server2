import { ctxType } from './type';
import config from '../config/config.default';
import { controllerList, serviceList, pluginList } from './auto-code'; // auto code位置统一
import { pluginList as basicPlugin } from '../plugin/basic';

// import boot from './boot';
// export { boot };

/**
 * CTX
 */
function loadContext() {
  const ctx: ctxType = {
    controller: controllerList,
    service: serviceList,
    ...basicPlugin,
    ...pluginList,

    request: {},
    response: {},

    config,
  };

  Object.keys(serviceList).forEach((key) => {
    serviceList[key].ctx = ctx;
  });

  return ctx;
}

/**
 * W
 */
export class W {
  app: any;
  headerMsg: string;
  constructor(app: any = null) {
    this.app = app;
    this.headerMsg = '[ - W - ]';
  }

  get(api: string, cb: any) {
    const ctx: ctxType = loadContext();

    this.app.get(api, (req: any, res: any) => {
      ctx.request = req;
      const {
        hostname,
        url,
        headers,
        query,
        body,
        method,
        ip,
        ips,
        httpVersion,
        domain,
      } = req;

      ctx.log.write(
        `${this.headerMsg}--get--request--\n${JSON.stringify({
          hostname,
          url,
          headers,
          query,
          body,
          method,
          ip,
          ips,
          httpVersion,
          domain,
        })}`
      );
      cb(ctx).then(() => {
        ctx.log.write(
          `${this.headerMsg}--get--response--\n${JSON.stringify(ctx.response)}`
        );
        res.send(ctx.response);
      });
    });
  }

  post(api: string, cb: any) {
    const ctx: ctxType = loadContext();

    this.app.post(api, (req: any, res: any) => {
      ctx.request = req;
      const {
        hostname,
        url,
        headers,
        query,
        body,
        method,
        ip,
        ips,
        httpVersion,
        domain,
      } = req;

      ctx.log.write(
        `${this.headerMsg}--post--request--\n${JSON.stringify({
          hostname,
          url,
          headers,
          query,
          body,
          method,
          ip,
          ips,
          httpVersion,
          domain,
        })}`
      );
      cb(ctx).then(() => {
        ctx.log.write(
          `${this.headerMsg}--post--response--\n${JSON.stringify(ctx.response)}`
        );
        res.send(ctx.response);
      });
    });
  }

  async execute(cb: any) {
    const ctx: ctxType = loadContext();
    await cb(ctx);
    ctx.log.write('executed a task.');
  }
}
