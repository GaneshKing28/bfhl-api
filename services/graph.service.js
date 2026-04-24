exports.buildGraph = (edges) => {
    const adj = new Map();
    const parentMap = new Map();
    const nodes = new Set();

    for (let [u, v] of edges) {
        nodes.add(u);
        nodes.add(v);

        // multi-parent handling
        if (parentMap.has(v)) continue;

        parentMap.set(v, u);

        if (!adj.has(u)) adj.set(u, []);
        adj.get(u).push(v);

        if (!adj.has(v)) adj.set(v, []);
    }

    return { adj, parentMap, nodes };
};