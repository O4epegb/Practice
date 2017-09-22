import * as robot from 'robotjs';
import { Coord } from './models';

export function notify(title: string, body?: string) {
    new Notification(title, { body });
    log(title);
    if (body) {
        log(body);
    }
}

export function log(msg: any, ...args: Array<any>) {
    console.log(msg, ...args);
}

export function delay(ms = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

export function randomSort<T>(arr: Array<T>) {
    return arr.slice().sort(() => (Math.random() > 0.5 ? 1 : -1));
}

export function moveAndClick({ x, y }: Coord, double = false) {
    return new Promise((resolve, reject) => {
        robot.moveMouse(x, y);
        robot.mouseClick('left', double);
        resolve();
    });
}

export function moveMouse({ x, y }: Coord) {
    robot.moveMouse(x, y);
}

export function typeString(str: string) {
    robot.typeString(`${(str as any).normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`);
    // robot.typeStringDelayed(`${(str as any).normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`, 8000);
}

export function getPixelColor({ x, y }: Coord) {
    return robot.getPixelColor(x, y);
}

export function getMouseCoords(): Coord {
    return robot.getMousePos();
}

export function waitForColor(color: string, coord: Coord) {
    return new Promise((resolve, reject) => {
        function checkColor() {
            const colorAtCoord = getPixelColor(coord);
            if (colorAtCoord !== color) {
                console.log(`Looking for color "${color}" at cursor position`);
                setTimeout(checkColor, 300);
            } else {
                console.log(`Color "${color}" found`);
                resolve();
            }
        }
        checkColor();
    });
}
