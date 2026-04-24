const express = require('express');
const cors = require('cors');

const bfhlRoute = require('./routes/bfhl.route');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/bfhl', bfhlRoute);

// Health check (optional but useful)
app.get('/', (req, res) => {
    res.send('BFHL API is running');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});