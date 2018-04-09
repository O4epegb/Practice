type NodeIndex = number;
type Distance = number;
type Node = Array<Distance>;
type AdjacencyMatrix = Array<Node>;

class Queue {
    nodes: Array<{
        index: number;
        distance: number;
    }> = [];

    push(index: number, value: number) {
        this.nodes.push({
            index,
            distance: value
        });

        // Sorts that cheapest node is always first
        this.nodes.sort((a, b) => a.distance - b.distance);
    }

    shift = () => {
        const nextItem = this.nodes.shift();
        return nextItem && nextItem.index;
    };
}

export function dijkstra(
    adjacencyMatrix: AdjacencyMatrix,
    startNodeIndex: NodeIndex,
    finishNodeIndex: NodeIndex
) {
    const costs: Record<string, Distance> = {};
    const parents: Record<string, NodeIndex> = {};
    const processed: Array<NodeIndex> = [];
    const queue = new Queue();

    queue.push(startNodeIndex, 0);

    let nextNodeIndex = queue.shift();

    while (nextNodeIndex !== undefined) {
        const currentNodeIndex = nextNodeIndex;
        const isNodeAlreadyProcessed =
            processed.indexOf(currentNodeIndex) !== -1;

        if (!isNodeAlreadyProcessed) {
            const parentCost = costs[currentNodeIndex] || 0;
            const currentDistances = adjacencyMatrix[currentNodeIndex];
            processed.push(currentNodeIndex);

            currentDistances.forEach((distance, nodeIndex) => {
                if (!isFinite(distance)) {
                    return;
                }

                const cost = parentCost + distance;

                if (costs[nodeIndex] === undefined || costs[nodeIndex] > cost) {
                    costs[nodeIndex] = cost;
                    parents[nodeIndex] = currentNodeIndex;

                    queue.push(nodeIndex, cost);
                }
            });
        }

        nextNodeIndex = queue.shift();
    }

    let currentParent = parents[finishNodeIndex];
    const path = [finishNodeIndex];

    while (currentParent !== undefined) {
        path.push(currentParent);

        currentParent = parents[currentParent];
    }

    return {
        distance: costs[finishNodeIndex],
        path: path.reverse().join(' -> ')
    };
}
