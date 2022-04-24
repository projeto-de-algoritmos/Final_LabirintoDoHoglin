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
    let edges = new Array();
    let optPath = new Array();
    let changes = true;

    for (let x = 0; x < map.height; x++) {
        for (let y = 0; y < map.width; y++) {
            if (x == startX && y == startY)
                edges[map.width * x + y] = new NodeWeight(0, x, y, null, null);
            else if (map.isBlockFree(x, y))
                edges[map.width * x + y] = new NodeWeight(Infinity, x, y, null, null);
        }
    }


    while (changes) {
        changes = false;
        edges.forEach(edge => {
            getAdjBF(edge.x, edge.y, map).forEach(adj => {
                let custo = map.getBlock(adj[0], adj[1]) + edge.distance;

                if (edges[map.width * adj[0] + adj[1]].distance > custo) {
                    edges[map.width * adj[0] + adj[1]] = new NodeWeight(custo, adj[0], adj[1], edge.x, edge.y);
                    changes = true;
                }
            });
        });
    }

    let findIndex = map.width * findX + findY;
    let startIndex = map.width * startX + startY;
    optPath[0] = edges[findIndex];

    for (let index = 1; findIndex != startIndex; index++) {
        findIndex = map.width * optPath[index - 1].closerX + optPath[index - 1].closerY;
        optPath[index] = edges[findIndex];
    }
    return optPath;
}

function getAdjBF(x, y, map) {
    points = ADJ_POINTS.map(p => add(p, [x, y]));
    return points.filter(p => map.isWithinBounds(...p) && map.isBlockFree(...p, map));
}