type Vertex = string;

export class Graph {
    adjacencyList = new Map<Vertex, Array<Vertex>>();
    verticesNumber = 0;

    addVertex(vertex: Vertex) {
        this.verticesNumber++;
        this.adjacencyList.set(vertex, []);
    }

    addEdge(vertexA: Vertex, vertexB: Vertex) {
        const listA = this.adjacencyList.get(vertexA);
        const listB = this.adjacencyList.get(vertexB);

        if (listA && listB) {
            listA.push(vertexB);
            listB.push(vertexA);
        }
    }

    toString() {
        const total = [];

        for (const vertex of this.adjacencyList.keys()) {
            const vertexNeighbours = this.adjacencyList.get(vertex) as Array<
                string
            >;
            const neighbours = [];

            for (const neighbourVertex of vertexNeighbours) {
                neighbours.push(neighbourVertex);
            }

            total.push(`${vertex} -> ${neighbours.join(' ')}`);
        }

        return total.join('\n');
    }

    // bfs(vertex)
    // dfs(vertex)
}
