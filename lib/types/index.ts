/*eslint-disable no-unused-vars*/
import { controllerType } from '../controller';
import { serviceType } from '../service';
import { pluginType } from '../plugin';

type ctxBaseType = {
  controller: controllerType,
  service: serviceType,
  request: any,
  response: any,
  config: any,
};

export type ctxType = ctxBaseType & pluginType;
