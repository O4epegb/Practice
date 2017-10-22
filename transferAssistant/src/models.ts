export interface Coord {
    x: number;
    y: number;
}

export interface Player {
    id: string;
    name: string;
    price: string;
    rating: string;
    type: PlayerType;
}

export enum PlayerType {
    Icon = 'icon',
    Gold = 'gold'
}
