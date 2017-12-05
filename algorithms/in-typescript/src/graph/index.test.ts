import { Graph } from './';

const testResult = `A -> B D E
B -> A C
C -> B E F
D -> A E
E -> A D F C
F -> E C`;

it('Graph is working', () => {
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
    expect(graph.toString()).toEqual(testResult);
});
