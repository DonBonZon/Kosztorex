const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const db = require("./db");
const Menu = electron.Menu;

const { ipcMain } = require("electron");


let mainWindow;
global.db = db;

function createWindow() {
mainWindow = new BrowserWindow({ width: 1360, height: 700,   
  //  icon: path.join(__dirname, '../public/icon.png'),
webPreferences: { nodeIntegration: true }});                   
mainWindow.loadURL(isDev? "http://localhost:3000":`file://${path.join(__dirname, "../build/index.html")}`);

const template = [
    {
        label: 'File',
        submenu: [
         {
             label: "New",
              click: function(){
                  mainWindow.webContents.send('newFile');
             }
          },
          {
            label: "Save",
            click: function(){
                mainWindow.webContents.send('saveFile');
            }
          },
          {
            label: "Open",
            click: function(){
              mainWindow.webContents.send('openFile');
            }
          },
          process.platform !== "darwin" ? { role: 'quit' } : { role: 'close' },
          { role: 'toggleDevTools' } //TO DO WYWALENIA POTEM
        ]
      },
    {
      label: 'Edit',
      submenu: [
        {
          role: 'undo'
        },
        {
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          role: 'cut'
        },
        {
          role: 'copy'
        },
        {
          role: 'paste'
        },
        {
          role: 'delete'
        },
      ]
    },
    {
      role: 'window',
      submenu: [
        {
          role: 'minimize'
        },
        {
          role: 'close'
        },
        {
          role: 'togglefullscreen'
        },

      ]
    },
  ];

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu);


mainWindow.on("closed", () => (mainWindow = null));
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
if (process.platform !== "darwin") {
app.quit();
}
});
app.on("activate", () => {
if (mainWindow === null) {
createWindow();
}
});