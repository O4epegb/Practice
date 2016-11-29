import { globalShortcut } from 'electron';
import * as debounce from 'lodash/debounce';


export function registerShortcut(shortcutName, cb) {
    let counter = 0;
    return new Promise((resolve, reject) => {
        const ret = globalShortcut.register(shortcutName, debounce(() => {
            console.log(`Shortcut "${shortcutName}" is pressed ${++counter} time`);
            cb(counter);
        }, 50));

        if (!ret) {
            console.log(`ERROR: Shortcut "${shortcutName}" registration failed`);
            reject();
        } else {
            console.log(`SUCCESS: Shortcut "${shortcutName}" is registered = ${globalShortcut.isRegistered(shortcutName)}`);
            resolve();
        }
    });
}

export function unregisterShortcut(shortcutName) {
    return new Promise((resolve, reject) => {
        globalShortcut.unregister(shortcutName);
        globalShortcut.unregisterAll();

        resolve();
    });
}
