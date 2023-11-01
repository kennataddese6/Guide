/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  Notification,
  Menu,
  dialog,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { resolveHtmlPath } from './util';

const server = 'http://127.0.0.1:8080';
const url = `${server}/update`;
autoUpdater.setFeedURL(url);
autoUpdater.autoDownload = false;
class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdates();
  }
}

autoUpdater.on('update-available', () => {
  mainWindow!.webContents.send('update-available');
});
autoUpdater.on('update-not-available', () => {
  mainWindow!.webContents.send('update-not-available');
});
ipcMain.on('check-update', async () => {
  const updateAvailable = await autoUpdater.checkForUpdates();
  console.log('This is the update information', updateAvailable?.versionInfo);
});
ipcMain.on('Update-Guide', async () => {
  await autoUpdater.downloadUpdate();
});
autoUpdater.on('update-downloaded', () => {
  console.log('I have downloaded the update');
  autoUpdater.quitAndInstall(false, true);
});
autoUpdater.on('error', (error) => {
  dialog.showMessageBox({
    type: 'error',
    title: 'Error in auto-updater',
    message: error == null ? 'unknown' : (error.stack || error).toString(),
  });
});
let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});
ipcMain.on('show-notification', (event, notificationData) => {
  const { title, body } = notificationData;
  const notification = new Notification({
    title,
    body,
    silent: false, // Enable sound for the notification
    icon: path.join(__dirname, '../../assets/cbIcon.png'),
  });
  notification.on('click', () => {
    if (mainWindow!.isMinimized()) {
      mainWindow!.restore();
    } else {
      mainWindow!.show();
    }
  });
  notification.on('click', () => {
    mainWindow!.webContents.send('notification-clicked');
  });
  notification.show();
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};
Menu.setApplicationMenu(null);

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.ico'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
    autoUpdater.checkForUpdates();
  })
  .catch(console.log);
app.setAppUserModelId('Guide');
