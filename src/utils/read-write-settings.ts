import fs from 'fs';
import path from 'path';
import { defaultTemplates, ISearchZenLink } from './search-zen-link';
import { logger } from './render-process-logger';

export type SettingsObjectType = {
  templates: ISearchZenLink[];
};

export function readSettings(
  electronInstance: typeof Electron,
  loadedCallback: (data: Buffer, settingsFilePath: string) => void
) {
  const appPath = electronInstance.remote.app.getAppPath();
  logger.info(`current App path - ${appPath}`);

  const settingsFilePath = path.resolve(appPath, 'settings.json');
  fs.readFile(settingsFilePath, (err, data) => {
    if (err) {
      // 检测到文件不存在 创建文件
      logger.warn('Settings JSON file may not found, Creating ...');
      fs.writeFileSync(
        settingsFilePath,
        JSON.stringify({
          templates: defaultTemplates
        }),
        { encoding: 'utf-8' }
      );
      logger.info('Write default templates in new settings.json.');
    }

    // 读取到文件内容，执行回调
    loadedCallback(data, settingsFilePath);
  });
}

export function appendSettings(
  electronInstance: typeof Electron,
  newLink: ISearchZenLink
) {
  readSettings(electronInstance, (buffer, settingsFilePath) => {
    let settingsObject: SettingsObjectType = JSON.parse(String(buffer));
    settingsObject.templates.push(newLink);

    fs.writeFile(settingsFilePath, JSON.stringify(settingsObject), err => {
      if (err) {
        logger.error('Write settings JSON file failed !');
      }
    });
  });
}
