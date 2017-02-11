import { globalShortcut, webContents } from 'electron';
import { debounce } from 'lodash';


export function registerShortcut(shortcutName, cb = (counter) => { }) {
    let counter = 0;
    return new Promise((resolve, reject) => {
        const ret = globalShortcut.register(shortcutName, debounce(() => {
            console.log(`Shortcut "${shortcutName}" is pressed ${++counter} time(s) total`);
            webContents.getAllWebContents()[0].send('shortcut-press', shortcutName);
            cb(counter);
        }, 50));
        if (!ret) {
            console.log(`ERROR: Shortcut "${shortcutName}" registration failed`);
            reject();
        } else {
            console.log(`SUCCESS: Shortcut "${shortcutName}" is registered = ${globalShortcut.isRegistered(shortcutName)}`);
            resolve();
        }
    }).catch(() => {
        console.log(`ERROR: Shortcut "${shortcutName}" registration failed`);
    });
}

export function unregisterShortcut(shortcutName) {
    globalShortcut.unregister(shortcutName);
}

export function unregisterAllShortcuts() {
    globalShortcut.unregisterAll();
}
