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

    traverseBFS(vertex: Vertex, cb = (vertexName: Vertex) => {}): void {
        const queue = [vertex];
        const visited: { [vertex: string]: boolean } = {
            [vertex]: true
        };

        while (queue.length > 0) {
            const currentVertex = queue.shift() as Vertex;
            const vertexNeighbours = this.adjacencyList.get(currentVertex);

            if (!vertexNeighbours) {
                throw new Error('Vertex not found');
            }

            cb(currentVertex);

            for (const neighbourVertex of vertexNeighbours) {
                if (!visited[neighbourVertex]) {
                    visited[neighbourVertex] = true;
                    queue.push(neighbourVertex);
                }
            }
        }
    }

    traverseDFS(startingVertex: Vertex, cb = (vertexName: Vertex) => {}): void {
        const visited: { [vertex: string]: boolean } = {};

        const iter = (vertex: Vertex) => {
            const vertexNeighbours = this.adjacencyList.get(vertex);

            if (!vertexNeighbours) {
                throw new Error('Vertex not found');
            }

            visited[vertex] = true;

            cb(vertex);

            for (const neighbourVertex of vertexNeighbours) {
                if (!visited[neighbourVertex]) {
                    iter(neighbourVertex);
                }
            }
        };

        iter(startingVertex);
    }
}
