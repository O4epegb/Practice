import { Graph } from './';

const testResult = `A -> B D E
B -> A C
C -> B E F
D -> A E
E -> A D F C
F -> E C`;

describe('Graph', () => {
    const graph = new Graph();

    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(v => graph.addVertex(v));

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'D');
    graph.addEdge('A', 'E');
    graph.addEdge('B', 'C');
    graph.addEdge('D', 'E');
    graph.addEdge('E', 'F');
    graph.addEdge('E', 'C');
    graph.addEdge('C', 'F');
    // 'M' vertex does not exist, edge will not be added
    graph.addEdge('C', 'M');

    it('creates correct graph', () => {
        expect(graph.toString()).toEqual(testResult);
    });

    it('traverses DFS', () => {
        const result: Array<string> = [];
        graph.traverseDFS('A', vertex => {
            result.push(vertex);
        });
        expect(result.join(', ')).toEqual('A, B, C, E, D, F');
    });

    it('traverses BFS', () => {
        const result: Array<string> = [];
        graph.traverseBFS('A', vertex => {
            result.push(vertex);
        });
        expect(result.join(', ')).toEqual('A, B, D, E, C, F');
    });

    it('throws with wrong vertex', () => {
        expect(() => {
            graph.traverseBFS('Z');
        }).toThrow();
        expect(() => {
            graph.traverseDFS('Z');
        }).toThrow();
    });
});
