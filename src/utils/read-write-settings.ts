import fs from 'fs';
import path from 'path';
import { defaultTemplates, ISearchZenLink } from './search-zen-link';
import { logger } from './render-process-logger';

export type SettingsObjectType = {
  templates: ISearchZenLink[];
};

export function readSettings(
  electronInstance: typeof Electron,
  loadedCallback: (data: SettingsObjectType, settingsFilePath: string) => void
) {
  const appPath = electronInstance.remote.app.getAppPath();
  logger.info(`current App path - ${appPath}`);

  const settingsFilePath = path.resolve(appPath, 'settings.json');
  fs.readFile(settingsFilePath, (err, data) => {
    if (err) {
      // 检测到文件不存在 创建文件
      logger.warn('Settings JSON file may not found, Creating ...');
      const dataObj = {
        templates: defaultTemplates
      };
      fs.writeFileSync(settingsFilePath, JSON.stringify(dataObj, null, 2), {
        encoding: 'utf-8'
      });
      logger.info('Write default templates in new settings.json.');
      loadedCallback(dataObj, settingsFilePath);
    } else {
      // 读取到文件内容，执行回调
      loadedCallback(JSON.parse(String(data)), settingsFilePath);
    }
  });
}

export function appendSettings(
  electronInstance: typeof Electron,
  newLink: ISearchZenLink,
  successCallback: () => void,
  duplicateCallback: () => void
): void {
  readSettings(electronInstance, (data, settingsFilePath) => {
    const settingsObject = data;

    // 检查是否有该模板记录: name + template 作关键字
    for (const existlink of settingsObject.templates) {
      if (
        existlink.name === newLink.name &&
        existlink.template === newLink.template
      ) {
        return duplicateCallback(); // 名称和网址都雷同，则不添加该记录
      }
    }

    settingsObject.templates.push(newLink);
    fs.writeFile(
      settingsFilePath,
      JSON.stringify(settingsObject, null, 2),
      err => {
        if (err) {
          logger.error('Writing settings JSON file failed !');
        }

        successCallback();
      }
    );
  });
}

export function rewriteSettings(
  electronInstance: typeof Electron,
  newTemplates: ISearchZenLink[]
) {
  readSettings(electronInstance, (data, settingsFilePath) => {
    const settingsObject = data;
    settingsObject.templates = newTemplates;

    fs.writeFile(
      settingsFilePath,
      JSON.stringify(settingsObject, null, 2),
      err => {
        if (err) {
          logger.error('Writing settings JSON file failed !');
        }
      }
    );
  });
}
