import * as robot from 'robotjs';
import { Coord } from './models';


export function delay(ms = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

export function randomSort<T>(arr: Array<T>) {
    return arr.slice().sort(() => Math.random() > 0.5 ? 1 : 0);
}

export function moveAndClick({x, y}: Coord, double = false) {
    return new Promise((resolve, reject) => {
        robot.moveMouse(x, y);
        robot.mouseClick('left', double);
        resolve();
    });
}

export function typeString(str: string) {
    robot.typeStringDelayed(`${str}`, 8000);
}

export function getPixelColor({x, y}: Coord) {
    return robot.getPixelColor(x, y);
}

export function getMouseCoords(): Coord {
    return robot.getMousePos();
}
