import { Legend, WorldObject } from './models';


export function randomElementFromArray<T>(array: Array<T>) {
    return array[Math.floor(Math.random() * array.length)];
}

export function worldObjectFromChar(legend: Legend, ch: string): WorldObject {
    if (ch == ' ') {
        return null;
    }
    const element = new legend[ch](ch);
    return element;
}

export function originCharFromWorldObject(element: WorldObject): string {
    if (element == null) {
        return ' ';
    } else {
        return element.originChar;
    }
}
