import { dijkstra } from './';

const matrix1 = [
    [Infinity, 5, 0, Infinity, Infinity, Infinity],
    [Infinity, Infinity, Infinity, 15, 20, Infinity],
    [Infinity, Infinity, Infinity, 30, 35, Infinity],
    [Infinity, Infinity, Infinity, Infinity, Infinity, 20],
    [Infinity, Infinity, Infinity, Infinity, Infinity, 10],
    [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity]
];

const matrix2 = [
    [Infinity, 5, 2, Infinity, Infinity, Infinity],
    [Infinity, Infinity, Infinity, 4, 2, Infinity],
    [Infinity, 8, Infinity, 7, Infinity, Infinity],
    [Infinity, Infinity, Infinity, Infinity, 6, 3],
    [Infinity, Infinity, Infinity, Infinity, Infinity, 1],
    [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity]
];

describe('Dijkstra', () => {
    it('is working correctly', () => {
        expect(dijkstra(matrix1, 0, 5)).toMatchSnapshot();
        expect(dijkstra(matrix2, 0, 5)).toMatchSnapshot();
    });
});
