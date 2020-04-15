/**
 * @file 启动文件
 * 生成文件，需要在服务启动前执行
 */

import * as path from 'path';
import * as fs from 'fs';

function smallIt(name: string) {
  const arr = name.split('');
  arr[0] = arr[0].toLowerCase();
  return arr.join('');
}

function generateFile(arr: string[], folderName: string, noInterface: boolean = false) {
  // 只扫描ts文件
  let list = arr.filter(one => {
    return one.split('.')[1] === 'ts';
  });

  let importContent = list.map(one => {
    const name = one.split('.')[0];
    return `import ${name} from '../${folderName}/${name}';`;
  });

  let typeContent = list.map(one => {
    const name = one.split('.')[0];
    const smallName = smallIt(name);
    return `${smallName}: ${name},`;
  });
  if (!noInterface) {
    typeContent.unshift('[key: string]: any');
  }
  typeContent.unshift(`export type ${folderName}Type = {`);
  typeContent.push('};');

  let exportContent = list.map(one => {
    const name = one.split('.')[0];
    const smallName = smallIt(name);
    return `${smallName}: new ${name}(),`;
  });
  let typeStr = `: ${folderName}Type`;
  exportContent.unshift(`export const list${typeStr} = {`);
  exportContent.push('};');

  let content = [
    '// auto generated //',
    ...importContent,
    ...typeContent,
    ...exportContent
  ];
  return content.join('\n');
}

function main() {
  console.log('boot start...');

  const controllerPath = path.resolve(__dirname, '../controller');
  const servicePath = path.resolve(__dirname, '../service');
  const pluginPath = path.resolve(__dirname, '../plugin');

  const controllerList = fs.readdirSync(controllerPath);
  const serviceList = fs.readdirSync(servicePath);
  const pluginList = fs.readdirSync(pluginPath);

  //
  const fController = generateFile(controllerList, 'controller', true);
  fs.writeFileSync(__dirname + '/controller.ts', fController);
  console.log('controller generated.');

  const fService = generateFile(serviceList, 'service');
  fs.writeFileSync(__dirname + '/service.ts', fService);
  console.log('service generated.');

  const fPlugin = generateFile(pluginList, 'plugin', true);
  fs.writeFileSync(__dirname + '/plugin.ts', fPlugin);
  console.log('plugin generated.');

  console.log('boot done.');
}

main();
