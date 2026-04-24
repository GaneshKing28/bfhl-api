function dfsCycle(node, adj, visited, stack) {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;

    visited.add(node);
    stack.add(node);

    for (let nei of adj.get(node) || []) {
        if (dfsCycle(nei, adj, visited, stack)) return true;
    }

    stack.delete(node);
    return false;
}

function buildTree(node, adj) {
    const result = {};

    for (let child of adj.get(node) || []) {
        result[child] = buildTree(child, adj);
    }

    return result;
}

function getDepth(node, adj) {
    if (!adj.get(node) || adj.get(node).length === 0) return 1;

    let maxDepth = 0;

    for (let child of adj.get(node)) {
        maxDepth = Math.max(maxDepth, getDepth(child, adj));
    }

    return 1 + maxDepth;
}

exports.buildTreesFromComponents = ({ adj, parentMap, nodes }) => {
    const visited = new Set();
    const hierarchies = [];

    for (let node of nodes) {
        if (visited.has(node)) continue;

        const component = [];
        const stack = [node];

        while (stack.length) {
            const curr = stack.pop();
            if (visited.has(curr)) continue;

            visited.add(curr);
            component.push(curr);

            for (let nei of adj.get(curr) || []) stack.push(nei);

            for (let [child, parent] of parentMap.entries()) {
                if (parent === curr) stack.push(child);
            }
        }

        // cycle detection
        const cycleVisited = new Set();
        let hasCycle = false;

        for (let n of component) {
            if (dfsCycle(n, adj, cycleVisited, new Set())) {
                hasCycle = true;
                break;
            }
        }

        if (hasCycle) {
            hierarchies.push({
                has_cycle: true,
                root: null,
                tree: {},
                depth: 0
            });
            continue;
        }

        // find root
        const roots = component.filter(n => !parentMap.has(n));

        let root;
        if (roots.length === 0) {
            root = component.sort()[0];
        } else {
            root = roots.sort()[0];
        }

        const tree = {};
        tree[root] = buildTree(root, adj);

        const depth = getDepth(root, adj);

        hierarchies.push({
            has_cycle: false,
            root,
            tree,
            depth
        });
    }

    return hierarchies;
};