import { list as controllerList } from './controller';
import { list as serviceList } from './service';
import { list as pluginList } from './plugin';
import config from '../config/config.default';

/* eslint-disable-next-line no-unused-vars */
import { ctxType } from './types';

const loadedContext = () => {
  const ctx: ctxType = {
    controller: controllerList,
    service: serviceList,
    ...pluginList,

    request: {},
    response: {},

    config
  };

  Object.keys(serviceList).forEach(key => {
    serviceList[key].ctx = ctx;
  });

  return ctx;
};

export default loadedContext;
