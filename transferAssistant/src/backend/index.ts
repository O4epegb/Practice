import { app, BrowserWindow } from 'electron';
import { registerShortcut, unregisterShortcut, unregisterAllShortcuts } from '../shortcut';
import { shortcutNames } from '../constants';


async function onAppStart() {
    let mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        center: true,
        title: 'Electron Notification Example',
    });
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    Object.keys(shortcutNames)
        .map(name => shortcutNames[name])
        .forEach((shortcutName) => {
            registerShortcut(shortcutName);
        });
}

app.on('ready', onAppStart);

app.on('will-quit', () => {
    Object.keys(shortcutNames).forEach(unregisterShortcut);
    unregisterAllShortcuts();
});
