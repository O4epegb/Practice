const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;

let win;

function createWindow() {
  const Screen = electron.screen

  const size = Screen.getPrimaryDisplay().size

  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    frame: false,
    show: true,
    transparent: true,
    resizable: false,
    'always-on-top': true
  })

  win.loadURL(`file://${__dirname}/index.html`);

  // win.maximize();
  // win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
