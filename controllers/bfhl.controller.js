const { validateEdges } = require('../services/validator.service');
const { buildGraph } = require('../services/graph.service');
const { buildTreesFromComponents } = require('../services/tree.service');
const { generateSummary } = require('../services/summary.service');

exports.processBFHL = (req, res) => {
    try {
        const input = req.body;

        if (!Array.isArray(input)) {
            return res.status(400).json({
                error: "Input must be an array"
            });
        }

        const {
            validEdges,
            invalidEntries,
            duplicateEdges
        } = validateEdges(input);

        const graphData = buildGraph(validEdges);

        const hierarchies = buildTreesFromComponents(graphData);

        const summary = generateSummary(hierarchies);

        return res.json({
            user_id: "ganesh_24042026", // change if needed
            email_id: "your_email@example.com",
            college_roll_number: "your_roll_number",
            hierarchies,
            invalid_entries: invalidEntries,
            duplicate_edges: duplicateEdges,
            summary
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};