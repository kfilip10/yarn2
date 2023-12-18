
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');


//Basic flags
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;
const { dialog } = require('electron')

let mainWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
    // Check for updates

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  //console.log(`The current update URL is: ${process.env.UPDATE_URL}`);


  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });
  autoUpdater.checkForUpdatesAndNotify();
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Information',
    message: `Checking for updates. Current version ${app.getVersion()}`,
  })

});



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
autoUpdater.on("")

//update handling
/*New Update Available*/
autoUpdater.on("update-available", (info) => {
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Information',
    message: `Update available. Current version ${app.getVersion()}`,
  })

  let pth = autoUpdater.downloadUpdate();
  //mainWindow.showMessage(pth);

});

autoUpdater.on("update-not-available", (info) => {
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Information',
    message: `No update available. Current version ${app.getVersion()}`,
  })

});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", (info) => {
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Information',
    message: `Update downloaded. Current version ${app.getVersion()}`,
  })

  //mainWindow.showMessage(`Update downloaded. Current version ${app.getVersion()}`);
});

autoUpdater.on("error", (info) => {
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Information',
    message: (info),
  })
});