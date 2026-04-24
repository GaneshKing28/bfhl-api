const EDGE_REGEX = /^[A-Z]->[A-Z]$/;

exports.validateEdges = (input) => {
    const validEdges = [];
    const invalidEntries = [];
    const duplicateEdges = [];

    const seen = new Set();
    const duplicateSet = new Set();

    for (let item of input) {
        if (typeof item !== 'string') {
            invalidEntries.push(item);
            continue;
        }

        const edge = item.trim();

        if (!EDGE_REGEX.test(edge)) {
            invalidEntries.push(item);
            continue;
        }

        const [parent, child] = edge.split('->');

        if (parent === child) {
            invalidEntries.push(item);
            continue;
        }

        if (seen.has(edge)) {
            if (!duplicateSet.has(edge)) {
                duplicateEdges.push(edge);
                duplicateSet.add(edge);
            }
            continue;
        }

        seen.add(edge);
        validEdges.push([parent, child]);
    }

    return { validEdges, invalidEntries, duplicateEdges };
};