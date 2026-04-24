exports.generateSummary = (hierarchies) => {
    let totalTrees = 0;
    let totalCycles = 0;

    let maxDepth = -1;
    let bestRoot = null;

    for (let h of hierarchies) {
        if (h.has_cycle) {
            totalCycles++;
        } else {
            totalTrees++;

            if (
                h.depth > maxDepth ||
                (h.depth === maxDepth && (bestRoot === null || h.root < bestRoot))
            ) {
                maxDepth = h.depth;
                bestRoot = h.root;
            }
        }
    }

    return {
        total_trees: totalTrees,
        total_cycles: totalCycles,
        largest_tree_root: bestRoot
    };
};