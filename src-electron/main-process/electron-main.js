/* eslint-disable */

import {
  app,
  BrowserWindow,
  globalShortcut,
  Menu,
  nativeTheme,
  Tray
} from 'electron';
import { openDevTools } from 'electron-debug';
import logger from './logger';

try {
  if (
    process.platform === 'win32' &&
    nativeTheme.shouldUseDarkColors === true
  ) {
    require('fs').unlinkSync(
      require('path').join(app.getPath('userData'), 'DevTools Extensions')
    );
  }
} catch (_) {}

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = __dirname;
}

// init:
/** @type {BrowserWindow} */
let mainWindow;
/** @type {Tray} */
let tray;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 400,
    height: 440,
    frame: false,
    resizable: false,
    movable: true,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
      nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  });

  void mainWindow.loadURL(process.env.APP_URL);

  mainWindow.on('blur', () => {
    logger.info('Main window blur');
    mainWindow.hide();
  });
}
function reShowWindow() {
  if (mainWindow === null) {
    createWindow(); // 新建窗口实例
  } else if (!mainWindow.isVisible()) {
    // 重新显示
    mainWindow.center();
    mainWindow.show();
  }
}
function registerKeyboardShortcut() {
  globalShortcut.register('Shift + Alt + Enter', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      reShowWindow();
      mainWindow.webContents.send('hotkeyPressed');
    }
  });
}

app.on('ready', () => {
  registerKeyboardShortcut();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', reShowWindow);

void app.whenReady().then(_ => {
  tray = new Tray(
    require('path').resolve(__statics, 'icons/favicon-16x16.png')
  );
  const trayMenu = Menu.buildFromTemplate([
    {
      label: '显示主窗口',
      click: reShowWindow
    },
    {
      label: '启用开发者模式',
      click() {
        reShowWindow();
        openDevTools();
      }
    },
    {
      label: '退出 Search Zen',
      click() {
        app.quit();
      }
    }
  ]);

  tray.setToolTip('Search Zen - 极速搜索助手');
  tray.setContextMenu(trayMenu);
});
