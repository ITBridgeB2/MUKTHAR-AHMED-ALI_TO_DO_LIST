const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const expenseRoutes = require('./routes/expensesRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/expenses', expenseRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
