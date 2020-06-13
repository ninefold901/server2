import path from 'path';
import fs from 'fs';

/**
 * BOOT
 */
const bootAutoCodePath = './'; // auto code位置统一

function bootSmallIt(name: string) {
  const arr = name.split('');
  arr[0] = arr[0].toLowerCase();
  return arr.join('');
}

function bootGenerateFile(
  arr: string[],
  folderName: string,
  noInterface: boolean = false
) {
  // 只扫描ts文件
  let list = arr.filter((one) => {
    return one.split('.')[1] === 'ts';
  });

  let importContent = list.map((one) => {
    const name = one.split('.')[0];
    return `import ${name}${folderName} from '../${folderName}/${name}';`;
  });

  let typeContent = list.map((one) => {
    const name = one.split('.')[0];
    const smallName = bootSmallIt(name);
    return `${smallName}: ${name}${folderName},`;
  });
  if (!noInterface) {
    typeContent.unshift('[key: string]: any');
  }
  typeContent.unshift(`export type ${folderName}Type = {`);
  typeContent.push('};');

  let exportContent = list.map((one) => {
    const name = one.split('.')[0];
    const smallName = bootSmallIt(name);
    return `${smallName}: new ${name}${folderName}(),`;
  });
  let typeStr = `: ${folderName}Type`;
  exportContent.unshift(`export const ${folderName}List${typeStr} = {`);
  exportContent.push('};');

  let content = [...importContent, ...typeContent, ...exportContent];
  return content.join('\n');
}

export default function boot(bootInputPath: string = '../') {
  console.log('boot start...');

  // 获得文件夹路径
  const controllerPath = path.resolve(__dirname, `${bootInputPath}controller`);
  const servicePath = path.resolve(__dirname, `${bootInputPath}service`);
  const pluginPath = path.resolve(__dirname, `${bootInputPath}plugin`);

  // 获得文件列表
  const controllerList = fs.readdirSync(controllerPath);
  const serviceList = fs.readdirSync(servicePath);
  const pluginList = fs.readdirSync(pluginPath);

  // 生成内容
  const fController = bootGenerateFile(controllerList, 'controller', true);
  const fService = bootGenerateFile(serviceList, 'service');
  const fPlugin = bootGenerateFile(pluginList, 'plugin', true);

  // 生成文件
  fs.writeFileSync(
    path.resolve(__dirname, `${bootAutoCodePath}auto-code.ts`),
    ['// auto generated //', fController, fService, fPlugin, '\n'].join('\n\n')
  );

  console.log('code generated.');
  console.log('boot done.');
}
