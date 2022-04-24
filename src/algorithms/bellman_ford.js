class NodeWeight {
    constructor(distance, x, y, closerX, closerY) {
        this.distance = distance;
        this.x = x;
        this.y = y;
        this.closerX = closerX;
        this.closerY = closerY;
    }
}

function bellmanFord(map, startX, startY, findX, findY) {
    const explored = new ExploredList(map.width, map.height);
    let edges = new Array();
    let changes = true;

    for (let x = 0; x < map.height; x++) {
        for (let y = 0; y < map.width; y++) {
            if (x == startX && y == startY)
                edges.push(new NodeWeight(0, x, y, null, null));
            else if (map.isBlockFree(x, y))
                edges.push(new NodeWeight(Infinity, x, y, null, null));
        }
    }


    while (changes) {
        changes = false;
        edges.forEach(edge => {
            getAdjBF(edge.x, edge.y, map).forEach(adj => {
                let custo = map.getBlock(adj[0], adj[1]) + edge.distance;

                for (let index = 0; index < edges.length; index++) {
                    if (edges[index].x == adj[0] && edges[index].y == adj[1]) {
                        if (edges[index].distance > custo) {
                            edges[index] = new NodeWeight(custo, adj[0], adj[1], edge.x, edge.y);
                            changes = true;
                        }
                        break;
                    }
                }
            });
        });
    }

    console.log(edges);
}

const ADJ_POINTSBF = [[1, 0], [0, 1], [-1, 0], [0, -1]];

function getAdjBF(x, y, map) {
    points = ADJ_POINTSBF.map(p => add(p, [x, y]));
    return points.filter(p => map.isWithinBounds(...p) && map.isBlockFree(...p, map));
}